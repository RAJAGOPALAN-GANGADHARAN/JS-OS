import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './taskbar.css';
import AppLauncher from '../../applauncher/applauncher';
//test imports
import { eventDispatcher } from '../../handlers';
import { idGen } from '../../scripts';
var html2canvas = require('html2canvas');

export default class TaskIcon extends Component
{
    constructor(props)
    {
        super(props);
        this.assignedEvent=this.assignedEvent.bind(this);
        this.showMiniWindow=this.showMiniWindow.bind(this);
        console.log(this.props.type);
    }
    assignedEvent(appId)
    {
        if(this.props.type=="launcher")
        {
            ReactDOM.render(<AppLauncher/>, document.getElementById('launcher'));
        }
        else
        {
            this.showMiniWindow(appId);
        }
        
    }
    showMiniWindow(id)
    {
        console.log("Hover icon");
        if (this.props.type == "launcher") return;
        try
        {
            html2canvas(document.getElementById(this.props.id), { useCORS: true}).then((canvas) => {
                document.getElementById(this.props.id + "mini").src = canvas.toDataURL();
                document.getElementById(this.props.id + "mini").style.position = "absolute";
                document.getElementById(this.props.id + "mini").style.height = "150px";
                document.getElementById(this.props.id + "mini").style.width = "150px";
                document.getElementById(this.props.id + "mini").style.top = "-150px";
                document.getElementById(this.props.id + "mini").style.zIndex = "3000";
                document.getElementById(this.props.id + "mini").style.display = "block";
            });
        }
        catch(TypeError)
        {
            console.log("do nothing");
        }
    }
    destroy = (event, name) => {
        
        console.log("out");
        document.getElementById(this.props.id + "mini").style.display = "none";
    }
    render()
    {
        return(
            <div className="taskicon-cont" onClick={()=>{this.assignedEvent(this.props.name)}} onMouseEnter={()=>{this.showMiniWindow(this.props.name)}} onMouseLeave={(event)=>this.destroy(event,this.props.name)} >
            <img className="taskicon" src={require(`${this.props.location}`)}></img>
            <img id={this.props.id+"mini"}></img>
            </div>
        );
    }
}