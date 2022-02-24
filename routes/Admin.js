const express = require('express')
const router = express.Router()

const adminCtrl = require('../controllers/Admin')
const auth = require('../middleware/authAdmin')

router.post('/signup', auth, adminCtrl.signup)
router.post('/login', adminCtrl.login)
router.put('/:id', auth, adminCtrl.modifyAdmin)

module.exports = router