import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3004;

const prisma = new PrismaClient();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type'
}));

app.use(express.json());

app.get('/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send("Task name is required.");
    }
    const newTask = await prisma.task.create({
        data: {
            name,
            isDone: false
        }
    });
    console.log("Item added: ", newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
    const idToModify = parseInt(req.params.id);
    const { name, isDone } = req.body;

    const updatedTask = await prisma.task.update({
        where: { id: idToModify },
        data: {
            name,
            isDone
        }
    });

    console.log("Updated item: ", updatedTask);
    res.status(200).json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
    const idToDelete = parseInt(req.params.id);

    const deletedTask = await prisma.task.delete({
        where: { id: idToDelete }
    });

    console.log("Deleted item: ", deletedTask);
    res.status(200).json(deletedTask);
});

app.all("*", (req, res) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
