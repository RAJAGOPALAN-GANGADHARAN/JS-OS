import { folderStructure, fileStructure } from './fileClass';
import React from 'react';
import { StickyNotes, populateSticky } from '../defaultapps/stickynotes/sticky';
import { data_gsoc, iiit,vpropel_data,readme,data_qt,data_keyboard } from './gsoc_data';
import { populateImages } from '../defaultapps/imageviewer/imagewidget';

//launcher installer

//handle files 
//main root
export var disk = new folderStructure('root');
var signal = new fileStructure('signal', '.dat');
signal.addContent({
    handleDraw:false
})
disk.addFile(signal);


var cppfile = new fileStructure('g++_run_me', '.cpp');
cppfile.addContent({
    appData: '#include<iostream>\n using namespace std;\nint main(){\ncout<<"Hello world";\nreturn 0;\n}',
    icon: "vscode.png",
    app:"CodeStudio"
})
disk.addFile(cppfile);


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
export function validPath(path)
{
    var res = path.split("/");
    var it = disk;
    if (res[0] != "root") return false;
    //console.log(disk.folderContents['desktop'].folderContents['folder1'])
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

var host_url ="https://rajagopalan-gangadharan.github.io/Host-Server/"
var desktop = new folderStructure('desktop');

var desktopContents = [{
    name: "Resume", ext: ".pdf", content: {
        icon: "file_pdf.png",
        appData: `${host_url}Resume.pdf`,
        app: "PDFReader"
    }
}, {
        name: "Dp", ext: ".img", content: {
        appData: [
            {original:`${host_url}dp.jpg`,thumbnail:`${host_url}dp.jpg`}
        ],
        app:"ImageViewer"
        }
    },
    {
        name: "readme", ext: ".md", content: {
            icon:"markdown.png",
            appData: readme,
            app:"Markdown"
        }
    }
]

for (let item of desktopContents) {
    var tfile = new fileStructure(item.name,item.ext);
    tfile.addContent(item.content);
    desktop.addFile(tfile);
}

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
getFolder('root/Data').addFile(widgetFile);
var testfile = new fileStructure("test", '.dat');
testfile.addContent({
    appData: {
        title: "Note-Welcome",
        desc: "Welcome To an OS themed Portfolio. I am Rajagopalan Gangadharan.\
        Feel free to explore around by clicking the rocket icon for more apps.\
        Event handlers, API's for application management along with JS based file System\
        created with ❤ and from scratch. Comes with a terminal,explorer, editors,\
        3D demonstrator. Be sure to check out readme to know more about the project and ,also learn more\
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
        desc: "This note is hidden click on the eye icon to show it on desktop..",
        desktop: false,
        top: "450px",
        right: "450px",

        color: "#77DD77"
    }
})
getFolder('root/Data/stickynotes').addFile(testfile2);


var recommend = new fileStructure("recommend", '.dat');
recommend.addContent({
    appData: {
        title: "Recommend",
        images: [{ original: `${host_url}pulko.PNG`, thumbnail: `${host_url}pulko.PNG` },
            { original: `${host_url}ankush.PNG`, thumbnail: `${host_url}ankush.PNG`}
        ],
        right: "100px",
        top: "450px",
        width: "750px",
        height:"150px"
    }
});
getFolder('root/Data/imagegallery').addFile(recommend);


var experience = new folderStructure("Work Experience");


var vpropel = new fileStructure("Vpropel", '.md');
vpropel.addContent({
    icon:"vit.png",
    app:"Markdown",
    appData:vpropel_data
})
experience.addFile(vpropel);

var iiitd = new fileStructure('IIITDM', '.md');
iiitd.addContent({
    app: "Markdown",
    icon: "iiit.png",
    appData: iiit
})
experience.addFile(iiitd);

var gsoc = new fileStructure('Gsoc2019', '.md');
gsoc.addContent({
    icon:'gsoc.png',
    appData: data_gsoc,
    app: "Markdown"
})
experience.addFile(gsoc);

var qt = new fileStructure('Qt', '.md');
qt.addContent({
    icon: 'qt.png',
    appData: data_qt,
    app:"Markdown"
})
experience.addObject(qt);

getFolder('root/desktop').addObject(experience);


/*Projects */
var projects = new folderStructure('Projects');

var ezlearn = new fileStructure('EZlearn', '.img');
var ez = []
for (var x = 1; x <= 8; ++x)
    ez.push({ original: `${host_url}ezlearn/${x}.png`, thumbnail: `${host_url}ezlearn/${x}.png` })
ezlearn.addContent({
    icon: "book.png",
    appData:ez,
    app:"ImageViewer"
})
projects.addFile(ezlearn);




getFolder('root/desktop').addObject(projects);

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