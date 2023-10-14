exports.getIndexPage = (req, res) => {
  const currentPage = 'index';
  res.status(200).render('index', { currentPage });
};
exports.getAboutPage = (req, res) => {
  const currentPage = 'about';
  res.status(200).render('about', { currentPage });
};
exports.getServicePage = (req, res) => {
  const currentPage = 'service';
  res.status(200).render('service', { currentPage });
};
exports.getNewsPage = (req, res) => {
  const currentPage = 'news';
  res.status(200).render('news', { currentPage });
};
exports.getTrainerPage = (req, res) => {
  const currentPage = 'trainer';
  res.status(200).render('trainer', { currentPage });
};
exports.getGalleryPage = (req, res) => {
  const currentPage = 'gallery';
  res.status(200).render('gallery', { currentPage });
};
exports.getContactPage = (req, res) => {
  const currentPage = 'contact';
  res.status(200).render('contact', { currentPage });
};
