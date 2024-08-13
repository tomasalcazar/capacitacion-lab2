import React from 'react';
import List from './components/List';
import { Container, Typography } from '@mui/material';

function App() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h3" align="center" gutterBottom>
                TO DO List
            </Typography>
            <List />
        </Container>
    );
}

export default App;
