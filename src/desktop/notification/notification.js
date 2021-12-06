import React, { Component } from 'react';
import './notification.css';
import Status from './statusicons/status';
import { theme_color_panels, notify_status } from '../../globalvariables';
import { FaExpand, FaBell, FaGithub, FaLinkedin, FaEnvelope, FaAt, FaStar } from 'react-icons/fa';

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.expand = this.expand.bind(this);
        this.state = { panelcolor: theme_color_panels, paneltype: 'solid' };
    }
    expand() {
        if(this.props.parent_class.isFull=== true)
            this.props.parent_class.setState({ isFull: false });
        else{
            this.props.parent_class.setState({ isFull: true });
            document.webkitExitFullscreen();
        }

    }
    nullBind() {

    }
    gitHubIcon = () => {
        window.open("https://github.com/RAJAGOPALAN-GANGADHARAN/", "_blank")
    }
    linkedin = () => {
        window.open("https://www.linkedin.com/in/rajagopalan-gangadharan/", "_blank");
    }
    mailto = () => {
        window.open("mailto:g.raju2000@gmail.com?subject=Feedback", "_blank");
    }
    repo = () => {
        window.open("https://github.com/RAJAGOPALAN-GANGADHARAN/JS-OS", "_blank");
    }
    render() {
        return (
            <div id="notificationpanel" style={{ backgroundColor: this.state.panelcolor }}>
                <Status icon={<FaExpand />} event={this.expand} styles="expand_icon" />
                {notify_status ? (<Status icon={<FaBell />} event={this.nullBind} />) : (<Status icon={<FaBell />} event={this.nullBind} />)}
                <Status icon={<FaGithub />} event={this.gitHubIcon} />
                <Status icon={<FaLinkedin />} event={this.linkedin} />
                <Status icon={<FaAt />} event={this.mailto} />
                <Status icon={<FaStar />} event={this.repo} />
            </div>
        )
    }
}