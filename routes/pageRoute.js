const express = require('express');

const pageController = require('../controllers/pageController');
const router = express.Router();

router.get('/', pageController.getIndexPage);

module.exports = router;
