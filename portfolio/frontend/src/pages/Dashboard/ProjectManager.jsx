import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Upload, Link as LinkIcon, Github } from 'lucide-react';
import Button from '../../components/Button';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        githubLink: '',
        liveLink: '',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setError(null);
            const res = await axios.get('/api/projects');
            setProjects(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setError('Failed to fetch projects. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleOpenModal = (project = null) => {
        setError(null);
        setImageFile(null);
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                description: project.description,
                techStack: project.techStack.join(', '),
                githubLink: project.githubLink || '',
                liveLink: project.liveLink || '',
            });
            setImagePreview(project.image || null);
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                description: '',
                techStack: '',
                githubLink: '',
                liveLink: '',
            });
            setImagePreview(null);
        }
        setIsModalOpen(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('techStack', formData.techStack);
        if (formData.githubLink) data.append('githubLink', formData.githubLink);
        if (formData.liveLink) data.append('liveLink', formData.liveLink);
        if (imageFile) data.append('image', imageFile);

        try {
            if (editingProject) {
                await axios.put(`/api/projects/${editingProject._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await axios.post('/api/projects', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            fetchProjects();
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error saving project. Full error:', err.response?.data || err);
            setError(err.response?.data?.message || err.response?.data?.error || 'Error saving project. Please check your input.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                setError(null);
                await axios.delete(`/api/projects/${id}`);
                fetchProjects();
            } catch (err) {
                console.error('Error deleting project:', err);
                setError('Failed to delete project.');
            }
        }
    };

    if (isLoading) return <div className="text-center py-20 text-slate-400 font-bold">Loading Projects...</div>;

    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Manage Projects</h1>
                    <p className="text-slate-500">Showcase your best work to the world.</p>
                </div>
                <Button onClick={() => handleOpenModal()} variant="primary" className="h-12">
                    <Plus size={20} /> Add New Project
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 font-bold">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-6 hover:shadow-md transition-shadow">
                        <img
                            src={project.image || 'https://via.placeholder.com/150'}
                            className="w-32 h-32 object-cover rounded-2xl bg-slate-100"
                            alt={project.title}
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-slate-900 truncate">{project.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-2 mt-1 mb-4">{project.description}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOpenModal(project)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-[95%] sm:max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] min-h-[50vh] overflow-y-auto">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Project Image</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="relative w-full h-48 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors cursor-pointer overflow-hidden bg-slate-50 dark:bg-slate-900 flex items-center justify-center"
                                >
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <Upload size={32} />
                                            <span className="text-sm font-medium">Click to upload an image</span>
                                            <span className="text-xs">JPG, JPEG, or PNG (max 5MB)</span>
                                        </div>
                                    )}
                                    {imagePreview && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">Change Image</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Project Title</label>
                                <input
                                    type="text" required value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-slate-900 dark:text-white bg-white dark:bg-slate-900"
                                    placeholder="Awesome Portfolio"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
                                <textarea
                                    required rows="3" value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none text-slate-900 dark:text-white bg-white dark:bg-slate-900"
                                    placeholder="Write something cool about this project..."
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tech Stack (comma separated)</label>
                                <input
                                    type="text" required value={formData.techStack}
                                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-slate-900 dark:text-white bg-white dark:bg-slate-900"
                                    placeholder="React, Node.js, GSAP"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Github Link</label>
                                    <div className="relative">
                                        <Github className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <input
                                            type="text" value={formData.githubLink}
                                            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-slate-900 dark:text-white bg-white dark:bg-slate-900"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Live Link</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                        <input
                                            type="text" value={formData.liveLink}
                                            onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-slate-900 dark:text-white bg-white dark:bg-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <Button type="submit" variant="primary" className="flex-1 h-12">
                                    {editingProject ? 'Update Project' : 'Publish Project'}
                                </Button>
                                <button
                                    type="button" onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManager;
