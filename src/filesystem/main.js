import {folderStructure, fileStructure} from './fileClass';

//launcher installer

//handle files
//main root
export var disk=new folderStructure('root');
//default folders
var folder1=new folderStructure('home0');
for(var x=0;x<9;++x)
folder1.addObject(new folderStructure('folder'+x));

disk.addObject(folder1);
for(var x=1;x<100;++x)
disk.addObject(new folderStructure('home'+x));

var file1=new fileStructure('raj','.pdf');
disk.addFile(file1);
var file2=new fileStructure('raj2','.txt');
disk.addFile(file2);
folder1.addFile(file1)