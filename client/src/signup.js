import React from 'react';
import sha256 from 'crypto-js/sha256';

import {
    Button,
    TextInput,
    FormField,
    Box
} from 'grommet';

import {
    Link,
    withRouter
} from 'react-router-dom';

import axios from 'axios';

class Signup extends React.Component {

    state = {
        fullName: '',
        email: '',
        password: '',
        buttonDisabled: false
    }
    register = () => {
        this.setState({buttonDisabled: true})

        let ops = {
            fullName: this.state.fullName,
            email: this.state.email,
            password: sha256(this.state.password).toString()
        }
        axios.post('/api/register', ops).then( ({data}) => {
            if(data.error) {
                this.setState({buttonDisabled: false});
                alert(data.msg)
                return;
            }

            axios.defaults.headers.common['Authorization'] = data.token;
            localStorage.token = data.token;
            localStorage.fullName = data.fullName;
            this.props.history.push('/home');
        });
    }
    render() {
        return (
            <>
                <h2>Registro</h2>

                <Box pad="xsmall">
                    <TextInput
                        type="name"
                        placeholder="Nombre completo"
                        value={this.state.fullName}
                        onChange={e => this.setState({fullName: e.target.value})} />
                </Box>

                <Box pad="xsmall">
                    <TextInput
                        type="email"
                        placeholder="Correo"
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})} />
                </Box>
                    
                <Box pad="xsmall">
                    <TextInput
                        placeholder="Contraseña"
                        type="password"
                        onChange={e => this.setState({password: e.target.value})}/>
                </Box>
        
                    
                <Box  pad="xsmall">
                    <Button primary label="Registrar" onClick={this.register} disabled={this.state.buttonDisabled}/>
                </Box>
                <Box pad="xsmall">
                    <Link to="/">
                        <Button label="Volver" />   
                    </Link>
                </Box>                
            </>
        );
    }
}

export default withRouter(Signup);