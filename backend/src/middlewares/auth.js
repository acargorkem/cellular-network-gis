const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { checkAuthentication };
