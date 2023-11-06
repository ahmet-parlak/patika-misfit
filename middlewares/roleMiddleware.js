module.exports = (roles) => {
  return (req, res, next) => {
    const userRole = req.session.user.role;

    if (roles.includes(userRole)) {
      next();
    } else {
      return res.status(401).send('You are not authorized for this operation');
    }
  };
};
