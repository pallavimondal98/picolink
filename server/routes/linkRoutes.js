const router = require('express').Router();
const { getLink, createLink } = require('../linkController');


router.get('/:id',getLink);
router.post('/api/links/create',createLink)

module.exports = router