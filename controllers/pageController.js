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
  res.status(200).render('trainer', { currentPage });
};
exports.getTrainingPage = (req, res) => {
  const currentPage = 'training';
  res.status(200).render('training', { currentPage });
};
exports.getContactPage = (req, res) => {
  const currentPage = 'contact';
  res.status(200).render('contact', { currentPage });
};
exports.getLoginPage = (req, res) => {
  const currentPage = 'login';
  res.status(200).render('login', { currentPage });
};