import { Request, Response } from "express";
import { prisma } from "../server";

interface ToDoItem {
    id: string;
    text: string;
    mark: boolean;
}


const sendAllToDoItems = async (req: Request, res: Response) => {
    try {
        const todoItems = await prisma.todo.findMany()
        res.status(200).json(todoItems);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};

const addOneItem = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const newItem = await prisma.todo.create({
            data: {
                text,
                mark: false,
            },
        });
        res.status(201).json(newItem);
    } catch (e: any) {
        res.status(500).json({ error: "Error" });
    }
};

const toggleOneItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const item = await prisma.todo.findUnique({
            where: { id: Number(id) },
        });

        if (item) {

            const updatedItem = await prisma.todo.update({
                where: { id: Number(id) },
                data: { mark: !item.mark },
            });
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ message: "Item no encontrado" });
        }
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};

const editOneItem = async (req: Request, res: Response) => {
    try {
        const { id, text } = req.body;
        const updatedItem = await prisma.todo.update({
            where: { id: Number(id) },
            data: { text },
        });

        if (updatedItem) {
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ message: "Item no encontrado" });
        }
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};

const deleteOneItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedItem = await prisma.todo.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};

export default {
    sendAllToDoItems,
    addOneItem,
    toggleOneItem,
    editOneItem,
    deleteOneItem,
};
