const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Post = require('../models/post')
const multer = require('multer')

module.exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.accessToken
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(400).json('invalid token')
      req.userId = user.userId
      next()
    })
  } else return res.status(403).json('user not authenticated')
}

module.exports.isAuthorized = async (req, res, next) => {
  if (req.userId) {
    const user = await User.findById(req.userId)
    const post = await Post.findById(req.params.id)
    if (!user) return res.status(404).json('invalid parameter')
    if (!post) return res.status(404).json('invalid parameters')
    console.log(post.userId.equals(req.userId))
    if (post.userId.equals(req.userId) || user.isAdmin) return next()
    return res.status(403).json('you havent credentials to remove this post')
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

module.exports.upload = multer({ storage })
