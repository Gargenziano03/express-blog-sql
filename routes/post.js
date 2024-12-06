const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController.js')

router.get('/', postController.index);

router.get('/:title', postController.show);

router.post('/', postController.store)

router.put('/:title', postController.update)

router.delete('/:title', postController.destroy)

module.exports = router