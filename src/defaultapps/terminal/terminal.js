import React,{Component} from 'react';
import './terminal.css';
import files from '../../filesystem/fs.json'
import * as commands from './commands'

export class Terminal extends Component
{
    constructor(props){
        super(props);
        this.state = {
            cmd : "",
            files : []
        };
    }
    handleKeyPress = (e) => {
        if(e.key !== 'Enter'){
            if(e.key === 'Backspace'){ 
                this.state.cmd = this.state.cmd.slice(0,this.state.cmd.length -1)
            }else{
             this.state.cmd = this.state.cmd.concat(e.key)
            }
        }else{
            if(this.state.cmd.length===0){
                var terminalOutput=document.getElementById('terminalOutput');
                var element = document.createElement("div");
                element.appendChild(document.createTextNode('user@root:-$'))
                var breakStatement= document.createElement("br")
                element.appendChild(breakStatement);
                terminalOutput.append(element)
            }else{
                if(e.target.value === "tree"){
                    commands.tree(files)  
                }
                if(e.target.value === "ls"){
                    commands.ls(files)
                }
                var regex_cat = /cat/g;
                var regex_argument = /^\S*\s+(\S+)/;
                var argument = regex_argument.exec(e.target.value);
                if(regex_cat.exec(e.target.value)){
                    commands.cat(files,argument[1])
                }
            }
            
        }
    }
    componentWillMount(){
        fetch("http://localhost:3020/fs/showfile")
        .then(data => data.json())
        .then(file => {
            let x
            for(x of file){
                console.log(x.Name)
            }
        })
        fetch("http://localhost:3020/fs/showdir")
        .then(data => data.json())
        .then(file => {
            let x
            for(x of file){
                console.log(x.Name)
            }
        })
       
        
    }
    render()
    {       
        return(
            <div id="terminal">
                <div id="terminal-input">
                    <div id="terminalOutput"></div>
                    user@root:-$
                    <input className="inputcommand" id="input" name="input" type="text" onKeyUp={this.handleKeyPress}/>
                </div>
            </div>
        );
    }
    
}