import React,{Component} from 'react';
import Iframe from 'react-iframe';
import './terminal.css';
import parser from 'yargs-parser';
import { getFolder,validPath, goBack } from '../../filesystem/main';
import { Stack } from '../../scripts';
import axios from 'axios';

var graffiti = String.raw`
 _ __                               _          
' )  )                             //          
 /--' __.  o __.  _,  __ _   __.  // __.  ____ 
/  \_(_/|_/_(_/|_(_)_(_)/_)_(_/|_</_(_/|_/ / <_
         /        /|   /                       
       -'        |/   '                                                         
`
export class Terminal extends Component
{
    constructor(props)
    {
        
        super(props);
        this.state={id:this.props.id,directory:this.props.directory,prevDirectory:null,lineHolder:[]}
        this.lines = 0;
        this.folderPath = 'root';
        this.wait = false;
    }
    componentDidMount()
    {
        this.element=document.getElementById('terminal');
        this.newLine();
    }
    withPath = (content, color) => {
        //this.lines++;
        return (<div key={this.state.id + this.lines} className="line">
            <div className="directory">{this.folderPath}$</div>
            <div className="line" style={{ color: color }}>{content}</div>
            </div>
            )
    }
    withoutPath = (content, color) => {
        //this.lines++;
        return (<div key={this.state.id + this.lines} className="line">
            <div className="line" style={{ color: color }}>{content}</div>
        </div>
        )
    }
    constructPath = (path) => {
        if (path[path.length - 1] == '/')
            path = path.slice(0, -1);
        let res = path.split('/');
        let final =""
        for (var x = 0; x < res.length; ++x)
        {
            if (res[x] == ".") {
                if (final == "")
                    final = this.folderPath;
            }
            else if (res[x] == "..")
                final = goBack(final);
            else {
                if (final!="")
                    final = final + "/" + res[x];
                else final += res[x];
            }
        }
        return final;
    }
    runCode = (file, lang) => {
        let body = {
            fileName: file.completeName,
            fileContent: file.fileContents.appData,
            lang:lang
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        fetch(`https://cms-portfolio-backend-node.herokuapp.com/code/api`, requestOptions).then(data => data.json())
            .then(data => {
                let holder = this.state.lineHolder;
                if (data.error != "")
                {
                    for (let line of data.stderr.split("\n"))
                        holder.push(this.withoutPath(line, "red"));
                }
                else {
                    for (let line of data.stdout.split("\n"))
                        holder.push(this.withoutPath(line, "white"));
                }
                this.setState({lineHolder:holder})
                
            })
            .catch(err => {
                console.log(err);
                
            })
        
    }
    process(cont)
    {
        let string=cont.value;
        var holder = this.state.lineHolder;
        //this.runCode(null, "cpp");

        let arg = parser(string);
        let marg = arg['_'];
        if (marg.length == 0) {
            holder.push(
                this.withPath(`Command ${string} is invalid`, 'red')    
            );
        }
        else if (marg[0] == 'ls')
        {
            var folder = getFolder(this.folderPath).folderContents;
            console.log(folder);
            for (let dir of Object.keys(folder))
            {
                if(folder[dir].isFolder)
                holder.push(
                    this.withoutPath(folder[dir].folderName+"/","violet")
                )
                else holder.push(this.withoutPath(folder[dir].completeName,"blue"))
            }
        }
        else if (marg[0] == 'g++')
        {
            let folder = getFolder(this.folderPath);
            console.log(folder.folderContents[marg[1]]);
            if (folder.folderContents[marg[1]] != null)
            {
                this.runCode(folder.folderContents[marg[1]], 'cpp');
            }
            else 
            {
                console.log("File not found");
                holder.push(this.withoutPath("File not found", "red"));
            }
        }
        else if (marg[0] == 'java')
        {
            let folder = getFolder(this.folderPath);
            if (folder.folderContents[marg[1]] != null) {
                this.runCode(folder.folderContents[marg[1]], 'java');
            }
            else {
                holder.push(this.withoutPath("File not found", "red"));
            }
        }
        else if (marg[0] == 'python') {
            let folder = getFolder(this.folderPath);
            if (folder.folderContents[marg[1]] != null) {
                this.runCode(folder.folderContents[marg[1]], 'python');
            }
            else {
                holder.push(this.withoutPath("File not found", "red"));
            }
        }
        else if (marg[0] == 'cd')
        {
            console.log(arg);
            if (marg.length == 1)
                holder.push(
                    this.withPath(`Command ${string} is invalid requires a parameter`, 'red')
                );
            else {
                let cpath = this.constructPath(marg[1]);
                if (validPath(cpath)) {
                    this.folderPath = cpath;
                }
                else holder.push(this.withPath(`Location ${cpath} not found`, 'red'));
            }
        }

        this.setState({ lineHolder: holder });
    }
    enterHouseKeeping=(e)=>{
        if(e.key === "Enter")
        {
            e.preventDefault();
            
            var prevLine = document.getElementById(this.state.id + 'line' + (this.lines - 1));
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
                <div className="directory">{this.folderPath}$</div>
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
                <pre style={{color:"green"}}>{graffiti}</pre>
              {this.state.lineHolder.map(line=>line)}  
            </div>
            );
    }
    //<Iframe url="./test.html" width="90%" height="100%"/>
}