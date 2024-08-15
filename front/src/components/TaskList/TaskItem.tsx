import React, { useState } from 'react';
import { Checkbox, IconButton, TextField, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface TaskItemProps {
    id: number;
    name: string;
    isDone: boolean;
    onCheck: (id: number) => void;
    onDeletion: (id: number) => void;
    onEdit: (id: number, name: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, name, isDone, onCheck, onDeletion, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);

    const handleEdit = () => {
        if (isEditing) {
            onEdit(id, editedName);
        }
        setIsEditing(!isEditing);
    };

    return (
        <ListItem>
            <Checkbox checked={isDone} onChange={() => onCheck(id)} />
            {isEditing ? (
                <TextField
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleEdit}
                />
            ) : (
                <span>{name}</span>
            )}
            <IconButton onClick={handleEdit}>
                {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton onClick={() => onDeletion(id)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
};

export default TaskItem;
