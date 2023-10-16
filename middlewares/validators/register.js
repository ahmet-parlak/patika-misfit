const { body } = require('express-validator');
const User = require('../../models/User');

module.exports = [
  body('name').trim().notEmpty().withMessage('Please enter your name!'),
  body('email').isEmail().withMessage('Please enter a valid email!'),
  body('email').custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) throw new Error('E-mail is already in use');
  }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Please create a strong password at least 6 characters!'),
  body('confirm_password')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords do not match!'),
];
