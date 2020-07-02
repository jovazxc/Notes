import React from 'react';

import {
    Box,
    Header,
    Anchor
} from 'grommet';

import {
    Edit,
    View,
    Trash
} from 'grommet-icons';

import axios from 'axios';
import Navbar from './Navbar'

import ReactMarkdown from 'react-markdown'
import history from './history'

const Mode = {
    Edit: 1,
    Preview: 2
}
export default class Note extends React.Component {
    state = {
        noteLoaded: false,
        noteTitle: "Cargando Nota...",
        noteContent: "",
        noteDate: "",
        mode: Mode.Preview
    }
    componentDidMount() {
        axios.get(`/api/note?id=${this.props.match.params.id}`).then( ({data}) => {
            this.setState({
                noteTitle: data.title,
                created_date: data.created_date,
                noteContent: data.content,
                noteLoaded: true
            })
        });
    }

    renderDate = () => {
        return <Box pad="xsmall" background="accent-4">
                <span style={{fontSize: 12}}><i>Creado el {this.state.created_date}</i></span>
            </Box>
    }

    renderEditor = () => {
        return (
            <textarea
                autoFocus
                value={this.state.noteContent}
                onChange={(e) => this.setState({noteContent: e.target.value})}
                onBlur={() => this.setMode(Mode.Preview)}
                rows={25}
            ></textarea>)
        
    }

    renderPreview = () => <ReactMarkdown source={this.state.noteContent} />
    handleTitleChange = (e) => this.setState({noteTitle: e.target.value})
    
    titleBlur = async () => {
        if(this.state.noteTitle === "") {
            await new Promise( r => this.setState({noteTitle: "sin título"}, r) )
        }
        
        axios.post('/api/notes/updateTitle', {
            title: this.state.noteTitle,
            id: this.props.match.params.id
        })
        // do title update
    }

    setMode = (mode) => {
        if(mode == Mode.Preview && this.state.mode == Mode.Edit) {
            // Coming from edit
            axios.post('/api/notes/updateContent', {
                content: this.state.noteContent,
                id: this.props.match.params.id
            })
        }

        this.setState({mode})
    }

    delete = () => {
        axios.post('/api/notes/delete', {
            id: this.props.match.params.id
        }).then(() => {
            history.push('/home');
        })
    }
    render() {
        return <>
            <Navbar 
                isHome={false}
                title={this.state.noteTitle}
                onTitleChange={this.handleTitleChange}
                onTitleBlur={this.titleBlur}
            />
            <Box flex="grow" pad="small" background="white" round="15px" width="large" style={{ margin: 20}}>
                <Header fill="horizontal" background="brand" style={{borderRadius: 15}}>
                    <Anchor icon={<Edit />} onClick={() => this.setMode(Mode.Edit)} hoverIndicator />
                    <Anchor icon={<View />} onClick={() => this.setMode(Mode.Preview)} hoverIndicator />
                    <Anchor icon={<Trash />} onClick={this.delete} hoverIndicator />
                </Header>

                {this.state.mode == Mode.Edit ? this.renderEditor() : this.renderPreview()}
                
        
                {this.state.noteLoaded ? this.renderDate() : null}
            </Box>
        </>
    }
}