import React from 'react';
import { Typography, List as MUIList } from "@mui/material";
import { useTasks } from '../../hooks/useTasks';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const TaskList: React.FC = () => {
    const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();

    return (
        <>
            <Typography variant="h2" gutterBottom sx={{ width: '100%', px: 40, pt: 20 }} >
                To-do List
            </Typography>
            <MUIList sx={{ width: '100%', px: 40 }} >
                {tasks.map(item => (
                    <TaskItem
                        key={item.id}
                        {...item}
                        onCheck={toggleTask}
                        onDeletion={deleteTask}
                        onEdit={editTask}
                    />
                ))}
                <AddTask onAddition={addTask} />
            </MUIList>
        </>
    );
}

export default TaskList;
