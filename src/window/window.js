import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './window.css';
import {idGen,draggerDriver} from '../scripts';
import {zIndexFrames,incrementZIndexStackTrace} from '../globalvariables';
import {eventDispatcher, eventShredder} from '../handlers';
export default class Window extends Component
{
    constructor(props)
    {
        super(props);
        this.state={id:this.props.id,xpos:"30",ypos:"30",height:null,width:null,max:false};
        this.close=this.close.bind(this);
        this.minimize=this.minimize.bind(this);
        this.maximize=this.maximize.bind(this);
        this.setFrameLevel=this.setFrameLevel.bind(this);
        //eventDispatcher(this.state.id,'./icons/google.png');
    }
    componentDidMount()
    {
        var movable = document.querySelector('#'+this.state.id);
        draggerDriver(movable);
        this.element=document.getElementById(this.state.id);
        this.setFrameLevel();
        
    }
    close()
    {
        eventShredder(this.state.id);
    }
    minimize()
    {
        let element=this.element;
        element.style.display="none";
    }
    maximize()
    {
        var window=this.element;
        if(!this.state.max)
        {
            this.setState({
                xpos:window.getAttribute('data-x'),
                ypos:window.getAttribute('data-y'),
                height:window.style.height,
                width:window.style.width,
                max:true
            });
            window.style.width="100%";
            window.style.height="calc(100% - 55px)";
            window.style.transform="translate(-20px, -30px)";
            window.setAttribute('data-x','-20px');
            window.setAttribute('data-y','-30px');
            console.log(this.state.xpos,this.state.ypos);
        }
        else
        {
            window.setAttribute('data-x',this.state.xpos);
            window.setAttribute('data-y',this.state.ypos);
            window.style.width=this.state.width;
            window.style.height=this.state.height;
            console.log(`translate(${this.state.xpos},${this.state.ypos})`);
            window.style.transform=`translate(${this.state.xpos}px,${this.state.ypos}px)`;
            console.log(window.style.transform);
            this.setState({max:false});
        }
    }
    setFrameLevel()
    {
        var elem=this.element
        elem.style.zIndex=zIndexFrames+1;
        incrementZIndexStackTrace();
    }
    componentWillUnmount()
    {
        console.log("dead");
    }
    render()
    {
        return(
            <div className="window" id={this.state.id} onMouseDown={this.setFrameLevel} onMouseUp={this.setFrameLevel}>
                <div className="header">
                    <div className="button_cont">
                        <div className="button_cont_button minimize_button" onClick={this.minimize} >
                        <span className="minimize_mark">&#45;</span>
                        </div>
                        <div className="button_cont_button maximize_button" onClick={this.maximize} >
                        <span className="maximize_mark">&#9744;</span>
                        </div>
                        <div className="button_cont_button close_button" onClick={this.close} >
                        <span className="close_mark">&#10006;</span>
                        </div>
                    </div>
                </div>
                <div className="content">
                {
                    React.cloneElement(this.props.source,
                    {id:this.state.id})
                }
                </div>
                
            </div>
        )
    }
}