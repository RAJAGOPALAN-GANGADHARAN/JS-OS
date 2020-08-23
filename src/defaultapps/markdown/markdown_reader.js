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
        return(
            <ReactMarkdown source={this.props.appData} />
        );
    }
}
