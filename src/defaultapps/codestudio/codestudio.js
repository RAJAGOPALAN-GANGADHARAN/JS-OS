import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';

export default class Editor extends React.Component {
    state = {
        code: ['function x() {', "  console.log('Hello world!');", '}'].join('\n'),
    };

    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
        this.setState({ code: newValue });
    };

    editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor, monaco);
        this.editor = editor;
        editor.focus();
    };

    render() {
        const { code } = this.state;
        const options = {
            selectOnLineNumbers: true,
            automaticLayout:true
        };
        return (
            <div style={{width:"100%",height:"100%"}}>
                <MonacoEditor
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
            </div>
        );
    }
}