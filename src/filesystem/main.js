import { folderStructure, fileStructure } from './fileClass';
import React from 'react';
import { StickyNotes, populateSticky } from '../defaultapps/stickynotes/sticky';

//launcher installer

//handle files
//main root
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
    //console.log(disk.folderContents['desktop'].folderContents['folder1'])
    for (let x = 1; x < res.length; ++x)
        it = it.folderContents[res[x]];
    console.log(res);
    
    return it;
}
//default folders
// var folder1=new folderStructure('home0');
// for(var x=0;x<9;++x)
// folder1.addObject(new folderStructure('folder'+x));

// disk.addObject(folder1);
// for(var x=1;x<100;++x)
// disk.addObject(new folderStructure('home'+x));

// var file1=new fileStructure('raj','.pdf');
// disk.addFile(file1);
// var file2=new fileStructure('raj2','.txt');
// disk.addFile(file2);
// folder1.addFile(file1)

var host_url ="https://rajagopalan-gangadharan.github.io/Host-Server/"
var desktop = new folderStructure('desktop');

var desktopContents = [{
    name: "Resume", ext: ".pdf", content: {
        icon: "file_pdf.png",
        appData: `${host_url}Resume_Rajagopalan.pdf`,
        app: "PDFReader"
    }
}, {
    name: "Dp", ext: ".img", content: {
        appData: [
            {original:`${host_url}dp.jpg`,thumbnail:`${host_url}dp.jpg`}
        ],
        app:"ImageViewer"
        }
    }
]

for (let item of desktopContents) {
    var tfile = new fileStructure(item.name,item.ext);
    tfile.addContent(item.content);
    desktop.addFile(tfile);
}
let folder1 = new folderStructure("folder1");
for (let item of desktopContents) {
    var tfile = new fileStructure(item.name, item.ext);
    tfile.addContent(item.content);
    folder1.addFile(tfile);
}
desktop.addObject(folder1);
disk.addObject(desktop);

let t = getFolder("root/desktop/folder1")
t.addObject(new folderStructure("folder2"));
let f = new fileStructure("markdownTest", ".md");
f.addContent({
    icon: "markdown.png",
    appData: "## Hello",
    app:"Markdown"
})
t.addFile(f);

disk.addObject(new folderStructure('Data'));
getFolder('root/Data').addObject(new folderStructure('stickynotes'));
var widgetFile = new fileStructure('widgets', '.dat');
widgetFile.addContent({
    appData: [
        [populateSticky]
    ],
    handler:null
})
getFolder('root/Data').addFile(widgetFile);
var testfile = new fileStructure("test", '.dat');
testfile.addContent({
    appData: {
        title: "Note-Welcome",
        desc: "Welcome To an OS themed Portfolio. I am Rajagopalan Gangadharan.\
        Feel free to explore around by clicking the rocket icon for more apps.\
        Event handlers, API's for application management along with JS based file System\
        created with ❤ and from scratch. Comes with a terminal,explorer, editors,\
        3D demonstrator. Be sure to check out my Blogs in newsfeed and learn more\
        about me and my experience.\
        ",
        top: "50px",
        right: "100px",
        desktop: true,
        color: "#779ECB"
    }
})
getFolder('root/Data/stickynotes').addFile(testfile);
var testfile2 = new fileStructure("test2", '.dat');
testfile2.addContent({
    appData: {
        title: "Note2",
        desc: "Data",
        desktop: false,
        top: "450px",
        right: "450px",

        color: "#77DD77"
    }
})
getFolder('root/Data/stickynotes').addFile(testfile2);



// localStorage.setItem("jsfs", JSON.stringify(disk));
// var outdisk = JSON.parse(localStorage.getItem("jsfs"));
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