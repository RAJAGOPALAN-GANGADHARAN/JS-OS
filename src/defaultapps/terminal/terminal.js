import React,{Component} from 'react';
import './terminal.css';
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
            var newline = () => {
                var terminalOutput=document.getElementById('terminalOutput');
                var element = document.createElement("div");
                element.appendChild(document.createTextNode('user@root:-$'))
                var breakStatement= document.createElement("br")
                element.appendChild(breakStatement);
                terminalOutput.append(element)
            }
            if(this.state.cmd.length===0){
                newline()
            }else{
                if(e.target.value === "tree"){
                    commands.tree()  
                }
                if(e.target.value === "ls"){
                    commands.ls()
                }
                var regex_cat = /cat/g;
                var regex_argument = /^\S*\s+(\S+)/;
                var argument = regex_argument.exec(e.target.value);
                if(regex_cat.exec(e.target.value)){
                    commands.cat(argument[1])
                }
                var regex_rm = /rm/g;
                var regex_argument = /^\S*\s+(\S+)/;
                var argument = regex_argument.exec(e.target.value)
                if(regex_rm.exec(e.target.value)){
                    commands.rm(argument[1])
                }


                var regex_touch = /touch/g
                argument = regex_argument.exec(e.target.value)
                if(regex_touch.exec(e.target.value)){
                    commands.touch(argument[1])
                    console.log(argument[1])
                    newline()
                }
                var regex_mkdir = /mkdir/g
                argument = regex_argument.exec(e.target.value)
                if(regex_mkdir.exec(e.target.value)){
                    commands.mkdir(argument[1])
                    console.log(argument[1])
                    newline()
                }
            }
            
        }
        
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