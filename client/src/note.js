import React from 'react';

import {
    Box,
    Header,
    Anchor,
    Markdown
} from 'grommet';

import {
    Edit,
    View
} from 'grommet-icons';

import axios from 'axios';
import Navbar from './Navbar'

import ReactMarkdown from 'react-markdown'


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
            console.log("nota recibida", data)
        });
    }

    renderDate = () => {
        return <Box pad="xsmall" background="brand">
                <span style={{fontSize: 12}}><i>Creado el {this.state.created_date}</i></span>
            </Box>
    }

    renderEditor = () => {
        return <>
            <textarea value={this.state.noteContent} onChange={(e) => this.setState({noteContent: e.target.value})} rows={25}></textarea> 
        </>
    }

    renderPreview = () => <ReactMarkdown source={this.state.noteContent} />

    render() {
        return <>
            <Navbar isHome={false} title={this.state.noteTitle}/>
            <Box flex="grow" pad="small" background="white" round="5px" width="large" style={{ margin: 20}}>
                <Header fill="horizontal" background="brand">
                    <Anchor icon={<Edit />} onClick={() => this.setState({mode: Mode.Edit})} hoverIndicator />
                    <Anchor icon={<View />} onClick={() => this.setState({mode: Mode.Preview})} hoverIndicator />

                </Header>

                {this.state.mode == Mode.Edit ? this.renderEditor() : this.renderPreview()}
                
        
                {this.state.noteLoaded ? this.renderDate() : null}
            </Box>
        </>
    }
}