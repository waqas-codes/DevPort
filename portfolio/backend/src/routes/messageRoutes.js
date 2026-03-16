const express = require('express');
const router = express.Router();
const {
    createMessage,
    getMessages,
    deleteMessage,
    markMessageAsRead
} = require('../controllers/messageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(createMessage)
    .get(protect, admin, getMessages);

router.route('/:id')
    .delete(protect, admin, deleteMessage)
    .put(protect, admin, markMessageAsRead);

module.exports = router;
