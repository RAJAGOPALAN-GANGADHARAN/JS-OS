import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

export default function CodeStudio() {
    const [isEditorReady, setIsEditorReady] = useState(false);
    const valueGetter = useRef();

    function handleEditorDidMount(_valueGetter) {
        setIsEditorReady(true);
        valueGetter.current = _valueGetter;
    }

    function handleShowValue() {
        alert(valueGetter.current());
    }

    return (
        <div style={{width:"100%",height:"100%"}}>
            <button onClick={handleShowValue} disabled={!isEditorReady}>
                Show value
      </button>

            <Editor
                height="100%"
                style={{overflowY:"auto"}}
                language="javascript"
                value={"// write your code here"}
                editorDidMount={handleEditorDidMount}
            />
        </div>
    );
}