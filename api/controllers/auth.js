const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).json('exist a user with ' + req.body.username + ' as username')
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    return res.status(201).json(newUser)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(404).json('user dont exit')
    const compare = await bcrypt.compare(req.body.password, user.password)
    if (!compare) return res.status(400).json('false creedential')
    const token = jwt.sign({
      userId: user.id
    },
    process.env.JWT_SECRET
    )
    const { password, __v, ...userWithoutPw } = user._doc
    const cookiesOPtions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
    return res.cookie('accessToken', token, cookiesOPtions)
      .status(200)
      .json(userWithoutPw)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports.logout = (req, res) => {
  if (req.userId) {
    return res.clearCookie('accessToken')
      .status(200).json('user desconnected')
  }
  return res.status(400).json('usernot authenticated')
}
