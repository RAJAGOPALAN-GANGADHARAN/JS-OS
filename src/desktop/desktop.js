import React,{Component} from 'react';
import './desktop.css';
import backgroundImage from '../assests/bgtest.jpg';
import Fullscreen from 'react-full-screen';
import Taskbar from './taskbar/taskbar';
import Panel from './notification/notification';
import Window from '../window/window';
import {modify} from '../globalvariables';
import {eventHandler, defaultAppsInstaller} from '../handlers';
import ContextMenu from './contextmenu';
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
            bgimage:null,isFull:false,visible:false
        };
    }
    goFullScreen()
    {
        this.setState({ isFull: true });
    }
    componentDidMount()
    {
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