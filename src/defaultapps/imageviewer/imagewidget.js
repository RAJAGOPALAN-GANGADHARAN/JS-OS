import React, { Component } from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import { getFolder } from '../../filesystem/main';
import { draggerDriver } from '../../scripts';


export default class ImageWidget extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { id: "galleryid" + this.props.id,images:this.props.data }
    }
    componentDidMount = () => {
        var movable = document.querySelector('#' + this.state.id);
        draggerDriver(movable);
    }
    render()
    {
        return (
            <div id={this.state.id} style={{
                position: "absolute", width: this.props.width ? this.props.width : "300px", height: this.props.height ? this.props.height : "300px",
                zIndex: 1, right: this.props.right, top: this.props.top,touchAction:"none"
            }}>
                <div className="header"></div>
                <ImageGallery items={this.state.images} showFullscreenButton={false} showThumbnails={false} autoPlay={true}/>
            </div>
        );
    }
}
export function populateImages() {
    var fs = getFolder('root/Data/imagegallery');
    var arr = [];
    var fsf = fs.folderContents;
    for (var note of Object.keys(fs.folderContents)) {
        console.log(fs.folderContents[note]);
        var vv = note;
            arr.push(<ImageWidget id={fsf[vv].fileContents.appData.title} data={fsf[vv].fileContents.appData.images}
                right={fsf[vv].fileContents.appData.right}
                top={fsf[vv].fileContents.appData.top}
                width={fsf[vv].fileContents.appData.width}
                height={fsf[vv].fileContents.appData.height}
            />)
    }

    return arr;
}