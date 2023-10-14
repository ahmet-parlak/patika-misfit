const express = require('express');

const pageController = require('../controllers/pageController');
const router = express.Router();

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/service', pageController.getServicePage);
router.get('/news', pageController.getNewsPage);
router.get('/trainer', pageController.getTrainerPage);
router.get('/gallery', pageController.getGalleryPage);
router.get('/contact', pageController.getContactPage);

module.exports = router;
