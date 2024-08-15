const express = require('express');
const getRandomInt = require('./utils.js');
const app = express()
const port = 3000




app.use(express.json()); 
let todoList = []; 




const sendAllToDoItems = (req, res, next) => {
  res.json(todoList)
  next()
}
const addOneItem = (req, res, next) => {
  const { text } = req.body;
  const randomNumber = getRandomInt(1, 10000000000)
  todoList.push({ id: randomNumber + "", text, mark: false });
  res.status(201).json(todoList[todoList.length - 1 ]);
  next()
}

const toggleOneItem = (req, res, next) => {

  const { id } = req.body;

  const item = todoList.find(todo => todo.id === id);

  if (item) {
    item.mark = !item.mark; 
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item no encontrado' }); // Si no se encuentra el ítem
  }

  next();
};

const editOneItem = (req, res, next) => {
  const { id } = req.body;
  const { text } = req.body;
  const item = todoList.find(todo => todo.id === id);
  if (item) {
    item.text = text;
    res.json(item); 
  } else {

    res.status(404).json({ message: 'Item no encontrado' });

  }

  next();
};


const deleteOneItem = (req, res, next) => {
  const { id } = req.params;
  const index = todoList.findIndex(todo => todo.id === id);

  if (index !== -1) {

    todoList.splice(index, 1);
    res.status(204).send(todoList);

  } else {

    res.status(404).json({ message: 'Item no encontrado' });
  }

  next();
};


app.post('/toggleOneItem', toggleOneItem);
app.post('/addOneItem', addOneItem);
app.get('/getAllItems', sendAllToDoItems);
app.put('/editOneItem', editOneItem);
app.delete('/deleteItem/:id', deleteOneItem);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})