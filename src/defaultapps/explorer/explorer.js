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
            isOpen: false,
            create: false,
            delete: false
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

    handleChange(){
        this.setState({
            isOpen: !this.state.isOpen
        })
        console.log('opened')
    }

    handleCreate(){
        this.setState({
            isOpen: !this.state.isOpen,
            create: !this.state.create
        })
        
    }

    handleDelete(){
        this.setState({
            isOpen: !this.state.isOpen,
            delete: !this.state.delete
        })
        console.log(this.state.delete)
    }

    createFile(){
        var f = document.getElementById("fileNameInput").value
        console.log(f)
        fetch("http://localhost:3020/fs/createFile",{
        method: 'POST',
        body: JSON.stringify({Name: f}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => console.log(data.json()))
    }

    deleteFile(){
        var f = document.getElementById("fileNameInput").value
        console.log(f)
        fetch("http://localhost:3020/fs/deleteFile",{
        method: 'DELETE',
        body: JSON.stringify({Name: f}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => data.json())
    .then(file => console.log(file))
    }
    
    render(){  
        const {isOpen} = this.state
            if(!isOpen)
            return(
                <div className="window">
                    <div className="menu-bar">
                        <button className="create-button" onClick={()=>this.handleCreate()}>
                            New
                        </button>
                        <button className="delete-button" onClick={()=>this.handleDelete()}>
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
            else
            return(
                <div className="window">
                    <div className="menu-bar">
                        <input id="fileNameInput" placeholder="enter name of file"/>
                        <button onClick={()=>{
                            this.handleChange();
                            if(this.state.create===true)
                            this.createFile()
                            if(this.state.delete===true)
                            this.deleteFile()   
                        }}>OK</button>
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