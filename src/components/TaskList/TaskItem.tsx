import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import { Task } from '../../types/task';

interface TaskItemProps extends Task {
    onCheck: (id: number) => void,
    onDeletion: (id: number) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ id, name, isDone, onCheck, onDeletion }: TaskItemProps) => {
    return (
        <ListItem>
            <ListItemButton sx={{ width: '1%' }} onClick={() => onDeletion(id)} >
                <DeleteIcon sx={{ width: '100%', color: 'red' }} />
            </ListItemButton>
            <ListItemButton sx={{ width: '80%' }} onClick={() => onCheck(id)} >
                <Checkbox checked={isDone} color="success" />
                <ListItemText primary={name} />
            </ListItemButton>
        </ListItem>
    );
}

export default TaskItem;
