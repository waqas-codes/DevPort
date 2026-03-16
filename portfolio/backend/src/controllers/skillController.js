const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ name: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private/Admin
exports.createSkill = async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ message: 'Error creating skill', error: error.message });
    }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
exports.updateSkill = async (req, res) => {
    try {
        let skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json(skill);
    } catch (error) {
        res.status(400).json({ message: 'Error updating skill', error: error.message });
    }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        await skill.deleteOne();
        res.json({ message: 'Skill removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
