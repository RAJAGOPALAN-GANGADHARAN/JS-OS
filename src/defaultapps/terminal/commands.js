export var tree = (res) => {
    var element = document.createElement("div");
    element.appendChild(document.createTextNode('user@root:~$ tree'))
    
    fetch("http://localhost:3020/fs/showfile")
    .then(data => data.json())
    .then(file => {
        let x
        for(x of file){
            var terminalOutput=document.getElementById('terminalOutput');
            var content = document.createElement("div")
            element.appendChild(content)
            content.appendChild(document.createTextNode('|-'+x.Name))
            terminalOutput.append(element)
        }
    })
    fetch("http://localhost:3020/fs/showdir")
    .then(data => data.json())
    .then(file => {
        let x
        for(x of file){
            var terminalOutput=document.getElementById('terminalOutput');
            var content = document.createElement("div")
            element.appendChild(content)
            content.appendChild(document.createTextNode('|-'+x.Name))
            terminalOutput.append(element)
        }
    })
}

export var ls = (res) => {
    var element = document.createElement("div");
    element.appendChild(document.createTextNode('user@root:~$ ls'))
    var content = document.createElement("br")
    element.appendChild(content)
    fetch("http://localhost:3020/fs/showfile")
    .then(data => data.json())
    .then(file => {
        let x
        for(x of file){
            var terminalOutput=document.getElementById('terminalOutput');
            element.appendChild(document.createTextNode(x.Name + ' '))
            terminalOutput.append(element)

        }
    })
    fetch("http://localhost:3020/fs/showdir")
    .then(data => data.json())
    .then(file => {
        let x
        for(x of file){
            var terminalOutput=document.getElementById('terminalOutput');
            element.appendChild(document.createTextNode(x.Name + ' '))
            terminalOutput.append(element)

        }
    }) 
}
//detect touch command and string after space as filename
//pass filename here in touch 
export var touch = (filename) => {
    fetch("http://localhost:3020/fs/createFile",{
        method: 'POST',
        body: JSON.stringify({Name: filename}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => console.log(data.json()))
}

export var mkdir = (dirName) => {
    fetch("http://localhost:3020/fs/createDir",{
        method: 'POST',
        body: JSON.stringify({Name: dirName}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => console.log(data.json()))
}

export var cat = (fileName) => {
    console.log(fileName)
    var element = document.createElement("div")
    element.appendChild(document.createTextNode('user@root:~$ cat'))
    var content = document.createElement("br")
    var content2 = document.createElement("br")
    fetch("http://localhost:3020/fs/showfile")
    .then(data => data.json())
    .then(file => {
        let x 
        for(x of file){
            if(x.Name===fileName){
                console.log(x.Content)
                var terminalOutput=document.getElementById('terminalOutput');
                element.appendChild(content)
                element.appendChild(document.createTextNode(x.Content))
                terminalOutput.append(element)
                terminalOutput.appendChild(content2)
            }
        }
    })
}

export var rm = (fileName) => {
    console.log(fileName)
    fetch("http://localhost:3020/fs/deleteFile",{
        method: 'DELETE',
        body: JSON.stringify({Name: fileName}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => data.json())
    .then(file => console.log(file))
}