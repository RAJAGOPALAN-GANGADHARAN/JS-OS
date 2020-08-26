import React, { Component } from 'react';
import  BlogContent  from './BlogContent';
import { FaGem, FaHeart, FaCode, FaBlog,FaCaretRight, FaEye } from 'react-icons/fa';
import  BlogDataService  from '../services/blog.service';
import { Card, Button, CardDeck, Breadcrumb, Spinner } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import 'react-awesome-button/dist/themes/theme-amber.css';
import i1 from '../assets/c1.jpg';
import i2 from '../assets/c2.jpg';
import i3 from '../assets/c3.jpg';
import i4 from '../assets/c4.jpg';

import "./styles.css";

var history = []
var breads = []
var current = 0
var done = false;
var imgs = [i1,i2,i3,i4]
class SubItems extends Component {
    constructor(props)
    {
        super(props);
        this.state = { data: null, pid: this.props.child, bid: null }
        if (done == false) {
            
            breads.push(<Breadcrumb.Item onClick={() => this.teleport("0")}>Home</Breadcrumb.Item>)
            done = true;
        }
        this.props.update();
    }
    
    teleport = (id) => {
        console.log(id,history[id],history);
        this.setState({ pid: history[id] });
        history.length = id+1;
        breads.length = id+1;
        this.props.update();
    }
    blog = (title,str) => {
        this.setState({ pid:null,bid: str })
        console.log("Updating child here :)");
        history.push(str);
        
        breads.push(<Breadcrumb.Item active>{title}</Breadcrumb.Item>)
        this.props.update();
    }
    reveal = (title,str) => {
        this.setState({ pid: str,bid:null });
        history.push(str);
        var v = history.length;
        
        breads.push(<Breadcrumb.Item onClick={() => this.teleport(v - 1)}>{title}</Breadcrumb.Item>)
        this.props.update();
    }
    reDraw = () => {
        this.setState({
            data: <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>})
        BlogDataService.findByParent(this.state.pid).then(data => {
            let temp = []
            let cnt = 0
            for (let item of data.data) {
                if (item.leaf == 1) {
                    temp.push(
                        <div className="col-xl-3 col-md-6 col-sm-12">
                            <div className="card" style={{ margin:"5px"}}>
                                <div className="card-content">
                                    <div className="card-body">
                                        <h4 className="card-title">{item.title}</h4>
                                        <h6 className="card-subtitle text-muted">Blog created at: {item.createdAt.substring(0, 10)}</h6>
                                    </div>
                                    <img className="img-fluid" src={imgs[Math.floor((Math.random() * 4))]} alt="Card image cap"/>
                                        <div className="card-body">
                                        <p className="card-text">{}</p>
                                        <AwesomeButton ripple  type="primary" onPress={() => this.blog(item.title, item.id)}>Open Blog</AwesomeButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                }
                else {
                    temp.push(
                        <div className="col-xl-3 col-md-6 col-sm-12">
                            <div className="card" style={{ margin: "5px" }}>
                                <div className="card-content">
                                    <div className="card-body">
                                        <h4 className="card-title">{item.title}</h4>
                                        <h6 className="card-subtitle text-muted">Blog created at: {item.createdAt.substring(0, 10)}</h6>
                                    </div>
                                    <img className="img-fluid" src={imgs[Math.floor((Math.random() * 4))]} alt="Card image cap" />
                                    <div className="card-body">
                                        <p className="card-text">{}</p>
                                        <AwesomeButton ripple  type="secondary" onPress={() => this.reveal(item.title, item.parent_id + "." + item.special_id)}>Open Topic</AwesomeButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            this.setState({
                data: <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">{temp}</div>
            });
        })
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.pid != this.state.pid && this.state.pid!=null) {
            console.log("Redraw");
            this.reDraw();
        }
        else if (prevState.bid != this.state.bid) {
            console.log("Re Blog");
            this.setState({ data: <BlogContent child={this.state.bid} /> })
        } 
    }
    componentDidMount = () => {
        this.reDraw();
    }
    render() {
        return (
        <>
            {this.state.data}
        </>
        );
    }
}

export default class BlogHome extends Component {
    constructor(props)
    {
        super(props);
        this.state = { home: null, bread: breads };
        
    }
    componentDidMount = () => {
        history.push("0");
    }
    updateBread = () => {
        this.setState({ bread: breads }, () => {
            console.log(this.state.bread);
        });
    }
    
    render() {
        return (
            <div style={{width:"100%",height:"100%",overflow:"auto"}}>
                <Breadcrumb>{this.state.bread}</Breadcrumb>

                <div style={{ width: "100%", padding: "5px", margin: "5px", fontFamily:"Poppins,sans-serif!important;"}}>
                <SubItems update={this.updateBread} child={"0"} />
            </div>
            </div>
        );
    }
}