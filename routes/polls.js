const express = require('express')
const router = express.Router()
const PollsController = require ('../controllers/polls')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })

router.get('/', requireAuth, function(req, res){
  res.json({message: 'poll'})
})

router.post('/new', requireAuth, PollsController.createPoll)
router.get('/:poll', PollsController.getSinglePoll)
router.post('/:poll/custom', PollsController.customOption)
router.delete('/:poll', requireAuth, PollsController.deletePoll)
router.post('/:poll', PollsController.votePoll)

module.exports = router
