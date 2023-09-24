const mongoose = require('mongoose')
const Post = require('./post')
const User = require('./user')

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: Post,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: User,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)
