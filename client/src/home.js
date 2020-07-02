import React from 'react';
import {
    withRouter
} from 'react-router-dom';

import {
    Box
} from 'grommet';

import Navbar from './Navbar'
import axios from 'axios'
import history from './history'
import ReactMarkdown from 'react-markdown'

class Home extends React.Component {
    state = {
        notes: []
    }

    componentDidMount() {

        if(localStorage.getItem('token') == null)
            return history.push('/');
        else 
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
           
        
        axios.get('/api/userNotes').then(({data}) => {
            this.setState({notes: data})
        })
    }

    openNote = (id) => {
        history.push(`/w/${id}`)
    }

    renderNotes = (note, idx) => {
        // Method for render all notes
        return <Box pad="small" background="white" key={idx} style={{width: '80%', borderRadius: 15, margin: 20}} onClick={() => this.openNote(note.id)}>
            <Box style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15}} round="5" background="accent-4" pad="xsmall">
            <h3><b>{note.title}</b></h3>
            </Box>
            
            <Box pad="small">

                <ReactMarkdown source={note.content.substring(0, 100)+'...'} />
                <i style={{fontSize: 12}}>Creado el {note.created_date}</i>
            </Box>
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