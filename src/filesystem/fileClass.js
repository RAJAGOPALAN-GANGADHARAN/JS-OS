//a diskstructure collection of folderstructures

//a folder structure is a collection of file objects

export class folderStructure
{
    constructor(name)
    {
        this.folderName=name;
        this.folderContents = {}
        this.isFolder = true;
        this.dateAdded = new Date();
        this.dateUpdate = new Date();
    }
    addObject(Obj)
    {
        this.dateUpdate = new Date();
        this.folderContents[Obj.folderName]=Obj;
        //console.log(this.folderContents[Obj.folderName]);
    }
    addFile(file)
    {
        this.dateUpdate = new Date();
        this.folderContents[file.completeName]=file;
    }
}
export class fileStructure
{
    constructor(name,ext='')
    {
        this.fileName=name;
        this.fileExtension=ext;
        this.fileContents=''
        this.completeName = name + ext;
        this.isFolder = false;
        this.dateAdded = new Date();
        this.dateUpdate = new Date();
    }
    addContent(body)
    {
        this.fileContents = body;
        this.dateUpdate = new Date();
    }
}
