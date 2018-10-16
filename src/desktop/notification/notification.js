import React,{Component} from 'react';
import './notification.css';
import Status from './statusicons/status';
import {theme_color_panels,notify_status} from '../../globalvariables';
import { FaExpand,FaBell } from 'react-icons/fa';

export default class Panel extends Component
{
    constructor(props)
    {
        super(props);
        this.expand=this.expand.bind(this);
        this.state={panelcolor:theme_color_panels,paneltype:'solid'};
    }
    expand()
    {
        this.props.parent_class.setState({ isFull: true });
    }
    nullBind()
    {

    }
    render()
    {
        return(
            <div id="notificationpanel" style={{backgroundColor:this.state.panelcolor}}>
            <Status icon={<FaExpand/>} event={this.expand} styles="expand_icon"/>
            {notify_status?(<Status icon={<FaBell/>} event={this.nullBind}/>):(<Status icon={<FaBell/>} event={this.nullBind}/>)}
            </div>
        )
    }
}