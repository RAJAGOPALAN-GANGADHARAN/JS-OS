import React,{Component} from 'react';
import { relative } from 'path';
var request=require('request');
export default class Empty extends Component
{
    //Empty window
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(<div></div>);
    }
}
export class Test extends Component
{
    constructor(props)
    {
        super(props);
        this.state={var:null}
    }
    componentDidMount=()=>
    {
        /*var tempVar=`
        <style>
        .bike{
            color:red;
        }
        </style>
        <div>YOLO</div>
        <div>Yolo2</div>
        <li class="bike">Bike1</li>`;
        this.setState({var:tempVar})
        */
        // request({
        //     uri: "https://google.com"
        // }, (error, response, body) => {
        //         console.log("Here");
        //     console.log(error, response)
        //     this.setState({ var: body })
        // });
       
    }
    render()
    {
        return (
            
            <div style={{overflow:'hidden',position:relative}} dangerouslySetInnerHTML={{__html:this.state.var}}>   
            </div>
        )
    }
}