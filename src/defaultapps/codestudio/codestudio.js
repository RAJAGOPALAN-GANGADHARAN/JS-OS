import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';
import { Button, Form } from 'react-bootstrap';
import { disk } from '../../filesystem/main';
import { fileStructure } from '../../filesystem/fileClass';


var lang = {
    ".cpp": "cpp",
    ".js": "javascript",
    ".py": "python",
    ".java": "java"
}
// export default class Editor extends React.Component {
//     state = {
//         code: this.props.appData,
//         file: this.props.file,
//         name:""
//     };
//     file = this.props.file;


//     onChange = (newValue, e) => {
//         //console.log(this.state.file.fileContents)
//         if(this.file)
//         this.file.fileContents.appData = newValue;
//         //console.log('onChange', newValue, e);
//         this.setState({ code: newValue });
//     };

//     editorDidMount = (editor, monaco) => {
//         //console.log('editorDidMount', editor, monaco);
//         this.editor = editor;
//         editor.focus();
//     };
//     handleChange(event) {
//         console.log(event);
//         let fieldName = event.target.name;
//         let fleldVal = event.target.value;
//         this.setState({ name: fleldVal });
//     }
//     save = (event) => {
//     /* make file saving interface */
//         if (this.file) return;
//         let name = this.state.name.split('.');
//         console.log(name);
//         if (name.length == 2) {
//             var ft = new fileStructure(name[0], '.' + name[1]);
//             if (name[1] == "md") {
//                 ft.addContent({
//                     app: 'Markdown',
//                     icon: "markdown.png",
//                     appData:this.state.code
//                 })
//             }
//             else {
//                 ft.addContent({
//                     app: "CodeStudio",
//                     icon: "vscode.png",
//                     appData: this.state.code
//                 })
//             }
//             this.file = ft;
//             this.setState({file:ft})
//             disk.addFile(ft);
//         }
//     }

//     render() {
//         const { code } = this.state;
//         const options = {
//             selectOnLineNumbers: true,
//             automaticLayout:true
//         };
//         return (
//             <div style={{ width: "100%", height: "100%" }}>
//                 {this.state.file ? null : <div style={{display:"flex"}}>
//                     <Button style={{ margin: "4px" }} onClick={(event) => this.save(event)}>Save</Button>
//                     <Form.Control
//                         style={{ margin: "4px" }}
//                         value={this.state.name}
//                         onChange={(value) => this.handleChange(value)}
//                         placeholder={"filename.extension"}
//                     />
//                 </div>}
//                 <MonacoEditor
//                     language={this.file?lang[this.file.fileExtension]:"javascript"}
//                     theme="vs-dark"
//                     value={code}
//                     options={options}
//                     onChange={this.onChange}
//                     editorDidMount={this.editorDidMount}
//                 />
//             </div>
//         );
//     }
// }

const Editor = (props) => {
    const [state, setState] = useState({ code: props.appData, file: props.file, name: "" })
    let file = props.file;

    const onChange = (newValue, e) => {
        //console.log(this.state.file.fileContents)
        if (file)
            file.fileContents.appData = newValue;
        //console.log('onChange', newValue, e);
        setState({ ...state, code: newValue });
    };
    const editorDidMount = (editor, monaco) => {
        //console.log('editorDidMount', editor, monaco);
        editor.focus();
    };
    const handleChange = (event) => {
        console.log(event);
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        setState({ ...state, name: fieldVal });
    }
    const save = (event) => {
        /* make file saving interface */
        if (file) return;
        let name = state.name.split('.');
        console.log(name);
        if (name.length == 2) {
            var ft = new fileStructure(name[0], '.' + name[1]);
            if (name[1] == "md") {
                ft.addContent({
                    app: 'Markdown',
                    icon: "markdown.png",
                    appData: state.code
                })
            }
            else {
                ft.addContent({
                    app: "CodeStudio",
                    icon: "vscode.png",
                    appData: state.code
                })
            }
            file = ft;
            setState({ ...state, file: ft })
            disk.addFile(ft);
        }
    }
    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {state.file ? null : <div style={{ display: "flex" }}>
                <Button style={{ margin: "4px" }} onClick={(event) => save(event)}>Save</Button>
                <Form.Control
                    style={{ margin: "4px" }}
                    value={state.name}
                    onChange={(value) => handleChange(value)}
                    placeholder={"filename.extension"}
                />
            </div>}
            <MonacoEditor
                language={file ? lang[file.fileExtension] : "javascript"}
                theme="vs-dark"
                value={state.code}
                options={options}
                onChange={onChange}
                editorDidMount={editorDidMount}
            />
        </div>
    )
}

export default Editor