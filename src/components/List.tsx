import React, { useState, useEffect } from 'react';
import Item from './Item';
import { TextField, Button, List as MUIList, Paper } from '@mui/material';

interface Task {
    text: string;
    isDone: boolean;
}

const List: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, isDone: false }]);
            setNewTask('');
        }
    };

    const toggleDone = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, isDone: !task.isDone } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <Paper style={{ padding: 16 }}>
            <TextField
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                label="Nueva Tarea"
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={addTask} style={{ marginTop: 16 }}>
                Añadir Tarea
            </Button>
            <MUIList>
                {tasks.map((task, index) => (
                    <Item
                        key={index}
                        text={task.text}
                        isDone={task.isDone}
                        toggleDone={() => toggleDone(index)}
                    />
                ))}
            </MUIList>
        </Paper>
    );
};

export default List;
