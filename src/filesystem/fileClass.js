//a diskstructure collection of folderstructures

//a folder structure is a collection of file objects

export class folderStructure
{
    constructor(name)
    {
        this.folderName=name;
        this.folderContents={}
    }
    addObject(Obj)
    {
        this.folderContents[Obj.folderName]=Obj;
        //console.log(this.folderContents[Obj.folderName]);
    }
    addFile(file)
    {
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
        this.completeName=name+ext;
    }
    addContent(body)
    {
        this.fileContents=body;
    }
}
