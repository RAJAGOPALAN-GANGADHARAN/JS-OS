import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

// class App extends React.Component {
//   constructor(props)
//   {
//     super(props);
//     this.state = {
//         editable:false
//     }
//   }
//     handleEditorChange = (content, editor) => {
//     console.log('Content was updated:', content);
//   }

//   render() {
//     return (
//         <div>
//             <button onClick={()=>this.setState({editable:!this.state.editable})}>Enable Editing</button>
//       <Editor
//         initialValue="<p>This is the initial content of the editor</p>"
//         init={{
//           height: 500,
//           menubar: false,
//           plugins: [
//             'advlist autolink lists link image charmap print preview anchor',
//             'searchreplace visualblocks code fullscreen',
//             'insertdatetime media table paste code help wordcount'
//           ],
//           toolbar:
//             'undo redo | formatselect | bold italic backcolor | \
//             alignleft aligncenter alignright alignjustify | \
//             bullist numlist outdent indent | removeformat | help'
//         }}
//         onEditorChange={this.handleEditorChange}
//         disabled={this.state.editable}
//       />
//       </div>
//     );
//   }
// }

// export default App;

const App = () => {
  const [state, setState] = useState({ editable: false });
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  }

  return (
    <div>
      <button onClick={() => setState({ ...state, editable: !state.editable })}>Enable Editing</button>
      <Editor
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
        disabled={state.editable}
      />
    </div>
  )
}

export default App

