import React,{Component} from 'react';
import './explorer.css';
import {  resizeDriver } from '../../scripts';
import { disk,fileLogo } from '../../filesystem/main';
export default class Explorer extends Component
{
    constructor(props)
    {
        super(props);
        this.state={leftPane:[],rightPane:[],currentDirectory:disk};
        this.settingsModifier=this.settingsModifier.bind(this);
        this.folderPopulator=this.folderPopulator.bind(this);
        this.folderSwitcher=this.folderSwitcher.bind(this);
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
        console.log();
        //console.log(this.state.currentDirectory["home0"]);
        //console.log(this.state.currentDirectory.folderContents[name]);
        this.setState({currentDirectory:this.state.currentDirectory.folderContents[name]});
        this.folderPopulator(this.state.currentDirectory)
    }
    folderPopulator(disk)
    {
        var fileLogo={
            pdf:require("../../desktop/taskbaricon/icons/file_pdf.png"),
            txt:require('../../desktop/taskbaricon/icons/file_txt.png')
        }
        let paneHolder=[],rightPaneHolder=[];
        var xaxis=0,yaxis=0,content;
        for(var fcnt in disk.folderContents)
        {
            let currentObject=disk.folderContents[fcnt];
            /*paneHolder.push(
                <div className="iconStrip">
                <div className="icon"><img src={require('../../desktop/taskbaricon/icons/folder.png')}></img></div> 
                {currentName}
                </div>
            )*/
            if(currentObject.constructor.name=="folderStructure")
            {
                let currentName=currentObject.folderName;
                rightPaneHolder.push(
                <div className="iconHolder" onClick={()=>{this.folderSwitcher(currentName)}}>
                <img src={require('../../desktop/taskbaricon/icons/folder.png')}></img>
                {currentName}
                </div>
                )
            }
            else{
                let currentName=currentObject.completeName;
                let ext=currentObject.fileExtension.split('.')[1];
                rightPaneHolder.push(
                <div className="iconHolder" onClick={()=>{this.folderSwitcher(currentName)}}>
                <img src={fileLogo[ext]}></img>
                {currentName}
                </div>
                )
            }
        }
        this.setState({leftPane:paneHolder,rightPane:rightPaneHolder});
    }
    componentDidMount()
    {
        console.log(this.props.id);
        //****experimental
        //let pane=document.getElementById('Explorer').getElementsByClassName('leftPane')[0];
        //* ****
        
        this.settingsModifier();
        this.folderPopulator(this.state.currentDirectory);
    }
    render()
    {
        return(
            <div id="Explorer">
                <div className="leftPane">
                {this.state.leftPane}
                </div>
                <div className="rightPane">
                {this.state.rightPane}
                </div>
            </div>
        )
    }
}