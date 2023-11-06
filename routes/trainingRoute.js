const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const trainingValidator = require('../middlewares/validators/training');
const deleteTrainingValidator = require('../middlewares/validators/deleteTraining');
const updateTrainingValidator = require('../middlewares/validators/updateTraining');
const trainingController = require('../controllers/trainingController');
const router = express.Router();

router.all('*', authMiddleware);
router.get('/:id', trainingController.show);

router.all('*', roleMiddleware(['admin', 'trainer']));
router.post('/', trainingValidator, trainingController.create);
router.put('/:id', updateTrainingValidator, trainingController.update);
router.delete('/:id', deleteTrainingValidator, trainingController.delete);

module.exports = router;
