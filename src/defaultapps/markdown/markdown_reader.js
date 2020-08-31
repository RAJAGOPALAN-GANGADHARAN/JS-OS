const React = require('react')
const ReactMarkdown = require('react-markdown')
 

export default class MarkdownReader extends React.Component{
    componentDidMount()
    {
        //get request
    }
    constructor(props)
    {
        super(props);
        this.state = {
            blog:"# This is a header\n\nAnd this is a paragraph"
        }
    }
    render()
    {
        return (
            <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
                <div style={{marginLeft:"10px"}}>
                    <ReactMarkdown source={this.props.appData} />
                </div>
            </div>
        );
    }
}
