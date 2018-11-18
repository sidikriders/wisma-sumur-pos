function isSuperAdmin(req, res, next) {
  var isLogin = req.session.login
  var _isSuperAdmin = req.session.currUser && (req.session.currUser.role.id === 1)
  if (isLogin && _isSuperAdmin) {
    next()
  } else {
    next({
      code: 401,
      msg: 'unauthorized'
    })
  }
}

function isAdmin(req, res, next) {
  var isLogin = req.session.login
  var _isAdmin = req.session.currUser && (req.session.currUser.role.id === 1 || req.session.currUser.role.id === 2)
  if (isLogin && _isAdmin) {
    next()
  } else {
    next({
      code: 401,
      msg: 'unauthorized'
    })
  }
}

module.exports = {
  isSuperAdmin,
  isAdmin
}