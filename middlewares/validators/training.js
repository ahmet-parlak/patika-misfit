const { body } = require('express-validator');
const Training = require('../../models/Training');
module.exports = [
  body('name').trim().notEmpty().withMessage('Please enter training name'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Please enter training description'),
  body('name').custom(async (value) => {
    const training = await Training.findOne({
      name: { $regex: new RegExp(`^${value}$`, 'i') },
    });
    if (training) throw new Error('Training name is already in use');
  }),
];
