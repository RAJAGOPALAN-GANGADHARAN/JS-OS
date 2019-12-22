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

export var cat = (res,arg) => {
    var element = document.createElement("div")
    element.appendChild(document.createTextNode('user@root:~$ cat'))
    var content = document.createElement("br")
    var content2 = document.createElement("br")
    for(let i=0;i<4;i++){
        if(res.contents[i].name === arg){
            console.log(res.contents[i].content)
            var terminalOutput=document.getElementById('terminalOutput');
            element.appendChild(content)
            element.appendChild(document.createTextNode(res.contents[i].content))
            terminalOutput.append(element)
            terminalOutput.appendChild(content2)

        }
    }
}
