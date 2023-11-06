const { body, param, check } = require('express-validator');
const Training = require('../../models/Training');
module.exports = [
  param('id').custom(async (id, { req }) => {
    const user = req.session.user;
    const training = await Training.findOne({
      _id: id,
      trainer: user.id,
    }).catch(() => {
      throw new Error('Training not found');
    });

    if (!training) throw new Error('Training not found');
  }),
  body('name').trim().notEmpty().withMessage('Please enter training name'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Please enter training description'),
  body('name').custom(async (value, { req }) => {
    const training = await Training.findOne({
      name: { $regex: new RegExp(`^${value}$`, 'i') },
      _id: { $ne: req.params.id },
    }).catch((err) => {});
    if (training) throw new Error('Training name is already in use');
  }),
];
