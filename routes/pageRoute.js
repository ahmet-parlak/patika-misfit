const express = require('express');

const redirectMiddleware = require('../middlewares/redirectMiddleware');
const pageController = require('../controllers/pageController');
const router = express.Router();

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/trainer', pageController.getTrainerPage);
router.get('/training', pageController.getTrainingPage);
router.get('/contact', pageController.getContactPage);
router.get('/login', redirectMiddleware, pageController.getLoginPage);

module.exports = router;
