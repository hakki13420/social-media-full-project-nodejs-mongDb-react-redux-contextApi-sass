const Post = require('../models/post')
const User = require('../models/user')
const fs = require('fs')

module.exports.addPost = async (req, res) => {
  console.log('userId', req.userId)
  try {
    const post = new Post()
    post.content = req.body.content
    post.userId = req.userId
    post.picture = req.body.picture

    await post.save()
    const { __v, password, ...newPost } = post._doc
    return res.status(201).json(newPost)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json('post dont exist')
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.userId.equals(req.body.userId)) return res.status(403).json('you havent credential to update this post')
    const updatedPost = await Post.updateOne({ $set: req.body })
    return res.status(200).json(updatedPost)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.getPosts = async (req, res) => {
  const { username } = req.query
  const { id } = req.query
  try {
    const user = username
      ? await User.findOne({ username })
      : await User.findById(id)
    if (!user) return res.status(401).json('invalid parameter')
    const postsUser = await Post.find({ userId: user._id })
    if (id) {
      const postsFriends = await Promise.all(
        user.followings.map(friend => Post.find({ userId: friend }))
      )

      return res.status(200).json(postsUser.concat(...postsFriends))
    }
    if (username) {
      return res.status(200).json(postsUser)
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.removePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.picture && fs.existsSync('../public/uploads/' + post.picture)) fs.rm('../public/uploads/' + post.picture)
    await post.deleteOne()
    return res.status(200).json('post removed')
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json('post dont exist')
    if (post.userId.equals(req.userId)) return res.status(400).json('you cant like your posts')
    if (!post.likes.includes(req.userId)) {
      await post.updateOne({ $push: { likes: req.userId } })
      return res.status(200).json('post liked')
    } else {
      await post.updateOne({ $pull: { likes: req.userId } })
      return res.status(200).json('post disliked')
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}
