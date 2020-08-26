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
    /*testSpawner()
    {
        eventDispatcher('./icons/google.png');
    }*/
    assignedEvent(appId)
    {
        if(this.props.type=="launcher")
        {
            ReactDOM.render(<AppLauncher/>, document.getElementById('launcher'));
        }
        else
        {
            this.showMiniWindow(appId);
            //eventDispatcher(appId);
        }
        
    }
    showMiniWindow(id)
    {
        console.log("Hover icon");
        if (this.props.type == "launcher") return;
        try
        {
            // var element1=document.getElementById(this.props.id+"parent");
            // var element3=document.getElementById(this.props.id+"taskParent");
            // var element2=document.getElementById(this.props.id+"mini");
            // //element2.innerHTML=element1.innerHTML;
            // element2.appendChild(element1.cloneNode(true));
            // element2.style.height="50px";
            // element2.style.width="50px";
            // element2.style.position="absolute";
            // element2.style.top="-300px";
            // var rect=element3.getBoundingClientRect();
            // console.log(rect);
            // element2.style.left=rect.left/2;
            // var element=element2.getElementById(this.props.id);
            // // element.style.height="100%";
            // // element.style.width="100%";
            html2canvas(document.getElementById(this.props.id)).then((canvas) => {
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