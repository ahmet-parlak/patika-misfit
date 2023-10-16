const express = require('express');

const authController = require('../controllers/authController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const registerValidator = require('../middlewares/validators/register');
const loginValidator = require('../middlewares/validators/login');

const router = express.Router();

router.post(
  '/user',
  redirectMiddleware,
  registerValidator,
  authController.register
);

router.post('/login', redirectMiddleware, loginValidator, authController.login);

router.get('/logout', authMiddleware, authController.logout);

module.exports = router;
