import { useState, useEffect } from 'react';
import { getTasks, saveTasks } from '../services/api';
import { Task } from '../types';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasks().then(fetchedTasks => setTasks(fetchedTasks));
    }, []);

    const addTask = (name: string) => {
        const newTask: Task = {
            id: tasks.length + 1,
            name,
            isDone: false
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const toggleTask = (id: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, isDone: !task.isDone } : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const deleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const editTask = (id: number, name: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, name } : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    return { tasks, addTask, toggleTask, deleteTask, editTask };
}
