const express = require('express')
const UserController = require('../controllers/book-controller')
const router = express.Router();
router.get('/', UserController.findAll);
router.get('/:title', UserController.findOne);
router.post('/', UserController.create);
router.patch('/:title', UserController.update);
router.delete('/:title', UserController.destroy);
module.exports = router