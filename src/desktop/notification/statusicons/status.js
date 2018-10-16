import React,{Component} from 'react';
import './status.css';

import { IconContext } from "react-icons";
import {status_color} from '../../../globalvariables';
export default class Status extends Component
{
    constructor(props)
    {
        super(props);
        this.props.event.bind(this);
    }
    render()
    {
        return(
            <IconContext.Provider value={{ color: status_color, className: "status_icons "+this.props.styles}}>
            <div className="status" onClick={this.props.event}>
                {this.props.icon}
            </div>
            </IconContext.Provider>  
        )
    }
}