import React, {useState} from "react";
import {ListItem, ListItemButton} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';

interface AddTaskProps {
    onAddition: (name: string) => void
}

const AddTask: React.FC<AddTaskProps> = ({onAddition}: AddTaskProps) => {
    const [newTaskName, setNewTaskName] = useState('');

    return(
        <ListItem>
            <ListItemButton sx={{ width: '1%' }} onClick={() => {
                onAddition(newTaskName);
                setNewTaskName(''); // Clear the input field after adding a task
            }}>
                <AddCircleIcon sx={{ width: '100%', color: 'green' }}/>
            </ListItemButton>
            <TextField
                label="Add new task"
                value={newTaskName}
                sx={{ width: '80%' }}
                multiline
                variant="filled"
                onChange={e => setNewTaskName(e.target.value)}
            />
        </ListItem>
    );
}

export default AddTask;
