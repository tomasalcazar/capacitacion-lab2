import axios from "axios";
import { Task } from '../types';

const startURL: string = "http://localhost:4567/";

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await axios.get(startURL + "items");
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks", error);
        return [];
    }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
    try {
        await axios.post(startURL + "items", tasks);
    } catch (error) {
        console.error("Error saving tasks", error);
    }
};
