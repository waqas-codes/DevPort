const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = async (req, res) => {
    try {
        // If an image file was uploaded, use the Cloudinary URL
        if (req.file) {
            req.body.image = req.file.path;
        }

        // Parse techStack if it comes as a comma-separated string (from FormData)
        if (typeof req.body.techStack === 'string') {
            req.body.techStack = req.body.techStack.split(',').map(s => s.trim()).filter(s => s);
        }

        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error('CREATE PROJECT ERROR:', error);
        res.status(400).json({ message: 'Error creating project', error: error.message, details: error.errors });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // If a new image file was uploaded, use the Cloudinary URL
        if (req.file) {
            req.body.image = req.file.path;
        }

        // Parse techStack if it comes as a comma-separated string (from FormData)
        if (typeof req.body.techStack === 'string') {
            req.body.techStack = req.body.techStack.split(',').map(s => s.trim()).filter(s => s);
        }

        project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json(project);
    } catch (error) {
        console.error('UPDATE PROJECT ERROR:', error);
        res.status(400).json({ message: 'Error updating project', error: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
