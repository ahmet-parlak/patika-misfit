const express = require('express');

const redirectMiddleware = require('../middlewares/redirectMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const pageController = require('../controllers/pageController');
const router = express.Router();

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/trainer', pageController.getTrainerPage);
router.get('/training', pageController.getTrainingPage);
router.get('/contact', pageController.getContactPage);
router.get('/login', redirectMiddleware, pageController.getLoginPage);
router.get('/dashboard', authMiddleware, pageController.getDashboardPage);

module.exports = router;
