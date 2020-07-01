import React from 'react';
import {
    withRouter
} from 'react-router-dom';

import {
    Box
} from 'grommet';

import Navbar from './Navbar'
import axios from 'axios'

class Home extends React.Component {
    state = {
        notes: []
    }
    componentDidMount() {
        axios.get('/api/userNotes').then(({data}) => {
            this.setState({notes: data})
            console.log(data)
        })
    }
    renderNotes = (note, idx) => {
        return <Box key={idx}>
            <h3>{note.title}</h3>
            <h6>{note.content}</h6>
            <span>{note.created_date}</span>
        </Box>;
    }
    render() {
        return (
            <>
                <Navbar isHome={true} title="Mis Notas"/>
                {this.state.notes.map(this.renderNotes)}
            </>
        )
    }
}

export default withRouter(Home);