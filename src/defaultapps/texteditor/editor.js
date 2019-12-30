import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import "./editor.css"

class MenuBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      toSave : false
    }
  }
  handleChange(){
    this.setState({
      toSave : !this.state.toSave
    })
  }

  createFile(){
    var f = document.getElementById("fileName").value
    console.log(f)
    var c = this.props.code
    console.log(c)
    fetch("http://localhost:3020/fs/createFile",{
    method: 'POST',
    body: JSON.stringify({Name: f, Content: c }),
    headers: {
        'Content-Type': 'application/json'
    }
    }).then(data => console.log(data.json()))

  }

  render(){
    const {toSave} = this.state
    if(!toSave){
      return(
        <div>
          <button onClick={()=>this.handleChange()}>Save</button>
        </div>
      )
    }else{
      return(
        <div>
          <input id="fileName" placeholder="Enter file name"/>
          <button onClick={()=>{this.handleChange(); this.createFile()}}>Ok</button>
        </div>
      )
    }
  }
}


class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
      content : ''
    }
  }
  
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
    var c = editor.getModel();
    var v = c.getValue()
    console.log(v)
  }
  updateChange(f){
    this.setState({
      code : f
    })
  }
  onChange = (newValue, e) => {
    console.log('onChange', newValue,e);
    this.updateChange(newValue);
  }
  render() {
    const code = this.state.code
    const options = {
      selectOnLineNumbers: true,
      automaticLayout:true
    };
    return (
        <div>
          <div>
            <MenuBar code={this.state.code}/>
          </div>
          <div className="editor">
              <MonacoEditor
              width="100%"
              height="400"
              id="edit"
              language="javascript"
              theme="vs-dark"
              value={code}
              options={options}
              onChange={this.onChange}
              editorDidMount={this.editorDidMount}
            />
          </div>
        </div>
       
    );
  }
}

export default Editor;
