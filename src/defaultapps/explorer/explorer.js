import React,{Component} from 'react'
import './explorer.css'

class LeftPane extends Component{
    render(){
        return(
            <div className = "left-pane">
                <li>{this.props.name}</li>
            </div>
        )
    }
}

class Explorer extends Component{
    constructor(props){
        super(props);
        this.state = {
            files : [],
            directories : []
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

    render(){
        console.log(this.state.files.length, this.state.directories.length)
        return(
                <div className = "left-pane-slide">
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
            
        )

    }
}

export default Explorer
