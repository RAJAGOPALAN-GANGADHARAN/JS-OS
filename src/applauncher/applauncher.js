import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './applauncher.css';
import { appRegistry, eventDispatcher } from '../handlers';

export default class AppLauncher extends Component
{
    constructor(props)
    {
        super(props);
        var modify=document.getElementById("desktop");
        modify.style.filter="blur(5px)";
        modify.style.transform="scale(1.02)";
        this.state={Apps:{},Appholder:[]};
    }
    processStarter(processName)
    {
        console.log(processName)
        this.shredder();
        eventDispatcher(processName);
    }
    componentDidMount()
    {
        let holder=[];
        for(var appId in appRegistry)
        {
            //require('../desktop/taskbaricon/icons')
            let iconLoc=appRegistry[appId].processIcon.split('/');
            let appName=appRegistry[appId].processName;
            holder.push(
            <div key={"apps"+holder.length} className="apps" onClick={()=>{this.processStarter(appName)}}>
                <img src={require("../desktop/taskbaricon/icons/"+iconLoc[2])}></img>
                <div className="name">{appName}</div>
            </div>);
        }
        console.log(holder,'hi');
        this.setState({Appholder:holder});
    }
    componentWillUnmount()
    {
        var modify=document.getElementById("desktop");
        modify.style.filter="blur(0px)";
        modify.style.transform="scale(1)";
    }
    shredder()
    {
        ReactDOM.unmountComponentAtNode(document.getElementById('launcher'));
    }
    render()
    {
        return(
            <div id="applauncher" onClick={this.shredder}>
            {/* <div className="Header">
            <button onClick={this.shredder} className="close">X</button>
            </div> */}
            <div className="appslist">
            {this.state.Appholder}
            </div>
            </div>
        );
    }
}