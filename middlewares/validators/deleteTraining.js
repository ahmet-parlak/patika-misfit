const { param } = require('express-validator');
const Training = require('../../models/Training');

module.exports = [
  param('id').custom(async (id, { req }) => {
   
    const user = req.session.user;
    const training = await Training.findOne({ _id: id, trainer: user.id }).catch(()=>{
        throw new Error('Training not found');
    });

    if (!training) throw new Error('Training not found');
  }),
];
