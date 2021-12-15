import React, { Component, useState } from 'react'
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'

const ExplorerMenu = (props) => {
    const [state, setState] = useState({});
    const handleText = (e, { name }) => {
        setState({ activeItem: name, input: e.target.value }, () => console.log(state.input))
        //this.input = e.target.value;
    }
    const handleClick = (e, { name }) => {
        props.newFolder(state.input);
        setState({ ...state, input: null })
    }
    const handleSearchClick = (e, { name }) => {

    }

    return (

        <Menu vertical>
            <Menu.Item>
                <Input onChange={handleText} placeholder='Add/Search Folder...' />
            </Menu.Item>

            <Menu.Item
                name='New Folder'
                active={state.activeItem === 'New Folder'}
                onClick={handleClick}
            >
                <Icon name='plus' />
                New Folder
            </Menu.Item>
            <Menu.Item
                name='Search'
                active={state.activeItem === 'Search'}
                onClick={handleSearchClick}
            >
                <Icon name='search' />
                Search
            </Menu.Item>
        </Menu>
    )
}

export default ExplorerMenu

