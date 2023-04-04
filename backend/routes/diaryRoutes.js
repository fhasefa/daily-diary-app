const express = require('express')

const router = express.Router()

const diaryControl = require('../controllers/diaryController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

// seed 
router.get('/seed', diaryControl.seed)

// index
router.get('/', diaryControl.index)

// delete
router.delete('/:id', authorize, confirmUserAccess, diaryControl.delete)

// update
router.put('/:id', authorize, confirmUserAccess, diaryControl.update)

// create
router.post('/', authorize, diaryControl.create)

// show
router.get('/:id', diaryControl.show)

module.exports = router