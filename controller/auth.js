const LogoutHandler = async (req, res, next) => {
  req.session.member = null;
  res.json({ message: 'η»εΊζε' });
};
module.exports = { LogoutHandler };
