import { idGen } from "./scripts";
import React from 'react';
import ReactDOM from 'react-dom';
import Window from "./window/window";
import Explorer from "./defaultapps/explorer/explorer";
import { Terminal } from "./defaultapps/terminal/terminal";
import { disk } from "./filesystem/main";
import { Test } from "./misc/misc";
import { TimeApp } from "./desktop/taskbar/time/time";
import Editor from "./defaultapps/texteditor/editor";
import TaskbarIcon from './desktop/taskbaricon/taskbaricon';
import ToDoApp from "./defaultapps/TodoApp/TodoApp";
import Calculator from "./defaultapps/Calculator/calculator";

class runningTasks
{
    constructor(runningId,appData,code)
    {
        this.id=runningId;
        this.iconData=appData.processIcon;
        this.processName=appData.processName;
        this.Source=appData.Source;
        this.code = code;
        console.log(this.id);
        //console.log(this.code,"Inside contructor")
    }
    
}
class appData
{
    constructor(name,icon,Source)
    {
        this.processName=name;
        this.processIcon=icon;
        this.Source=Source;
        console.log('here')
    }
}
export var appRegistry={};//installed apps track
export var eventHandler={};//running apps track


export function appInstaller(name,icon,Source)
{
    //var appId=idGen(10);
    appRegistry[name]=new appData(name,icon,Source);
}
export function defaultAppsInstaller()
{
    console.log('Here now')
    appInstaller('test','./icons/browser.png',<Test/>);
    appInstaller('explorer','./icons/folder.png',<Explorer/>);
    appInstaller('terminal','./icons/terminal.png',<Terminal directory={disk}/>);
    appInstaller('time','./icons/clock.png',<TimeApp/>)
    appInstaller('editor','./icons/notepad.png',<Editor/>)
    appInstaller('TodoApp','./icons/todoapp.jpg',<ToDoApp/>)
    appInstaller('Calculator','./icons/Calculator.jpg',<Calculator/>)
    console.log(appRegistry);
}
function parentGen(id)
{
    var element=document.createElement("div");
    element.setAttribute('id',id+'parent');
    element.style.width="100%";
    element.style.height="calc(100% - 55px)";
    var desktop=document.getElementById("desktop");
    element.style.position="absolute";
    desktop.appendChild(element);
    return element;
}
function isAlreadyRunning(appName)
{
    console.log(appName);
    for(var task in eventHandler)
    {
        if(appName===eventHandler[task].processName)
        return true;
    }
    return false;
}
export function taskParentGen(id)
{
    var element=document.createElement("div");
    element.setAttribute('id',id+'taskParent');
    element.style.width="3%";
    element.style.height="100%";
    //element.style.backgroundColor="green";
    //element.style.display="table-cell";
    var taskbar=document.getElementById("taskbar");
    //element.style.position="absolute";
    taskbar.appendChild(element);
    return element;
}
export function eventDispatcher(requestedAppId,content)
{
    let id=idGen(10);
    var isRunning=isAlreadyRunning(appRegistry[requestedAppId].processName)
    //may add a if statement here 
    if(requestedAppId==='editor'){
        console.log(content)
        eventHandler[id] = new runningTasks(id,appRegistry[requestedAppId],content)
        if(!isRunning)
        {
            var tPG=taskParentGen(id);
            console.log('here')
            ReactDOM.render(<TaskbarIcon id={id} name={eventHandler[id].processName} location={`${eventHandler[id].iconData}`}/>,tPG)
        }
        ReactDOM.render(<Window id={id} source={eventHandler[id].Source}/>,parentGen(id));

    }else{
        eventHandler[id]=new runningTasks(id,appRegistry[requestedAppId]);
        console.log(eventHandler[id]);
            if(!isRunning)
        {
            var tPG=taskParentGen(id);
            console.log('here')
            ReactDOM.render(<TaskbarIcon id={id} name={eventHandler[id].processName} location={`${eventHandler[id].iconData}`}/>,tPG)
        }
        console.log('here')
        ReactDOM.render(<Window id={id} source={eventHandler[id].Source}/>,parentGen(id));
        console.log('here')
    }
    
}
function parentDestroy(id)
{
    let element=document.getElementById(id+'parent');
    ReactDOM.unmountComponentAtNode(element);
    element.parentNode.removeChild(element);
}
function taskParentDestroy(id)
{
    let element=document.getElementById(id+'taskParent');
    ReactDOM.unmountComponentAtNode(element);
    element.parentNode.removeChild(element);
}
export function eventShredder(id)
{
    var task=eventHandler[id].processName;
    delete eventHandler[id];
    var isRunning=isAlreadyRunning(task);
    parentDestroy(id);
    if(!isRunning)
    {
        taskParentDestroy(id);
    }
}

