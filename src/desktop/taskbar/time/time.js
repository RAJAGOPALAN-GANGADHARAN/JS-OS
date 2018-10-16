import React,{Component} from 'react';
import './time.css';
import { eventDispatcher } from '../../../handlers';
import { drawClock } from '../../../scripts';
export default class Time extends Component
{
    constructor(props)
    {
        super(props);
        this.state={date:new Date()}
    }
    componentDidMount()
    {
        setInterval(()=>{this.setState({date:new Date()})},60)
    }
    render()
    {
        return(
            <div id="time-cont" onClick={()=>{eventDispatcher('time')}}>
            <div id="line-1">{this.state.date.getHours()+':'+this.state.date.getMinutes()}</div>
            <div id="line-2">{this.state.date.getUTCDay()+'-'+this.state.date.getUTCMonth()+'-'+this.state.date.getUTCFullYear()}</div>
            </div>
        );
    }
}

export class TimeApp extends Component
{
    componentDidMount()
    {
        var canvas = document.getElementById("clockCanvas");
        var ctx = canvas.getContext("2d");
        var radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90
        setInterval(()=>{drawClock(ctx,radius)}, 1000);
    }
    render()
    {
        return(
            <div>
            <canvas id="clockCanvas"/>
            </div>
        )
    }

}