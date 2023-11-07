const express = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.all('*', authMiddleware, roleMiddleware(['user']));

router.post('/training/:id', userController.joinTraining);
router.delete('/training/:id', userController.quitTraining);

module.exports = router;
