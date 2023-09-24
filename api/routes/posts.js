const { removePost, getPost, updatePost, getPosts, addPost, likePost } = require('../controllers/post')
const { isAuthenticated, isAuthorized } = require('../middlewares/middlewares')

const router = require('express').Router()
router.post('/', isAuthenticated, addPost)
router.get('/:id', getPost)
router.put('/:id', isAuthenticated, updatePost)
router.get('/', isAuthenticated, getPosts)
router.delete('/:id', isAuthenticated, isAuthorized, removePost)
router.get('/like/:id', isAuthenticated, likePost)

module.exports = router
