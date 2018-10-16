import React,{Component} from 'react';
import './taskbar.css';
import TaskbarIcon from '../taskbaricon/taskbaricon';
import {theme_color_panels} from '../../globalvariables';
import {eventHandler} from '../../handlers';
import Time from './time/time';
import { taskBarPresent } from '../../config';
//import { url } from 'inspector';

export default class Taskbar extends Component
{
    constructor(props)
    {
        super(props);
        this.state={taskbarcolor:theme_color_panels,taskbartype:'solid',taskBarApps:{},taskBarAppsHolder:[]};
        this.manager=this.manager.bind(this);
        /*setInterval(()=>{
            this.setState({taskbarcolor:theme_color_panels,TaskbarApps:eventHandler}),10}
        );*/
    }
    componentDidMount()
    {
        setInterval(()=>{
            this.setState({taskbarcolor:theme_color_panels});
        },10);
        this.setState({taskBarApps:eventHandler})
    }
    componentDidUpdate(prevProps,prevState)
    {

        var sizePresent=Object.keys(this.state.taskBarApps).length;
        var sizeAvailable=this.state.taskBarAppsHolder.length
        if(sizePresent!=sizeAvailable)
        {
            var size = Object.keys(this.state.taskBarApps).length;
            this.manager(sizePresent);
        }
    }
    manager(size)
    {
        let holder=[];
        if(holder.length<=size)
        {
            for(var taskId in this.state.taskBarApps)
            {
                let taskBarIconElement=this.state.taskBarApps[taskId];
                console.log(taskBarIconElement);
                holder.push(<TaskbarIcon location={taskBarIconElement.iconData} name={taskBarIconElement.id}/>);
            }
            this.setState({taskBarAppsHolder:holder});
        }
    }
    /*
    <TaskbarIcon location={"./icons/google.png"}/>
            <TaskbarIcon location={"./icons/browser.png"}/>
     */       
    render()
    {
        return(
            <div id="taskbar" style={{backgroundColor:this.state.taskbarcolor}}>
            <TaskbarIcon type={"launcher"} location={"./icons/launcher.png"}/>
            <TaskbarIcon type={"explorer"} location={"./icons/folder.png"}/>
            <TaskbarIcon type={"testSpawner"} location={"./icons/browser.png"}/>
            <TaskbarIcon type={"terminal"} location={"./icons/terminal.png"}/>
            {this.state.taskBarAppsHolder.map(task=>task)}
            <Time/>
            </div>
        );
    }
}
/*
export default class Taskbar extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            taskbarcolor:theme_color_panels,
            taskbartype:'solid',
            taskBarAppsPresent:{},
            taskBarAppsRunning:{},
            taskBarAppsHolder:[]
        };
        this.manager=this.manager.bind(this);
        /*setInterval(()=>{
            this.setState({taskbarcolor:theme_color_panels,TaskbarApps:eventHandler}),10}
        );
    }
    componentDidMount()
    {
        this.setState({
            taskBarAppsRunning:eventHandler,
            taskBarAppsPresent:taskBarPresent
        })
    }
    componentDidUpdate(prevProps,prevState)
    {

        var sizePresent=Object.keys(this.state.taskBarAppsRunning).length;
        var sizeAvailable=this.state.taskBarAppsHolder.length
        if(sizePresent!=sizeAvailable)
        {
            var size = Object.keys(this.state.taskBarAppsRunning).length;
            this.manager(sizePresent);
        }
    }
    manager(size)
    {
        let holder=[];
        if(holder.length<=size)
        {
            for(var taskId in this.state.taskBarAppsRunning)
            {
                let taskBarIconElement=this.state.taskBarAppsRunning[taskId];
                console.log(taskBarIconElement);
                holder.push(<TaskbarIcon location={taskBarIconElement.iconData} name={taskBarIconElement.id}/>);
            }
            this.setState({taskBarAppsHolder:holder});
        }
    }
    /*
    <TaskbarIcon location={"./icons/google.png"}/>
            <TaskbarIcon location={"./icons/browser.png"}/>
            
    render()
    {
        return(
            <div id="taskbar" style={{backgroundColor:this.state.taskbarcolor}}>
            <TaskbarIcon type={"launcher"} location={"./icons/launcher.png"}/>
            <TaskbarIcon type={"explorer"} location={"./icons/folder.png"}/>
            <TaskbarIcon type={"testSpawner"} location={"./icons/browser.png"}/>
            <TaskbarIcon type={"terminal"} location={"./icons/terminal.png"}/>
            {this.state.taskBarAppsHolder.map(task=>task)}
            <Time/>
            </div>
        );
    }
}*/