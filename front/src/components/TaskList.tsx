import React from 'react';
import { Typography, List as MUIList, Container } from "@mui/material";
import { useTasks } from '../useTasks';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const TaskList: React.FC = () => {
    const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();

    return (
        <Container maxWidth="sm">
            <Typography variant="h3" gutterBottom>
                To-do List
            </Typography>
            <AddTask onAdd={addTask} />
            <MUIList>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        isDone={task.isDone}
                        onCheck={toggleTask}
                        onDeletion={deleteTask}
                        onEdit={editTask}
                    />
                ))}
            </MUIList>
        </Container>
    );
};

export default TaskList;
