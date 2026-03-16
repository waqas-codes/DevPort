const Message = require('../models/Message');

// @desc    Create a new message (Contact form submission)
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json({ success: true, data: message });
    } catch (error) {
        res.status(400).json({ message: 'Error sending message', error: error.message });
    }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        await message.deleteOne();
        res.json({ message: 'Message removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// @desc    Mark a message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
exports.markMessageAsRead = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        message.isRead = true;
        await message.save();
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
