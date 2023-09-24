const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports.updateUser = async (req, res) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
      }
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      })
      return res.status(200).json('user updated')
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json('invalid credential to update this user')
  }
}

module.exports.removeUser = async (req, res) => {
  if (req.params.id === req.body.id || req.body.isAdmin) {
    try {
      await User.findByIdAndRemove(req.params.id)
      return res.status(200).json('user removed')
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json('you havent credential for remove this user')
  }
}

module.exports.followUser = async (req, res) => {
  console.log(req.params.id, req.userId)
  if (req.params.id === req.userId) {
    return res.status(400).json('error! you cant follow your self')
  } else {
    try {
      const userFollowed = await User.findById(req.params.id)
      const userFollower = await User.findById(req.userId)
      if (!userFollowed || !userFollower) return res.status(400).json('invalid parameters')
      if (userFollowed.followers.includes(req.userId) ||
          userFollower.followings.includes(req.params.id)) {
        await userFollowed.updateOne({ $pull: { followers: req.userId } })
        await userFollower.updateOne({ $pull: { followings: req.params.id } })
        return res.status(200).json('unfollowed task done')
      }
      await userFollowed.updateOne({ $push: { followers: req.userId } })
      await userFollower.updateOne({ $push: { followings: req.params.id } })
      return res.status(200).json('follow action done!')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

module.exports.unfollowUser = async (req, res) => {
  if (req.params.id === req.userId) return res.status(400).json('you cant unfollow you self')
  try {
    const followedUser = await User.findById(req.params.id)
    const followerUser = await User.findById(req.userId)
    if (!followedUser || !followerUser) return res.status(400).json('invalid parameters')
    if (!followedUser.followers.includes(req.userId) ||
    !followerUser.followings.includes(req.params.id)) return res.status(400).json('error ! you dont follow this user')
    await followedUser.updateOne({ $pull: { followers: req.userId } })
    await followerUser.updateOne({ $pull: { followings: req.params.id } })
    return res.status(200).json('unfollow action done!')
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.getUser = async (req, res) => {
  const username = req.query.username
  const id = req.query.id
  console.log('get user api', username, id)
  try {
    const user = username
      ? await User.findOne({ username })
      : await User.findById(id)
    if (!user) return res.status(404).json('user dont exist')
    const { __v, password, ...others } = user._doc
    return res.status(200).json(others)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.getFriends = async (req, res) => {
  const userId = req.query.id
  const username = req.query.username
  const user = userId
    ? await User.findById(userId)
    : await User.findOne({ username })
  if (!user) return res.status(400).json('invalid parameters')
  const friends = await Promise.all(
    user.followings
      .map(friend => User.findById(friend))
  )
  const friendsList = friends
    .map(el => ({
      _id: el._id,
      username: el.username,
      profilePicture: el.profilePicture
    })
    )
  return res.status(200).json(friendsList)
}

module.exports.searchUsers = async (req, res) => {
  try {
    const response = await User.find({ username: { $regex: req.params.search } })
    const users = response.filter(u => !u._id.equals(req.userId))
      .map(el => ({
        _id: el._id,
        username: el.username,
        profilePicture: el.profilePicture,
        city: el.city,
        from: el.from,
        relationShip: el.relationShip
      }))
    console.log('userss  ===', users)
    return res.status(200).json(users)
  } catch (error) {
    console.log('error', error)
    return res.status(500).json(error)
  }
}
