import React, { Component } from 'react';
 // requires a loader
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
        sizes:'100x100'
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
        sizes: '100x100'
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        sizes: '100x100'
    },
];
export default class ImageViewer extends Component
{
    constructor(props)
    {
        super(props);
        this.state={images:this.props.appData}
    }
    render() {
        return (
            <div style={{width:"100%",height:"100%"}}>
                <ImageGallery items={this.state.images ? this.state.images : images} showFullscreenButton={false} thumbnailPosition={"top"}/>
            </div>
        );
    }
}