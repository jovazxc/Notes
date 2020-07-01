import React from 'react';
import sha256 from 'crypto-js/sha256';
import util from './util'
import axios from 'axios'

import {
    Button,
    TextInput,
    Box
} from 'grommet';

import {
    Link,
    withRouter  
} from 'react-router-dom';

class Signin extends React.Component {

    state = {
        email: '',
        password: ''
    }
    componentDidMount() {
        if(localStorage.fullName) {
            console.log('redirecting')
            this.props.history.push('/home')
        }
    }
    onLogin = () => {
        let ops = {
            email: this.state.email,
            password: sha256(this.state.password).toString()
        }

        axios.post('/api/login', ops).then( ({data}) => {
          
            if(data.error) {
                this.setState({buttonDisabled: false});
                alert(data.msg)
                return;
            }

            axios.defaults.headers.common['Authorization'] = data.token;
            localStorage.token = data.token;
            localStorage.fullName = data.fullName;
            this.props.history.push('/home');
            

        })

    }

    render() {
        return (
            <>
                <h2>Ingresar</h2>

                <Box pad="xsmall">
                    <TextInput
                        type="email"
                        placeholder="Correo"
                        value={this.state.email}
                        onChange={e => this.setState({email: e.target.value})}
                    />
                </Box>
                    
                <Box pad="xsmall">
                    <TextInput
                        placeholder="Contraseña"
                        type="password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                    />
                </Box>
                    
                <Box pad="xsmall">
                    <Button primary label="Ingresar" onClick={this.onLogin} />
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

export default withRouter(Signin);