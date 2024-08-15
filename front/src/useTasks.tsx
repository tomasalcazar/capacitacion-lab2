import { useState, useEffect } from 'react';
import { getTasks, addTask as addTaskAPI, updateTask as updateTaskAPI, deleteTask as deleteTaskAPI } from './services/api';
import { Task } from './services';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks().then(fetchedTasks => setTasks(fetchedTasks));
    }, []);

    const addTask = async (name: string) => {
        const newTask: Partial<Task> = {
            name,
            isDone: false
        };
        const createdTask = await addTaskAPI(newTask as Task);
        setTasks([...tasks, createdTask]);
    };

    const toggleTask = async (id: number) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            const updatedTask = { ...task, isDone: !task.isDone };
            await updateTaskAPI(updatedTask);
            setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
        }
    };

    const deleteTask = async (id: number) => {
        if (id !== undefined) {
            await deleteTaskAPI(id.toString());
            setTasks(tasks.filter(task => task.id !== id));
        } else {
            console.error("Attempted to delete a task with an undefined ID");
        }
    };

    const editTask = async (id: number, name: string) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            const updatedTask = { ...task, name };
            await updateTaskAPI(updatedTask);
            setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
        }
    };

    return { tasks, addTask, toggleTask, deleteTask, editTask };
};
