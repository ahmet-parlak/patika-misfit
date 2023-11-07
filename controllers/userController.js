const Training = require('../models/Training');
const User = require('../models/User');

exports.joinTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    const user = await User.findById(req.session.user.id);
    await user.trainings.addToSet(training.id);
    await user.save();

    req.flash('success', 'You have successfuly joined.');
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    req.flash('errors', ['Somethings wrong. Please try again.']);
    res.redirect('/trainings');
  }
};
exports.quitTraining = (req, res) => {};
