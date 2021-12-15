import React, { Component, useState, useEffect } from 'react';

const PdfReader = (props) => {
    const [state, setState] = useState({ data: null });
    useEffect(() => {
        if (props.appData === null) {
            setState({ data: "data:text/html;charset=utf-8,%3Chtml%3E%3Cbody%3EReactPdf%3C/body%3E%3C/html%3E" })
        }
        else
            setState({ data: props.appData });
    }, [])

    return (
        <iframe style={{ width: "100%", height: "100%" }} src={state.data} />
    )
}

export default PdfReader
