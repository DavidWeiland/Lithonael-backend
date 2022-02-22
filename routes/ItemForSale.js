const express = require('express')
const router = express.Router()

const auth = require('../middleware/authAdmin')
const itemCtrl = require('../controllers/ItemForSale')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, itemCtrl.createItem)
router.get('/', itemCtrl.getAllItems)
router.get('/:id', itemCtrl.getOneItem)
router.put('/:id', auth, multer, itemCtrl.modifyOneItem)
router.delete('/:id', auth, itemCtrl.deleteOneItem)

module.exports = router