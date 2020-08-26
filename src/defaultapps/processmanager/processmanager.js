import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FaWind, FaWindowClose } from 'react-icons/fa';
import { eventShredder } from '../../handlers';
var sizeof = require('object-sizeof')
export default class ProcessManager extends Component
{
    constructor(props)
    {
        super(props);
        this.state={}
    }
    destroy = (event, id) => {
        console.log(id);
        eventShredder(id);
    }
    draw = () => {
        console.log("Draw");
        let td = this.props.data;
        let dat = Object.keys(td).sort((a, b) => sizeof(td[a]) - sizeof(td[b]));
        let darr = []
        darr.push(<div style={{ display: "flex", height: "25px", border: "solid black 1px" }}>
            <div style={{ margin: "5px" }}>ProcessName</div>
            <div style={{ marginLeft:"100px",marginTop:"5px"}}>ProcessMemory(K)</div>
        </div>)
        for (var x = 0; x < dat.length; ++x)
        {
            var vx = td[dat[x]];
            var vicon = vx.iconData.substring(2);
            let id = dat[x];
            console.log(dat[x]);
            darr.push(
                <div style={{display:"flex",width:"100%",height:"50px",border:"solid black 1px"}}>
                    <img style={{ margin: "5px", width: "30px", height: "30px" }} src={require('../../desktop/taskbaricon/' + vicon)}></img>
                    <div style={{ margin: "10px" }}>{vx.processName}</div>
                    <div style={{ marginLeft: "120px", marginTop: "10px" }}>{sizeof(vx)}</div>
                    <Button style={{ margin: "10px" }} onClick={(event) =>this.destroy(event,id)}
                    ><FaWindowClose /></Button>
                </div>
                //<div><img src={require(`../../desktop/taskbaricon/./icons/browser.png`)}></img></div>
            )
        }
        this.setState({ process: darr });
    }
    async componentDidMount(){
        this.interval=setInterval(() => this.draw(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render()
    {
        return (<div styel={{overflowX:"auto"}}>{this.state.process}</div>)
    }
}