const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let db = [
    { id: 0, name: "item 0", isDone: false },
    { id: 1, name: "item 1", isDone: true }
];
let id = 2;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
    res.status(200).json(db);
});

app.post('/tasks', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send("Task name is required.");
    }

    let newItem = {
        id: id++,
        name: name,
        isDone: false
    };

    db.push(newItem);

    console.log("Item added: ", newItem);
    res.status(201).json(newItem);
});

app.put('/tasks/:id', (req, res) => {
    const idToModify = parseInt(req.params.id);
    const { name, isDone } = req.body;

    let itemToUpdate = db.find(item => item.id === idToModify);

    if (!itemToUpdate) {
        console.log("Item not found.");
        return res.status(404).send("Item not found.");
    }

    if (name !== undefined) itemToUpdate.name = name;
    if (isDone !== undefined) itemToUpdate.isDone = isDone;

    console.log("Updated item: ", itemToUpdate);
    res.status(200).json(itemToUpdate);  // Return the updated task
});

app.delete('/tasks/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);

    const index = db.findIndex(item => item.id === idToDelete);

    if (index === -1) {
        console.log("Item not found.");
        return res.status(404).send("Item not found.");
    }

    const deletedItem = db.splice(index, 1);

    console.log("Deleted item: ", deletedItem[0]);
    res.status(200).json(deletedItem[0]);  // Return the deleted task
});
