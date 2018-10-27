import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './taskbar.css';
import AppLauncher from '../../applauncher/applauncher';
//test imports
import { eventDispatcher } from '../../handlers';
import { idGen } from '../../scripts';

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
            eventDispatcher(appId);
        }
        
    }
    showMiniWindow(id)
    {
        try
        {
            var element1=document.getElementById(this.props.id+"parent");
            var element3=document.getElementById(this.props.id+"taskParent");
            var element2=document.getElementById(this.props.id+"mini");
            element2.innerHTML=element1.innerHTML;
            element2.style.height="100px";
            element2.style.width="100px";
            element2.style.position="absolute";
            element2.style.top="-200px";
            var rect=element3.getBoundingClientRect();
            console.log(rect);
            element2.style.left=rect.left/2;
            var element=element2.getElementById(this.props.id);
            element.style.height="100%";
            element.style.width="100%";
        }
        catch(TypeError)
        {
            console.log("do nothing");
        }
    }
    render()
    {
        return(
            <div className="taskicon-cont" onClick={()=>{this.assignedEvent(this.props.name)}} >
            <img className="taskicon" src={require(`${this.props.location}`)}></img>
            <div id={this.props.id+"mini"}></div>
            </div>
        );
    }
}