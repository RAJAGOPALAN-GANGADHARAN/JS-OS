import { idGen } from "./scripts";
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Window from "./window/window";
import Explorer from "./defaultapps/explorer/explorer";
import { Terminal } from "./defaultapps/terminal/terminal";
import { disk } from "./filesystem/main";
import Empty, { Test } from "./misc/misc";
import { TimeApp } from "./desktop/taskbar/time/time";
import WordEditor from "./defaultapps/texteditor/editor";
import TaskbarIcon from './desktop/taskbaricon/taskbaricon';
import PdfReader from "./defaultapps/pdf/pdf";
import ImageViewer from "./defaultapps/imageviewer/imageviewer";
import RCalendar from "./defaultapps/calendar/calendar";
import MinesweeperGame from "./defaultapps/games/minesweeper/minesweeper";
import MarkdownReader from "./defaultapps/markdown/markdown_reader";
import { Particle } from "./defaultapps/games/particle/particle";
import CodeStudio from "./defaultapps/codestudio/codestudio";


class runningTasks
{
    constructor(runningId,appData)
    {
        this.id=runningId;
        this.iconData=appData.processIcon;
        this.processName=appData.processName;
        this.Source=appData.Source;
        console.log(this.id);
    }
}
class appData
{
    constructor(name,icon,Source)
    {
        this.processName=name;
        this.processIcon=icon;
        this.Source=Source;
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
    appInstaller('Test','./icons/browser.png',<Test/>);
    appInstaller('Explorer', './icons/folder.png', <Explorer/>);
    appInstaller('Terminal','./icons/terminal.png',<Terminal directory={disk}/>);
    appInstaller('Time','./icons/clock.png',<TimeApp/>)
    appInstaller('Editor', './icons/notepad.png', <WordEditor />)
    appInstaller('PDFReader', './icons/file_pdf.png', <PdfReader />)
    appInstaller('ImageViewer', './icons/gallery.png', <ImageViewer />);
    appInstaller('Calendar', './icons/calendar.png', <RCalendar />)
    appInstaller('Minesweeper', './icons/minesweeper.png', <MinesweeperGame />);
    appInstaller('Markdown', './icons/markdown.png', <MarkdownReader />);
    appInstaller('Particle3D', './icons/Particle.png', <Particle />)
    appInstaller('CodeStudio','./icons/vscode.png',<CodeStudio/>)
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
        if(appName==eventHandler[task].processName)
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
export function eventDispatcher(requestedAppId,data=null,fs=null)
{
    if (requestedAppId in appRegistry === false)
        return false;
    
    let id=idGen(10);
    var isRunning=isAlreadyRunning(appRegistry[requestedAppId].processName)
    eventHandler[id]=new runningTasks(id,appRegistry[requestedAppId]);
    console.log(eventHandler[id].processIcon);
    if(!isRunning)
    {
        var tPG=taskParentGen(id);
        ReactDOM.render(<TaskbarIcon id={id} name={eventHandler[id].processName} location={`${eventHandler[id].iconData}`}/>,tPG)
    }
    ReactDOM.render(<Window appName={requestedAppId} id={id} source={eventHandler[id].Source} fs={fs} appData={data}/>,parentGen(id));
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