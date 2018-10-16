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
        this.showWindow=this.showWindow.bind(this);
        console.log(this.props.type);
    }
    /*testSpawner()
    {
        eventDispatcher('./icons/google.png');
    }*/
    testSpawner(appId)
    {
        eventDispatcher(appId);
    }
    assignedEvent()
    {
        if(this.props.type=="launcher")
        {
            ReactDOM.render(<AppLauncher/>, document.getElementById('launcher'));
        }
        if(this.props.type=="testSpawner")
        {
            this.testSpawner('test');
        }
        if(this.props.type=="explorer")
        {
            this.testSpawner('explorer');
        }
        if(this.props.type=="terminal")
        {
            this.testSpawner('terminal');
        }
    }
    showWindow()
    {
    }
    render()
    {
        return(
            <div className="taskicon-cont" onClick={()=>{this.assignedEvent()}} onMouseOver={()=>{this.showWindow()}}>
            <img className="taskicon" src={require(`${this.props.location}`)}></img>
            </div>
        );
    }
}