import React,{Component} from 'react';
import './time.css';
import { eventDispatcher } from '../../../handlers';

import Clock from 'react-clock'
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
            <div id="time-cont" onClick={()=>{eventDispatcher('Clock')}}>
            <div id="line-1">{this.state.date.getHours()+':'+this.state.date.getMinutes()}</div>
                <div id="line-2">{this.state.date.getDay() + '-' + eval(this.state.date.getMonth()+1) + '-'+this.state.date.getFullYear()}</div>
            </div>
        );
    }
}

export class TimeApp extends Component
{
    constructor(props)
    {
        super(props);
        this.interval = null;
        this.state = { value: new Date() }
    }
    componentDidMount = () => {
        this.interval = setInterval(
            () => this.setState({ value: new Date() }),
            1000
        );
    }
    componentWillUnmount = () => {
        clearInterval(this.interval);
    }
    render()
    {
        return(
            <div style={{backgroundColor:"lightgrey",width:"100%",height:"100%",alignContent:"center"}}>
                <Clock value={this.state.value} />
            </div>
        )
    }

}