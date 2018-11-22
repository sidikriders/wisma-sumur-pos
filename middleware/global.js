function setGlobalTitle (req, res, next) {
  res.locals.title = 'Wisma Sumur'
  next()
}

module.exports = {
  setGlobalTitle
}