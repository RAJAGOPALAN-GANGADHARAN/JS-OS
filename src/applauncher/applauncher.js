import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './applauncher.css';
import { disk } from "../filesystem/main";
import { appRegistry, eventDispatcher } from '../handlers';

const AppLauncher = () => {
    var modify = document.getElementById("desktop");
    modify.style.filter = "blur(5px)";
    modify.style.transform = "scale(1.02)";
    const [state, setState] = useState({ Apps: {}, Appholder: [] });

    const processStarter = (processName) => {
        console.log(processName)
        shredder();
        eventDispatcher(processName, null, disk);
    }

    useEffect(() => {
        let holder = [];
        for (var appId in appRegistry) {
            //require('../desktop/taskbaricon/icons')
            let iconLoc = appRegistry[appId].processIcon.split('/');
            let appName = appRegistry[appId].processName;
            holder.push(
                <div key={"apps" + holder.length} className="apps" onClick={() => processStarter(appName)}>
                    <img src={require("../desktop/taskbaricon/icons/" + iconLoc[2])}></img>
                    <div className="name">{appName}</div>
                </div>
            );
        }
        console.log(holder, 'hi');
        setState({ Apps: {}, Appholder: holder });

        return () => {
            var modify = document.getElementById("desktop");
            modify.style.filter = "blur(0px)";
            modify.style.transform = "scale(1)";
        };
    }, []);

    const shredder = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('launcher'));
    }

    return (
        <div id="applauncher" onClick={shredder}>
            {/* {<div className="Header">
                <button onClick={shredder()} className="close">X</button>
            </div>} */}
            <div className="appslist">
                {state.Appholder}
            </div>
        </div>
    )
}

export default AppLauncher
