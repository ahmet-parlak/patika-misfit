const User = require('../models/User');
const Training = require('../models/Training');

exports.getIndexPage = (req, res) => {
  const currentPage = 'index';
  res.status(200).render('index', { currentPage });
};
exports.getAboutPage = (req, res) => {
  const currentPage = 'about';
  res.status(200).render('about', { currentPage });
};
exports.getTrainerPage = (req, res) => {
  const currentPage = 'trainer';
  let trainers = [];
  User.find({ role: 'trainer' })
    .then((documents) => {
      trainers = documents;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>
      res.status(200).render('trainer', { currentPage, trainers })
    );
};
exports.getTrainingPage = (req, res) => {
  const currentPage = 'training';
  let trainings = [];

  Training.find().populate('trainer')
    .then((documents) => {
      trainings = documents;
    })
    .catch((err) => console.log(err))
    .finally(() =>
      res.status(200).render('training', { currentPage, trainings })
    );
};
exports.getContactPage = (req, res) => {
  const currentPage = 'contact';
  res.status(200).render('contact', { currentPage });
};
exports.getLoginPage = (req, res) => {
  const currentPage = 'login';
  res.status(200).render('login', { currentPage });
};

exports.getDashboardPage = async (req, res) => {
  const currentPage = 'dashboard';
  let user = req.session.user;
  let trainings = [];
  try {
    user = await User.findById(user.id).populate('trainings');

    if (['admin', 'trainer'].includes(user.role)) {
      trainings = await Training.find({ trainer: user.id });
    }
  } catch (err) {
    console.log(err);
  }

  res.status(200).render('dashboard', { currentPage, user, trainings });
};
