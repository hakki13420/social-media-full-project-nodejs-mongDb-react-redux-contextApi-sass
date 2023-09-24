const mongoose = require('mongoose')
const User = require('./user')

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    require: true
  },
  picture: {
    type: String,
    default: ''
  },
  likes: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: []
  }

}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
