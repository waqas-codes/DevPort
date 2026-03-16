import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Target } from 'lucide-react';
import Button from '../../components/Button';

const SkillManager = () => {
    const [skills, setSkills] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        level: 'Intermediate',
        icon: 'Target', // Default icon
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            setError(null);
            const res = await axios.get('/api/skills');
            setSkills(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching skills:', err);
            setError('Failed to fetch skills. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleOpenModal = (skill = null) => {
        setError(null);
        if (skill) {
            setEditingSkill(skill);
            setFormData({
                name: skill.name,
                level: skill.level,
                icon: skill.icon || 'Target',
            });
        } else {
            setEditingSkill(null);
            setFormData({
                name: '',
                level: 'Intermediate',
                icon: 'Target',
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (editingSkill) {
                await axios.put(`/api/skills/${editingSkill._id}`, formData);
            } else {
                await axios.post('/api/skills', formData);
            }
            fetchSkills();
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error saving skill:', err);
            setError(err.response?.data?.message || 'Error saving skill. Please check your input.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                setError(null);
                await axios.delete(`/api/skills/${id}`);
                fetchSkills();
            } catch (err) {
                console.error('Error deleting skill:', err);
                setError('Failed to delete skill.');
            }
        }
    };

    if (isLoading) return <div className="text-center py-20 text-slate-400">Loading skills...</div>;

    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Manage Skills</h1>
                    <p className="text-slate-500">Keep your expertise up to date.</p>
                </div>
                <Button onClick={() => handleOpenModal()} variant="primary" className="h-12">
                    <Plus size={20} /> Add New Skill
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 font-bold">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Skill Name</th>
                            <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Level</th>
                            <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {skills.map((skill) => (
                            <tr key={skill._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                            <Target size={20} />
                                        </div>
                                        <span className="font-bold text-slate-800">{skill.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${skill.level === 'Advanced' || skill.level === 'Professional'
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {skill.level}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleOpenModal(skill)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(skill._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-[95%] sm:max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{editingSkill ? 'Edit Skill' : 'New Skill'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {error && (
                                <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Skill Name</label>
                                <input
                                    type="text" required value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-slate-900 dark:text-white bg-white dark:bg-slate-900"
                                    placeholder="e.g. React.js"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Expertise Level</label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-slate-900 dark:text-white bg-white dark:bg-slate-900"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Professional">Professional</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Icon (Lucide name or URL)</label>
                                <input
                                    type="text" required value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-slate-900 dark:text-white bg-white dark:bg-slate-900"
                                    placeholder="e.g. Target, Cpu, Code"
                                />
                            </div>

                            <div className="pt-4 flex gap-4">
                                <Button type="submit" variant="primary" className="flex-1 h-12">
                                    {editingSkill ? 'Update Skill' : 'Add Skill'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillManager;
