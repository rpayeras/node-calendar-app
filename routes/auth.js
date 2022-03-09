const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()

const { loginUser, createUser, renewUser } = require('../controllers/auth')
const { validateJwt } = require('../middlewares/validate-jwt')
const { validateRequestBody } = require('../middlewares/validations')

router.post('/', [
  check('email', 'Email is mandatory').isEmail(),
  check('password', 'Password min length 6').isLength({ min: 6 }),
  validateRequestBody
], loginUser)

router.post('/new', [
  check('name', 'Name is mandatory').not().isEmpty(),
  check('email', 'Email is mandatory').isEmail(),
  check('password', 'Password min length 6').isLength({ min: 6 }),
  validateRequestBody
], createUser)

router.get('/renew', validateJwt, renewUser)

module.exports = router
