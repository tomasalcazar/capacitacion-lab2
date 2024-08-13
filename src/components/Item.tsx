import React from 'react';
import { Checkbox, ListItem, ListItemText } from '@mui/material';

interface ItemProps {
    text: string;
    isDone: boolean;
    toggleDone: () => void;
}

const Item: React.FC<ItemProps> = ({ text, isDone, toggleDone }) => {
    return (
        <ListItem>
            <Checkbox checked={isDone} onChange={toggleDone} />
            <ListItemText primary={text} style={{ textDecoration: isDone ? 'line-through' : 'none' }} />
        </ListItem>
    );
};

export default Item;
