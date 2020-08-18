import {folderStructure, fileStructure} from './fileClass';

//launcher installer

//handle files
//main root
export var disk=new folderStructure('root');
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

var desktop = new folderStructure('desktop');

var desktopContents = [{
    name: "Test", ext: ".pdf", content: {
        icon:"file_pdf.png",appData:"http://localhost:8080",app:"pdf"
    }
}, { name: "Teest", ext: ".img", content: {icon:null} }]
for (let item of desktopContents) {
    var tfile = new fileStructure(item.name,item.ext);
    tfile.addContent(item.content);
    desktop.addFile(tfile);
}
disk.addObject(desktop);

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