const express = require('express');

const pageController = require('../controllers/pageController');
const router = express.Router();

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/trainer', pageController.getTrainerPage);
router.get('/gallery', pageController.getGalleryPage);
router.get('/contact', pageController.getContactPage);
router.get('/login', pageController.getLoginPage);

module.exports = router;
