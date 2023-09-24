const { updateUser, removeUser, followUser, unfollowUser, getUser, getFriends, searchUsers } = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/middlewares')

const router = require('express').Router()

router.get('/', isAuthenticated, getUser)
router.put('/:id', isAuthenticated, updateUser)
router.delete('/:id', isAuthenticated, removeUser)
router.get('/follow/:id', isAuthenticated, followUser)
router.post('/unfollow/:id', isAuthenticated, unfollowUser)
router.get('/friends', isAuthenticated, getFriends)
router.get('/search/:search', isAuthenticated, searchUsers)

module.exports = router
