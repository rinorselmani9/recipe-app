const { jsonRes } = require('../library/helper')
const jwt = require('jsonwebtoken')

const verify = (secret, req, res, next) => {
  if (!req.headers.authorization) {
    res.json(jsonRes("You don't have a token", false))
  }
  if (!req.headers.authorization.startsWith('Bearer ')) {
    res.json(jsonRes('Token is not a Bearer Token', false))
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, secret)
    req.decoded = decoded._id
    next()
  } catch (err) {
    res.json(jsonRes(err.message, false))
  }
}

module.exports = {
  verifyToken: (req, res, next) => {
    verify(process.env.JWT_SECRET, req, res, next)
  },
  verifyAccountToken: (req, res, next) => {
    verify(process.env.JWT_VERIFY_ACCOUNT, req, res, next)
  },
}
