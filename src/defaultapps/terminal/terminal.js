import React,{Component} from 'react';
import './terminal.css';

export class Terminal extends Component
{
    constructor(props){
        super(props);
        this.state = {
            cmd : ""
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
            }else
            console.log(this.state.cmd)
        }
    }
    render()
    {       
        return(
            <div id="terminal">
                <div id="terminal-input">
                    <div id="terminalOutput"></div>
                    user@root:-$
                    <input className="input" id="input" name="input" type="text" onKeyUp={this.handleKeyPress}/>
                </div>
            </div>
        );
    }
    
}