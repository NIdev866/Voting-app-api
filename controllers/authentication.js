const jwt = require('jwt-simple')
require('dotenv').config()
const User = require('../models/user')

function tokenForUser(user){
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET)
}

exports.signup = function(req, res, next){
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  if(!email || !password){
    return res.status(422).send({ error: "You must provide email or password."})
  }

  User.findOne({ email: email }, function(err, existingUser){
    if(err){
      console.log("Error ", err)
      return next(err)
    }
    if(existingUser){
      return res.status(422).send({ error: 'Email in used' })
    }
    const user = new User({
      name: name,
      email: email,
      password: password
    })
    user.save(function(err){
      if(err)
        return next(err)
      res.json({ token: tokenForUser(user), user: user })
    })
  })
}

exports.signin = function(req, res, next){
  console.log(req.user)
  res.send({ token: tokenForUser(req.user), user: req.user })
}

exports.decode = function(req, res, next){
  const token = req.body.token
  const id = jwt.decode(token, process.env.SECRET).sub
  User.findOne({_id: id}, function(err, user){
    if(err)
      return next(err)
    const sendingUser = {name: user.name, email: user.email, _id: user._id}
    res.send({user: sendingUser})
  })
}
