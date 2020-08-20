import React,{Component} from 'react';
import './explorer.css';
import {  resizeDriver, Stack } from '../../scripts';
import { disk,fileLogo } from '../../filesystem/main';
import { eventDispatcher } from '../../handlers';
export default class Explorer extends Component
{
    constructor(props)
    {
        super(props);
        this.state={leftPane:[],rightPane:[]};
        this.currentDirectory=this.props.fs;
        this.flowControl=[];
        this.flowPtr=0;
        this.settingsModifier=this.settingsModifier.bind(this);
        this.folderPopulator=this.folderPopulator.bind(this);
        this.folderSwitcher=this.folderSwitcher.bind(this);
        this.goBackN=this.goBackN.bind(this);
    }
    settingsModifier()
    {
        var content=document.getElementById(this.props.id);
        var contentContent=content.querySelector('.content');
        contentContent.style.background="transparent";
        var explorer=contentContent.querySelector('#Explorer');
        var leftPane=explorer.querySelector('.leftPane');
        leftPane.style.backgroundColor="black";
        leftPane.style.opacity=0.8;
        var rightPane=explorer.querySelector('.rightPane');
        rightPane.style.backgroundColor="white";
    }
    folderSwitcher(name)
    {
        console.log(this.state.currentDirectory,name);
        //console.log(this.state.currentDirectory["home0"]);
        //console.log(this.state.currentDirectory.folderContents[name]);
        this.flowControl[this.flowPtr]=this.currentDirectory;
        this.currentDirectory=this.currentDirectory.folderContents[name];
        this.folderPopulator(this.currentDirectory);
    }
    goBackN()
    {
        this.currentDirectory=this.flowControl[this.flowPtr--];
        this.folderPopulator(this.currentDirectory);
    }
    folderPopulator(currDisk)
    {
        console.log(currDisk);
        var fileLogo={
            pdf:require("../../desktop/taskbaricon/icons/file_pdf.png"),
            txt: require('../../desktop/taskbaricon/icons/file_txt.png'),
            img: require('../../desktop/taskbaricon/icons/gallery.png')
        }
        let paneHolder=[],rightPaneHolder=[];
        var xaxis=0,yaxis=0,content;
        for(var fcnt in currDisk.folderContents)
        {
            let currentObject=currDisk.folderContents[fcnt];
            if(currentObject.isFolder==true)
            {
                let currentName=currentObject.folderName;
                //console.log(currentName)
                rightPaneHolder.push(
                <div className="iconHolder" onClick={()=>{this.folderSwitcher(currentName)}}>
                <img src={require('../../desktop/taskbaricon/icons/folder.png')}></img>
                {currentName}
                </div>
                )
            }
            else
            {
                let currentName=currentObject.completeName;
                let ext = currentObject.fileExtension.split('.')[1];
                let customIcon = currentObject.fileContents.icon;
                console.log(customIcon);
                rightPaneHolder.push(
                <div className="iconHolder" onClick={()=>{eventDispatcher(currentObject.fileContents.app,currentObject.fileContents.appData)}}>
                <img src={customIcon ? require(`../../desktop/taskbaricon/icons/${customIcon}`):fileLogo[ext]}></img>
                {currentName}
                </div>
                )
            }
        }
        console.log('Changed');
        this.setState({leftPane:paneHolder,rightPane:rightPaneHolder});
    }
    componentDidMount()
    {
        console.log(this.props.id);
        //****experimental
        //let pane=document.getElementById('Explorer').getElementsByClassName('leftPane')[0];
        //* ****
        
        this.settingsModifier();
        this.folderPopulator(this.currentDirectory);
    }
    render()
    {
        return(
            <div id="Explorer">
                <div className="leftPane">
                <div className="button_cont_explorer">
                <div className="button_cont_explorer_button back_button" onClick={this.goBackN} >
                <span className="back_mark">&lArr;</span>
                </div>
                <div className="button_cont_explorer_button back_button" onClick={this.maximize} >
                <span className="back_mark">&rArr;</span>
                </div>
                </div>
                {this.state.leftPane}
                
                </div>
                <div className="rightPane">
                {this.state.rightPane}
                </div>
            </div>
        )
    }
}