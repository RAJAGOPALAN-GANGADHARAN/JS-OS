import React, { Component } from 'react'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'

export default class ExplorerMenu extends Component {
    state = {}
    constructor(props)
    {
        super(props);
    }
    handleText = (e, { name }) => {
        this.setState({ activeItem: name,input:e.target.value }, () => console.log(this.state.input))
        //this.input = e.target.value;
    }
    handleClick = (e, { name }) => {
        this.props.newFolder(this.state.input);
        this.state.input = null;
    }
    handleSearchClick = (e, { name }) => {
        
    }

    
    render() {
        const { activeItem } = this.state

        return (
            <Menu vertical>
                <Menu.Item>
                    <Input onChange={this.handleText} placeholder='Add/Search Folder...' />
                </Menu.Item>

                <Menu.Item
                    name='New Folder'
                    active={activeItem === 'New Folder'}
                    onClick={this.handleClick}
                >
                    <Icon name='plus'/>
          New Folder
            </Menu.Item>
                <Menu.Item
                    name='Search'
                    active={activeItem === 'Search'}
                    onClick={this.handleSearchClick}
                >
                    <Icon name='search' />
          Search
            </Menu.Item>
            </Menu>
        )
    }
}
