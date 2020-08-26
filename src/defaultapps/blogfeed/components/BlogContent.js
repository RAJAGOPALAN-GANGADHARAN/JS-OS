import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';

// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import BlogDataService from '../services/blog.service';
import BlogHome from './BlogHome';
import MarkdownEditor from '@uiw/react-markdown-editor';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import { Button,Alert } from 'react-bootstrap';

import "../globals";

//console.log(global.config.key, localStorage.getItem("key"));
//console.log(key);
const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };

export default class BlogContent extends Component {
    constructor(props) {
        super(props);
        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
            item_id: this.props.child,
            title: null,
            markdown: "",
            temp:"",
            edit: false,
            obj: null,
            status:[]
        }
        if (localStorage.getItem("key") == global.config.key) {
            console.log("Hello");
            this.state.edit=true;
        }
    }

    updateMarkdown=(editor, data, value)=> {
        this.setState({ temp: value });
    }

    fetcher = () => {
        BlogDataService.get(this.state.item_id).then(data => {
            this.setState({ title: data.data.title, markdown: data.data.description,obj:data.data })
            document.title = this.state.title;
        }); 
    }
    componentDidMount = () => {
        this.fetcher();
    }
    componentDidUpdate=(prevProps, prevState)=> {
        if (prevProps.child != this.props.child) {
            this.setState({
                item_id: this.props.child
            }, () => {
                this.fetcher();
            })
            
        }
        
    }
    save = () => {
        var obj = this.state.obj;
        obj.description = this.state.temp;
        console.log(obj);
        BlogDataService.update(obj.id, obj).then(data => {
            console.log(data);

            let temp = this.state.status;
            temp.push(<Alert key={10} variant={"success"} dismissible>
                Updated Successfully!
                    </Alert>);
            this.setState({
                status: temp
            });

        }).catch(err => {
            console.log(err);
            let temp = this.state.status;
            temp.push(<Alert key={10} variant={"danger"} dismissible>
                Updated Successfully!
                    </Alert>);
            this.setState({
                status: temp
            });
        })
    }
    render() {
        const { contentState } = this.state;
        return (
                <div style={{ padding: "10px", width: "100%" }}>
                    {this.state.status}
                <div style={{padding:"50px",fontSize:"50px"}}>
                    {this.state.title}
                </div>
                    {this.state.edit ? <MarkdownEditor value={this.state.markdown} onChange={this.updateMarkdown}/>: <ReactMarkdown source={this.state.markdown} escapeHtml={false} skipHtml={false} renderers={{ code: CodeBlock }} />}
                    <div>
                        <br></br>
                        {this.state.edit ? <Button onClick={() => this.save()}>Save</Button> : null}    
                    </div>
                </div>
        );
    }
}