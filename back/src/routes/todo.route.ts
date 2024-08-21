import express from 'express';
import ToDoController from '../controlers/todo.controler';

const router = express.Router();

router.post('/toggleOneItem', ToDoController.toggleOneItem);
router.post('/addOneItem', ToDoController.addOneItem);
router.get('/getAllItems', ToDoController.sendAllToDoItems);
router.put('/editOneItem', ToDoController.editOneItem);
router.delete('/deleteItem/:id', ToDoController.deleteOneItem);

export default router;