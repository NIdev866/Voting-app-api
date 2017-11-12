const express = require('express')
const router = express.Router()
const Authentication = require ('../controllers/authentication')
const PollsController = require ('../controllers/polls')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

router.get('/', PollsController.getAllPolls)

router.post('/signin', requireSignin, Authentication.signin)
router.post('/signup', Authentication.signup)
router.post('/decode', Authentication.decode)

router.get('/profile', requireAuth, function(req, res){
  res.json({message: 'authenticated'})
})

router.get('/user/:id', PollsController.getUserPolls)


module.exports = router
