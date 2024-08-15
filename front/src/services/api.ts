import axios from "axios";
import { Task } from '../types';

const startURL: string = "http://localhost:4567/";


export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await axios.get(startURL + "getAllItems");
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks", error);
        return [];
    }
};


export const addTask = async (task: Task): Promise<void> => {
    try {
        await axios.post(startURL + "addOneItem", task);
    } catch (error) {
        console.error("Error adding task", error);
    }
};


export const updateTask = async (task: Task): Promise<void> => {
    try {
        await axios.put(startURL + "editOneItem", task);
    } catch (error) {
        console.error("Error updating task", error);
    }
};


export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        await axios.delete(`${startURL}deleteItem/${taskId}`);
    } catch (error) {
        console.error("Error deleting task", error);
    }
};
