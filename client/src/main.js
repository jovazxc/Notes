import React from 'react';
import {
    Heading,
    Box,
    Button
} from 'grommet';

import {
    Link
} from 'react-router-dom'


class Main extends React.Component {
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