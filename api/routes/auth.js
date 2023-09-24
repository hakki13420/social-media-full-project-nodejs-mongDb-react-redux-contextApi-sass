const { register, login, logout } = require('../controllers/auth')
const { isAuthenticated } = require('../middlewares/middlewares')
const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', isAuthenticated, logout)

module.exports = router
