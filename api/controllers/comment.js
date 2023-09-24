const Post = require('../models/post')
const Comment = require('../models/Comment')
const User = require('../models/user')
const mongoose = require('mongoose')

module.exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId)
    if (!post) return res.status(404).json('post not exist')
    const comment = await Comment.create({
      comment: req.body.comment,
      userId: req.userId,
      postId: req.body.postId
    })
    const user = await User.findById(req.userId)
    const { __v, password, ...userComment } = user._doc
    return res.status(200).json({ comment, user: userComment })
  } catch (error) {
    console.log('add comment err', error)
    return res.status(500).json(error)
  }
}

module.exports.removeComment = (req, res) => {

}

module.exports.getComments = async (req, res) => {
  console.log('get comments', req.params.postId)
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) return res.status(404).json('post not exist')
    const comments = await Comment.find({ postId: new mongoose.Types.ObjectId(req.params.postId) })
      .populate('userId')
    return res.status(200).json(comments)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

module.exports.getComment = (req, res) => {

}
module.exports.updateComment = (req, res) => {

}
