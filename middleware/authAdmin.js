const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.DECODE_TOKEN_ADMIN)
    const adminId = decodedToken.adminId
    if (req.body.adminId && req.body.adminId !== adminId) {
      throw 'Invalid Admin ID'
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Unauthenticated request'})
  }
}