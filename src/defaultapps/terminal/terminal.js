import React,{Component} from 'react';
import Iframe from 'react-iframe';
import './terminal.css';
import { commandLineProcessor } from './main';
export class Terminal extends Component
{
    constructor(props)
    {
        super(props);
        this.state={id:this.props.id,directory:this.props.directory,prevDirectory:null,lineHolder:[]}
        this.lines=0;
    }
    componentDidMount()
    {
        //var window=document.getElementById(this.state.id);
        //window.style.borderRadius="5px";
        //window.querySelector('.header').style.backgroundColor="red";
        this.element=document.getElementById('terminal');
        this.newLine();
    }
    process(cont)
    {
       let string=cont.value;
       //let opt=commandLineProcessor(string);
       let lex=string.split(' ');
       var holder=this.state.lineHolder;
       if(lex[0]=="ls")
       {
           
           var content=this.state.directory.folderContents;
           for(let dir in content)
           {
               holder.push(
                <div key={this.state.id+this.lines} className="line">
                <div className="line">{content[dir].folderName}/</div>
                </div>
               );
           }
           this.setState({lineHolder:holder});
       }
       else if(lex[0]=="cd")
       {
           if(lex[1]=="..")
           {
                //TO be done
           }
           else
           {
            var content=this.state.directory.folderContents;
            this.setState({directory:content[lex[1]]});
           }
       }
       else
       {
           holder.push(
            <div key={this.state.id+this.lines} className="line">
            <div className="line" style={{color:'red'}}>{lex.join(' ')} is not a valid command</div>
            </div>
           )
       }
    }
    enterHouseKeeping=(e)=>{
        if(e.key === "Enter")
        {
            e.preventDefault();
            var prevLine=document.getElementById(this.state.id+'line'+(this.lines-1));
            this.process(prevLine);
            this.newLine();
        }
    }
    newLine()
    {
        console.log('yolo');
        let holder=this.state.lineHolder;
        console.log(this.props.directory.folderName)
        holder.push(
            <div key={this.state.id+this.lines} className="line">
                <div className="directory">{this.state.directory.folderName}$</div>
                <input id={this.state.id+'line'+this.lines} className="type" onKeyPress={this.enterHouseKeeping} autofocus="true"></input>
            </div>
        );
        this.setState({lineHolder:holder},()=>{
        if(this.lines!=0)
        {
            var prevLine=document.getElementById(this.state.id+'line'+(this.lines-1));
            prevLine.disabled=true;
            var nextLine=document.getElementById(this.state.id+'line'+(this.lines));
            nextLine.focus();
        }
        this.lines++;
        });
    }
    render()
    {
        return(
            <div id="terminal">
              {this.state.lineHolder.map(line=>line)}  
            </div>
            );
    }
    //<Iframe url="./test.html" width="90%" height="100%"/>
}