import React, { Component } from 'react';
import { Form, Button, Jumbotron, Row, Col, Container, FormControl,Alert } from 'react-bootstrap';
import BlogDataService from '../services/blog.service';
export default class Add extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
                id:0,
                title: "",
                description: "",
                special_id: "",
                parent_id: "",
                leaf: 0,
                form: null,
                present:false,status:null
            }
    }
    changeParent = (event) => {
        this.setState({parent_id: event.target.value  });
    }
    changeSpecial = (event) => {
        this.setState({ special_id: event.target.value  });
    }
    changeTitle = (event) => {
        this.setState({ title: event.target.value });
    }
    onSwitchAction = () => {
        if (this.state.leaf == 0)
            this.setState({ leaf: 1 });
        else this.setState({ leaf: 0 });
    };
    update = () => {
        const blog = {
            id:this.state.id,
            title: this.state.title,
            description: "",
            special_id: this.state.special_id,
            parent_id: this.state.parent_id,
            leaf: this.state.leaf
        }
        console.log(blog);
        BlogDataService.update(this.state.id, blog).then(data => {
            console.log(data);
            this.setState({
                status: <Alert key={10} variant={"success"} dismissible>
                    Added/Updated Successfully!
                    </Alert>
            });
        }).catch(err => {
            console.log(err);
        })
    }
    delete = () => {
        BlogDataService.delete(this.state.id).then(data => {
            this.setState({
                status: <Alert key={10} variant={"danger"} dismissible>
                    Deleted Successfully!
                    </Alert>
            });
        }).catch(err => {
            console.log(err);
        })
    }
    keyEnter = () => {
        BlogDataService.findByParent(this.state.parent_id).then(data => {
            let found = false;
            if (data.data.length != 0) {
                for (let item of data.data) {
                    if (item.special_id == this.state.special_id) {
                        this.setState({
                            id:item.id,
                            title: item.title,
                            description: item.description,
                            special_id: item.special_id,
                            parent_id: item.parent_id,
                            leaf: item.leaf,
                            present: true
                        });
                        found = true;
                    }
                }
            }
            if (found == false) {
                this.setState({
                    id:0,
                    title: "",
                    description: "",
                    leaf: 0,
                    present: false
                });
            }
            this.setState({form:null})
            this.setState({
                form: <Form>
                    <Row style={{ margin: "15px" }}>
                        <FormControl className="mr-sm-2" defaultValue={this.state.title} onChange={this.changeTitle} placeholder="Title"/>
                    </Row>
                    <Row style={{ margin: "15px" }}>
                        {this.state.leaf ? <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Leaf"
                            onChange={this.onSwitchAction}
                            defaultChecked
                        /> : <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Leaf"
                                onChange={this.onSwitchAction}
                            />
                        }
                    </Row>
                    <Row style={{ margin: "10px" }}>
                        <Col><Button variant="success" onClick={this.update}>Add/Update</Button></Col>
                        <Col>{found ? <Button variant="danger" onClick={this.delete}>Delete</Button> : null}</Col>
                    </Row>

                </Form>})
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <Container>
                        <h1>ADD TOPIC</h1>
                        <p>
                            Topic id is of form xx.xx.xx.yy where yy is special_id and rest of the parts are called parent_id.
                            Leaf will say if its an unrollable menu or blog link.
                        </p>
                    </Container>
                </Jumbotron>
                <div>
                    {this.state.status}
                    <Form inline>
                        <FormControl type="text" placeholder="Parent Id" className=" mr-sm-2" style={{ margin: "10px" }} onChange={this.changeParent} />
                        <FormControl type="text" placeholder="Special Id" className=" mr-sm-2" style={{ margin: "10px" }} onChange={this.changeSpecial} />
                        <Button variant="primary" onClick={this.keyEnter} style={{ margin: "5px" }}>Search</Button>
                        
                    </Form>
                    <div style={{width:"50%",padding:"15px",margin:"15px"}}>
                        {this.state.form}
                    </div>
                </div>
            </div>
        );
    }
}