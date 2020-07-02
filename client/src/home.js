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

    openNote = (id) => {
        this.props.history.push(`/w/${id}`)
    }

    renderNotes = (note, idx) => {
        // Method for render all notes
        return <Box pad="xsmall" background="white" key={idx} style={{width: '80%', borderRadius: 5, margin: 20}} onClick={() => this.openNote(note.id)}>
            <h3><b>{note.title}</b></h3>
            <h5>{note.content.substring(0, 100)}</h5>
            <h6><i>Creado el {note.created_date}</i></h6>
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