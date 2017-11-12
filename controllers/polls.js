const mongoose = require('mongoose')
const Poll = require('../models/poll')

exports.createPoll = function(req, res, next){
  var { name, options } = req.body.poll
  var { user } = req.body
  const newPoll = new Poll({
    name,
    options,
    user
  })
  newPoll.save(function(err){
    if(err) { return next() }
    res.json( newPoll )
  })
}

exports.getAllPolls = function(req, res, next){
  Poll.find({}, function(err, docs){
    if(err) { return next(err) }
    res.json(docs)
  })
}

exports.getSinglePoll = function(req, res, next){
  const id = mongoose.Types.ObjectId(req.params.poll)
  Poll.findOne({_id: id}, function(err, doc){
    if(err) { return next(err) }
    res.json(doc)
  })
}

exports.votePoll = function(req, res, next){
  const id = mongoose.Types.ObjectId(req.params.poll)
  const option = req.body.option
  var update = {$inc: {}}
  update.$inc['options.' + option + ".votes"] = 1
  Poll.update({_id: id}, update, function(err, updated){
    if(err)
      next(err)
    res.json(updated)
  })
}

exports.getUserPolls = function(req, res, next){
  const user = mongoose.Types.ObjectId(req.params.id)
  Poll.find({ user }, function(err, doc){
    if(err) { return next(err) }
    res.json(doc)
  })
}

exports.deletePoll = function(req, res, next){
  const id = mongoose.Types.ObjectId(req.params.poll)
  Poll.remove({_id: id}, function(err){
    if(err){
      next(err)
    }
    res.json({message: 'succesfully delete '+id})
  })
}

exports.customOption = function(req, res, next){
  const { option } = req.body
  const id = mongoose.Types.ObjectId(req.params.poll)
  const addOption = { option, votes: 1}
  var update = {$push: {}}
  update.$push = { options: addOption }
  Poll.update({ _id: id }, update, function(err, doc){
    if(err){
      return next(err)
    }
    if(!doc){
      res.json({message: 'not found'})
    }
    res.json( doc )
  })
}
