import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class WordEditor extends Component {
    render() {
        return (
            <div style={{ width: "100%", height: "100%",overflowY:"auto" }}>
                <CKEditor 
                    editor={ClassicEditor}
                    data={this.props.appData}
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
        );
    }
}
// import React from 'react';

// // Import Brace and the AceEditor Component
// import brace from 'brace';
// import AceEditor from 'react-ace';

// // Import a Mode (language)
// import 'brace/mode/java';

// // Import a Theme (okadia, github, xcode etc)
// import 'brace/theme/github';

// export default class Editor extends React.Component {

//     constructor(props, context) {
//         super(props, context);
        
//         this.onChange = this.onChange.bind(this);
//     }

//     onChange(newValue) {
//         console.log('change', newValue);
//     }

//     render() {
//         return (
//                 <AceEditor
//                     mode="java"
//                     theme="github"
//                     onChange={this.onChange}
//                     name="UNIQUE_ID_OF_DIV"
//                     editorProps={{
//                         $blockScrolling: true
// 					}}
// 					height="100%"
// 					width="100%"
//                 />
//         );
//     }
// }

