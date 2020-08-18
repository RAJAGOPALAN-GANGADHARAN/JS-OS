import React, { Component } from 'react';

export default class PdfReader extends Component
{
    constructor(props)
    {
        super(props);
        this.state={data:null}
        if (this.props.appData === null) {
            this.state.data = "data:text/html;charset=utf-8,%3Chtml%3E%3Cbody%3EReactPdf%3C/body%3E%3C/html%3E";
        }
        else
            this.state.data = this.props.appData;
    }
    
    render()
    {
        return (
            <iframe style={{width:"100%",height:"100%"}} src={this.state.data}/>
        );
    }
}