import React,{Component} from 'react'
import './explorer.css'
import folderImg from "../../desktop/taskbaricon/icons/file_txt.png"
import fileImg from "../../desktop/taskbaricon/icons/folder.png"

class LeftPane extends Component{
    render(){
        return(
            <div className = "left-pane">
                <li className = "files">{this.props.name}</li>
            </div>
        )
    }
}
class Files extends Component{
    render(){
        return(
            <div className="icon-and-name">
                <li>
                    <img src={folderImg}/>
                    <p>{this.props.name}</p>
                </li>
            </div>
        )
    }
}
class Directory extends Component{
    render(){
        return(
            <div className="icon-and-name">
                <li>
                    <img src={fileImg}/>
                    <p>{this.props.name}</p>
                </li>
            </div>
        )
    }
}

class Explorer extends Component{
    constructor(props){
        super(props);
        this.state = {
            files : [],
            directories : [],
            filename : "",
            directoryname : ""
        }
    }
    componentWillMount(){
        fetch("http://localhost:3020/fs/showfile")
        .then(data => data.json())
        .then(file => {
            
            let i = 0
            for(i in file){
             this.setState({
                 files : [...this.state.files, file[i].Name]
             })
        }})
        
        fetch("http://localhost:3020/fs/showDir")
        .then(data => data.json())
        .then(file => {
           let i = 0
           for(i in file){
            this.setState({
                directories : [...this.state.directories, file[i].Name]
            })
        }})
    }
    createFile(){
        return(
            <div className="dialog-box">
                <form>
                    <label>
                        Name of new file:
                        <textarea value={this.state.filename}/>
                    </label>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
    render(){
        console.log(this.state.files.length, this.state.directories.length)
        return(
            <div className="window">
                <div className="menu-bar">
                    <button className="create-button">
                        New
                    </button>
                    <button className="delete-button">
                        Delete
                    </button>
                </div>
                    <div className="tree">
                    {this.state.directories.map(
                        f => {
                            return(
                            <LeftPane name={f}/>
                            )
                        }
                    )}
                    {this.state.files.map(
                        f => {
                            return(
                            <LeftPane name={f}/>
                            )
                        }
                    )}
                    </div>
                    <div className="right-side">
                        <ul className="file-list">
                        {this.state.files.map(
                            f => {
                                return(
                                <Files name={f}/>
                                )
                            }
                        )}
                        {this.state.directories.map(
                            f => {
                                return(
                                <Directory name={f}/>
                                )
                            }
                        )}
                        </ul>
                    </div>
               
            </div>
        )

    }
}

export default Explorer

