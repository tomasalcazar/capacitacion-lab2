import { useState, useEffect } from 'react';
import { getTasks, addTask as addTaskAPI, updateTask as updateTaskAPI, deleteTask as deleteTaskAPI } from '../services/api';
import { Task } from '../types';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks().then(fetchedTasks => setTasks(fetchedTasks));
    }, []);

    const addTask = async (name: string) => {
        const newTask: Task = {
            id: tasks.length + 1,
            name,
            isDone: false
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        await addTaskAPI(newTask);  // Save the new task to the server
    };

    const toggleTask = async (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, isDone: !task.isDone } : task
        );
        setTasks(updatedTasks);
        const task = updatedTasks.find(task => task.id === id);
        if (task) {
            await updateTaskAPI(task);  // Update the task on the server
        }
    };

    const deleteTask = async (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        await deleteTaskAPI(id.toString());  // Delete the task from the server
    };

    const editTask = async (id: number, name: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, name } : task
        );
        setTasks(updatedTasks);
        const task = updatedTasks.find(task => task.id === id);
        if (task) {
            await updateTaskAPI(task);  // Update the task on the server
        }
    };

    return { tasks, addTask, toggleTask, deleteTask, editTask };
}
