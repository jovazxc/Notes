import React from 'react';
import {
    Nav,
    Anchor,
    Header
} from 'grommet'

import {
    Home,
    Logout,
    Add
} from 'grommet-icons'

import {withRouter} from 'react-router-dom'
import axios from 'axios';
import history from './history'

class Navbar extends React.Component {

    state = {
        editing: false
    }
    close = () => {
        console.log("logged out")
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = '';
        setTimeout(() => history.push('/'), 300);
    }

    home = () => {
        history.push('/home')
    }

    add = () => {
        axios.post('/api/notes/create').then(({data}) => {
            history.push(`/w/${data.id}`)
        })
    }

    toggleEdit = () => {
        if(this.props.titleEditable) {
            this.setState({editValue: this.props.title, editing: true})
        }
    }
    inputStyle = {
        background: 'transparent',
        border: 'none',
        textAlign: 'center',
        fontSize: 24,
        color: 'black',
        fontWeight: 500,
        fontFamily: 'Roboto',
    }
   
    render() {
        return (
            <>
               <Header fill="horizontal" background="dark-4">
                   {
                    this.props.isHome ? 
                    <Anchor icon={<Add />} onClick={this.add} /> : 
                    <Anchor icon={<Home />} onClick={this.home} hoverIndicator />
                   }

                    <input
                        style={this.inputStyle}
                        type="text"
                        value={this.props.title}
                        onChange={this.props.onTitleChange ? this.props.onTitleChange : null}
                        onBlur={this.props.onTitleBlur ? this.props.onTitleBlur : null}
                        disabled={this.props.onTitleChange ? false : true}
                    />
                   
                    <Anchor icon={<Logout />} onClick={this.close} hoverIndicator />
                </Header>
            </>
        )
    }
}
export default withRouter(Navbar)