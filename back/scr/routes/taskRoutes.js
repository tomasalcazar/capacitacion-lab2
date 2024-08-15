const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/getAllItems', taskController.getAllItems);
router.post('/addOneItem', taskController.addOneItem);
router.post('/toggleOneItem', taskController.toggleOneItem);
router.put('/editOneItem', taskController.editOneItem);
router.delete('/deleteItem/:id', taskController.deleteOneItem);

module.exports = router;
