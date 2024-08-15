import React, { useState } from 'react';
import { Checkbox, IconButton, TextField, ListItem, ListItemText } from '@mui/material';
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
        <ListItem
            sx={{
                borderRadius: '4px',
                marginBottom: '8px',
                backgroundColor: '#f5f5f5',
                '&:hover': { backgroundColor: '#e0e0e0' }
            }}
            secondaryAction={
                <>
                    <IconButton onClick={handleEdit}>
                        {isEditing ? <SaveIcon color="primary" /> : <EditIcon />}
                    </IconButton>
                    <IconButton onClick={() => onDeletion(id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </>
            }
        >
            <Checkbox checked={isDone} onChange={() => onCheck(id)} />
            {isEditing ? (
                <TextField
                    value={editedName || ''}
                    onChange={(e) => setEditedName(e.target.value)}
                    onBlur={handleEdit}
                    fullWidth
                    size="small"
                />
            ) : (
                <ListItemText
                    primary={name}
                    primaryTypographyProps={{
                        style: { textDecoration: isDone ? 'line-through' : 'none' }
                    }}
                />
            )}
        </ListItem>
    );
};

export default TaskItem;
