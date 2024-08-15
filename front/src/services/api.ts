import axios from "axios";
import { Task } from '../types';

const startURL: string = "http://localhost:3001/tasks/";

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await axios.get(startURL);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching tasks:", error.message);
        } else {
            console.error("Error fetching tasks:", error);
        }
        return [];
    }
};

export const addTask = async (task: Partial<Task>): Promise<Task> => {
    try {
        const response = await axios.post(startURL, task);
        return response.data;  // Return the newly created task from the backend
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error adding task: ${task.name}`, error.message);
        } else {
            console.error(`Error adding task: ${task.name}`, error);
        }
        throw error;
    }
};

export const updateTask = async (task: Task): Promise<void> => {
    try {
        await axios.put(`${startURL}${task.id}`, task);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error updating task with ID ${task.id}:`, error.message);
        } else {
            console.error(`Error updating task with ID ${task.id}:`, error);
        }
    }
};

export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        await axios.delete(`${startURL}${taskId}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error deleting task with ID ${taskId}:`, error.message);
        } else {
            console.error(`Error deleting task with ID ${taskId}:`, error);
        }
    }
};
