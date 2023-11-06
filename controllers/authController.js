const bcrypt = require('bcrypt');

const { getValidationErrors } = require('../helpers/validator');
const User = require('../models/User');

exports.register = (req, res) => {
  const validationErrs = getValidationErrors(req);

  if (validationErrs.length > 0) {
    req.flash('registerErrors', validationErrs);
    req.flash('registerOldValues', req.body);
    return res.redirect('/login');
  }

  User.create(req.body)
    .then(() => {
      req.flash(
        'success',
        'You have successfully registered. You can log in with your email and password.'
      );
      res.redirect('/login');
    })
    .catch(() => {
      req.flash('registerErrors', ['Somethings wrong. Please try again.']);
      res.redirect('/login');
    });
};

exports.login = (req, res) => {
  const validationErrs = getValidationErrors(req);

  if (validationErrs.length > 0) {
    req.flash('loginErrors', validationErrs);
    req.flash('loginOldValues', req.body);
    return res.redirect('/login');
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      bcrypt.compare(password, user.password).then((isCorrect) => {
        if (isCorrect) {
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };

          req.flash('success', 'Login successful');
          return res.redirect('/dashboard');
        }

        req.flash('loginErrors', ['Email or password incorrect!']);
        req.flash('loginOldValues', req.body);
        return res.redirect('/login');
      });
    })
    .catch((err) => {
      req.flash('loginErrors', ['Email or password incorrect!']);
      req.flash('loginOldValues', req.body);
      return res.redirect('/login');
    });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login?success=You have been successfully logged out.');
  });
};
