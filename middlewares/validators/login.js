const { body } = require('express-validator');

module.exports = [
  body('email').isEmail().withMessage('Please enter your email!'),
  body('password').notEmpty().withMessage('Please enter your password!'),
];
