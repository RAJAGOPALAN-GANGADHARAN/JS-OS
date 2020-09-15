import { folderStructure, fileStructure } from './fileClass';
import React from 'react';
import { populateSticky } from '../defaultapps/stickynotes/sticky';
import { populateImages } from '../defaultapps/imageviewer/imagewidget';

export var disk = new folderStructure('root');
var signal = new fileStructure('signal', '.dat');
signal.addContent({
    handleDraw:false
})
disk.addFile(signal);


export function getFolder(path)
{
    var res = path.split("/");
    var it = disk;
    for (let x = 1; x < res.length; ++x)
        it = it.folderContents[res[x]];
    console.log(res);
    
    return it;
}
export function validPath(path)
{
    var res = path.split("/");
    var it = disk;
    if (res[0] != "root") return false;
    for (let x = 1; x < res.length; ++x) {
        it = it.folderContents[res[x]];
        if (it == null) return false;
    }
    console.log(res);

    return true;
}

export function goBack(path)
{
    var res = path.split("/");
    if (res.length == 1) return it;
    res.pop();
    return res.join('/');

}

var desktop = new folderStructure('desktop');
disk.addObject(desktop);


disk.addObject(new folderStructure('Data'));
getFolder('root/Data').addObject(new folderStructure('stickynotes'));
getFolder('root/Data').addObject(new folderStructure('imagegallery'));
var widgetFile = new fileStructure('widgets', '.dat');
widgetFile.addContent({
    appData: [
        [populateSticky],[populateImages]
    ],
    handler:null
})

getFolder('root/Data').addFile(widgetFile)


/* To freeze disk 
localStorage.setItem("jsfs", JSON.stringify(disk));
var outdisk = JSON.parse(localStorage.getItem("jsfs"));
*/

/*

{
    name:"App Name",
    ext:"App extension",
    content:{
    icon:"Any icon specific for app / leave os to handle it for u",
    appData:"Any data u want to use within the app(use as this.props.appData)",
    app:"what kind of app os what's to launch"
    }
}

*/