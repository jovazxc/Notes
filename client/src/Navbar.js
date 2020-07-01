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

class Navbar extends React.Component {

    close = () => {
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = '';
        this.props.history.push('/')
    }

    home = () => {
        this.props.history.push('/home')
    }

    add = () => {
        
    }
    render() {
        return (
            <>
               <Header fill="horizontal" background="brand">
                   {
                    this.props.isHome ? 
                    <Anchor icon={<Add />} onClick={this.add} /> : 
                    <Anchor icon={<Home />} onClick={this.home} hoverIndicator />
                   }
                    <h4>{this.props.title}</h4>
                    <Anchor icon={<Logout />} onClick={this.close} hoverIndicator />
                </Header>
            </>
        )
    }
}
export default withRouter(Navbar)