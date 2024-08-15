const getRandomInt = require('../utils');

let todoList = [];

exports.getAllItems = (req, res) => {
    res.json(todoList);
};

exports.addOneItem = (req, res) => {
    const { text } = req.body;
    const randomNumber = getRandomInt(1, 10000000000);
    const newItem = { id: randomNumber.toString(), text, mark: false };
    todoList.push(newItem);
    res.status(201).json(newItem);
};

exports.toggleOneItem = (req, res) => {
    const { id } = req.body;
    const item = todoList.find(todo => todo.id === id);

    if (item) {
        item.mark = !item.mark;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item no encontrado' });
    }
};

exports.editOneItem = (req, res) => {
    const { id, text } = req.body;
    const item = todoList.find(todo => todo.id === id);

    if (item) {
        item.text = text;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item no encontrado' });
    }
};

exports.deleteOneItem = (req, res) => {
    const { id } = req.params;
    const index = todoList.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todoList.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Item no encontrado' });
    }
};
