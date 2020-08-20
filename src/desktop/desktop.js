import React,{Component} from 'react';
import './desktop.css';
import backgroundImage from '../assests/bgtest.jpg';
import Fullscreen from 'react-full-screen';
import Taskbar from './taskbar/taskbar';
import Panel from './notification/notification';
import Window from '../window/window';
import {modify} from '../globalvariables';
import {eventHandler, defaultAppsInstaller,eventDispatcher} from '../handlers';
import ContextMenu from './contextmenu';
import { disk } from '../filesystem/main';
export default class Desktop extends Component
{
    constructor(props)
    {
        super(props);
        //state for desktop component
        /*
        1.background image
        2.icons size
        */
        //bind
        this.backgroundSetter=this.backgroundSetter.bind(this);
        this.goFullScreen=this.goFullScreen.bind(this);
        //this.adder=this.adder.bind(this);
        //this.closer=this.closer.bind(this);
        this.state={
            bgimage:null,isFull:false,visible:false,desktopIcons:null
        };
    }
    goFullScreen()
    {
        this.setState({ isFull: true });
    }
    folderPopulator=(currDisk)=> {
        console.log(currDisk);
        var fileLogo = {
            pdf: require("./taskbaricon/icons/file_pdf.png"),
            txt: require('./taskbaricon/icons/file_txt.png'),
            img: require('./taskbaricon/icons/gallery.png')
        }
        let paneHolder = [], rightPaneHolder = [];
        var xaxis = 10, yaxis = 50;
        for (var fcnt in currDisk.folderContents) {
            let currentObject = currDisk.folderContents[fcnt];
            console.log(xaxis,yaxis)
            if (currentObject.isFolder == true) {
                let currentName = currentObject.folderName;
                rightPaneHolder.push(
                    <div className="iconHolderDesktop" style={{ top: `${yaxis}px`,left:`${xaxis}px` }} onClick={() => { eventDispatcher('Explorer',null,currentObject) }}>
                        <img src={require('./taskbaricon/icons/folder.png')}></img>
                        {currentName}
                    </div>
                )
            }
            else {
                let currentName = currentObject.completeName;
                let ext = currentObject.fileExtension.split('.')[1];
                let customIcon = currentObject.fileContents.icon;
                console.log(customIcon);
                rightPaneHolder.push(
                    <div className="iconHolderDesktop" style={{ top: `${yaxis}px`, left: `${xaxis}px` }} onClick={() => { eventDispatcher(currentObject.fileContents.app, currentObject.fileContents.appData) }}>
                        <img src={customIcon ? require(`./taskbaricon/icons/${customIcon}`) : fileLogo[ext]}></img>
                        {currentName}
                    </div>
                )
            }
            xaxis += 100
            if (xaxis == 300)
            {
                yaxis += 100
                xaxis = 10
            }
        }
        console.log('Desktop Changed');
        this.setState({ desktopIcons: rightPaneHolder });
    }
    componentDidMount()
    {
        this.folderPopulator(disk.folderContents['desktop'])
        this.setState({bgimage:backgroundImage},this.backgroundSetter);
        defaultAppsInstaller();
    }
    backgroundSetter()
    {
        document.getElementById('desktop').style.backgroundImage=`url('${this.state.bgimage}')`;
    }
    render()
    {
        //desktop of the os
        /*<button onClick={()=>{this.setState({test:<Window/>})}}>spawn</button>
                {this.state.test}
                <div className='custom-menu' >
                <li onClick={()=>modify()}>Change color</li>
                </div>*/
        return(
            <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({isFull})}>
                <ContextMenu/>
                <div id="launcher">
                </div>
                <div id="desktop">
                <Panel parent_class={this}/>
                    {this.state.desktopIcons}
                <Taskbar/>
                </div>
            </Fullscreen>
        );
    }
}
/*
<Window />
                <Window temp={<button>Install</button>}/>
                <Window />
                */