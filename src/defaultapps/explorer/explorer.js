import React,{Component} from 'react';
import './explorer.css';
import { disk } from '../../filesystem/main';
export default class Explorer extends Component
{
    constructor(props)
    {
        super(props);
        this.state={leftPane:[],rightPane:[]};
        this.currentDirectory=disk;
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
            txt:require('../../desktop/taskbaricon/icons/file_txt.png')
        }
        let paneHolder=[],rightPaneHolder=[];
        for(var fcnt in currDisk.folderContents)
        {
            let currentObject=currDisk.folderContents[fcnt];
            /*paneHolder.push(
                <div className="iconStrip">
                <div className="icon"><img src={require('../../desktop/taskbaricon/icons/folder.png')}></img></div> 
                {currentName}
                </div>
            )*/
            if(currentObject.constructor.name==="folderStructure")
            {
                let currentName=currentObject.folderName;
                //console.log(currentName)
                rightPaneHolder.push(
                <div className="iconHolder" onClick={()=>{this.folderSwitcher(currentName)}}>
                <img src={require('../../desktop/taskbaricon/icons/folder.png')} alt="iconHolder"></img>
                {currentName}
                </div>
                )
            }
            else
            {
                let currentName=currentObject.completeName;
                let ext=currentObject.fileExtension.split('.')[1];
                rightPaneHolder.push(
                <div className="iconHolder" >
                <img src={fileLogo[ext]} alt="iconHolder"></img>
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