const { getValidationErrors } = require('../helpers/validator');

const Training = require('../models/Training');
const User = require('../models/User');

exports.show = (req, res) => {};

exports.create = (req, res) => {
  const validationErrs = getValidationErrors(req);
  if (validationErrs.length > 0) {
    req.flash('errors', validationErrs);
    req.flash('trainingOldValues', req.body);
    return res.redirect('/dashboard');
  }

  Training.create({ ...req.body, trainer: req.session.user.id })
    .then(() => {
      req.flash('success', 'Training successfully added.');
      return res.redirect('/dashboard');
    })
    .catch((err) => {
      console.log(err);
      req.flash('errors', ['Somethings wrong. Please try again.']);
      return res.redirect('/dashboard');
    });
};

exports.update = (req, res) => {
  const validationErrs = getValidationErrors(req);
  if (validationErrs.length > 0) {
    req.flash('errors', validationErrs);
    return res.redirect('/dashboard');
  }

  Training.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      req.flash('success', 'Training successfully updated.');
      return res.redirect('/dashboard');
    })
    .catch((err) => {
      console.log(err);
      req.flash('errors', ['Somethings wrong. Please try again.']);
      return res.redirect('/dashboard');
    });
};

exports.delete = (req, res) => {
  const validationErrs = getValidationErrors(req);
  if (validationErrs.length > 0) {
    req.flash('errors', validationErrs);
    return res.redirect('/dashboard');
  }

  Training.findByIdAndDelete(req.params.id)
    .then((training) => {
      req.flash('success', `Training named ${training.name} has been removed.`);
      return res.redirect('/dashboard');
    })
    .catch((err) => {
      console.log(err);
      req.flash('errors', ['Something happened. Plase try again.']);
      return res.redirect('/dashboard');
    });
};
