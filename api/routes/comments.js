const { isAuthenticated } = require('../middlewares/middlewares')

const { getComments, addComment, getComment, updateComment } = require('../controllers/comment')

const router = require('express').Router()

router.get('/post/:postId', isAuthenticated, getComments)
router.get('/:id', isAuthenticated, getComment)
router.post('/', isAuthenticated, addComment)
router.delete('/:id', isAuthenticated, addComment)
router.put('/:id', isAuthenticated, updateComment)

module.exports = router
