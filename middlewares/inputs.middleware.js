const { check, validationResult } = require('express-validator')
const {jsonRes} = require('../library/helper')

const emailCheck = [
  check('email', 'Email is required!').notEmpty(),
  check('email', 'Email is invalid!').isEmail(),
]
const passwordCheck = [
  check('password', 'Password is required!').notEmpty(),
  check('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
  check('password', 'Password must contain an Upper-Case Letter, a number and a character').matches(
    /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/
  ),
]

const validators = {
  email: emailCheck,
  password: passwordCheck,
  login: [...emailCheck, check('password', 'Password is required!').notEmpty()],
  register: [
    check('firstName', 'First Name is required!').notEmpty(),
    check('lastName', 'Last Name is required!').notEmpty(),
    ...emailCheck,
    ...passwordCheck,
    check('age', 'Age must be a number!').isNumeric(),
  ],

  validate: (req, res, next) => {
    const { errors } = validationResult(req)
    if (!errors.length) {
      return next()
    }
    res.json(jsonRes(errors, false))
  },
}

module.exports = validators
