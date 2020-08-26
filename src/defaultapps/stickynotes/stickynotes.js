import React, { Component } from 'react';
import { disk, getFolder } from '../../filesystem/main';
import ReactStickyNotes from '@react-latest-ui/react-sticky-notes';
import { Jumbotron, Container,Modal,Button,Form} from 'react-bootstrap';
import { fileStructure } from '../../filesystem/fileClass';
import { FaPlus, FaEye, FaPaintBrush } from 'react-icons/fa';


var fs = disk.folderContents['Data'].folderContents['stickynotes'];
var fsf;

export default class StickyNotesApp extends Component
{
    constructor(props) {
        super(props);
        //this.fs = getFolder('root/Data/stickynotes').folderContents;
        this.state = { notes: null }
        
        fsf = fs.folderContents;

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        fsf[e.target.name].fileContents.appData.desc = e.target.value;
    }
    hideshow(e,data) {
        console.log(data);
        fsf[data].fileContents.appData.desktop = !fsf[data].fileContents.appData.desktop;
        //console.log(s);
    }
    changeColor(e, data)
    {
        console.log(this.state);
        this.setState({ [data[0] + "color"]: data[1] });
        fsf[data[0]].fileContents.appData.color = data[1];
        this.draw();
    }
    erase(e, data) {
        delete fsf[data];
        this.draw();
    }
    draw = () => {
        let ren = []
        var cnt = 0;
        for (var note of Object.keys(fsf)) {
            let vv = note;
            this.state[note] = fsf[note].fileContents.appData.desc;
            this.state[note + "color"] = fsf[note].fileContents.appData.color ? fsf[note].fileContents.appData.color : "#FDFD98";
            ren.push(
                <div>
                    <Modal.Dialog >
                        <Modal.Header style={{ backgroundColor: this.state[note + "color"] }}>
                            <Modal.Title>{fsf[note].fileContents.appData.title}</Modal.Title>
                            <FaEye onClick={(value) => this.hideshow(value, vv)} />
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Control as="textarea" rows="3" onChange={(value) => this.onChange(value)}
                                name={note} defaultValue={this.state[note]} value={this.state.note} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button style={{ backgroundColor: "#B29DD9" }} onClick={(value) => this.changeColor(value, [vv, "#B29DD9"])}><FaPaintBrush /></Button>
                            <Button style={{ backgroundColor: "#FDFD98" }} onClick={(value) => this.changeColor(value, [vv, "#FDFD98"])}><FaPaintBrush /></Button>
                            <Button style={{ backgroundColor: "#FE6B64" }} onClick={(value) => this.changeColor(value, [vv, "#FE6B64"])}><FaPaintBrush /></Button>
                            <Button style={{ backgroundColor: "#77DD77" }} onClick={(value) => this.changeColor(value, [vv, "#77DD77"])}><FaPaintBrush /></Button>
                            <Button style={{ backgroundColor: "#779ECB" }} onClick={(value) => this.changeColor(value, [vv, "#779ECB"])}><FaPaintBrush /></Button>
                            <Button variant="danger" onClick={(value) => this.erase(value,vv)}>Delete</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            )
        }
        this.setState({ notes: ren });
    }
    componentDidMount = () => {
        this.draw();
    }
    addNote = (value) => {
        var l = Math.floor(Math.random() * Math.floor(1000))
        console.log(l);
        var file = new fileStructure("Note" + l, ".dat");
        file.addContent({
            appData: {
                title: "Note" + l,
                desc: "",
                desktop:false
            }
        })
        fs.addFile(file);
        this.draw();
    }
    render()
    {
        return (
            <div style={{ width: "100%", height: "100%",overflow:"auto" }}>
                <Jumbotron fluid>
                    <Container>
                        <h1>Sticky Notes</h1>
                    </Container>
                </Jumbotron>
                <Button style={{ margin: "20px" }} onClick={(e)=>this.addNote(e)}><FaPlus /> Add</Button>
                {this.state.notes}
            </div>
        )
    }
}