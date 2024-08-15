import React, { useState } from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddTaskProps {
    onAdd: (name: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');

    const handleAddTask = () => {
        if (taskName.trim()) {
            onAdd(taskName.trim());
            setTaskName('');
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            mb={2}
            sx={{
                backgroundColor: '#fafafa',
                padding: '8px',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
        >
            <TextField
                label="Add new task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleAddTask();
                    }
                }}
                fullWidth
                size="small"
                variant="outlined"
            />
            <IconButton onClick={handleAddTask} color="primary">
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default AddTask;
