import React, { Component } from 'react';
import { getFolder } from '../../filesystem/main';
import { draggerDriver } from '../../scripts';
class StickyNotes extends Component
{
    constructor(props)
    {
        super(props);
        this.state={id:"noteid"+this.props.id}
    }
    componentDidMount = () => {
        var movable = document.querySelector('#' + this.state.id);
        //draggerDriver(movable);
        draggerDriver(movable);
    }
    render()
    {
        return (
            <div id={this.state.id} style={{
                position: "absolute", width: "200px", height: "100px",
                backgroundColor: this.props.color, zIndex: 1, right: "30px",top:"100px",
                color:"white",overflow:"auto"
            }}>
                <div className="header"></div>
                {this.props.data}
        </div>
        );
    }
}
export function populateSticky()
{
    var fs = getFolder('root/Data/stickynotes');
    var arr = [];
    var fsf = fs.folderContents;
    for (var note of Object.keys(fs.folderContents))
    {
        //console.log(fs.folderContents[note]);
        var vv = note;
        if(fsf[vv].fileContents.appData.desktop==true)
        arr.push(<StickyNotes id={fsf[vv].fileContents.appData.title} data={fsf[vv].fileContents.appData.desc}
            color={fsf[vv].fileContents.appData.color} />)
    }

    return arr;
}