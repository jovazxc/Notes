import React from 'react';
import {
    Heading,
    Box,
    Button
} from 'grommet';

import {
    Link
} from 'react-router-dom'

import history from './history';

class Main extends React.Component {
    componentDidMount() {
        if(localStorage.getItem('token') !== null) {
          // redirect to home
          history.push('/home')
        }
      }

    render() {
        return (
            <>
                <Heading>Notes App</Heading>
                <h2>Bienvenido</h2>

                <Box pad="xsmall">
                <Link to="/signin">
                    <Button primary label="Ingresar" />
                </Link>
                </Box>

                <Box pad="xsmall">
                <Link to="/signup">
                    <Button label="Registrar" />
                </Link>
                </Box>
            </>
        )
    }
}

export default Main;