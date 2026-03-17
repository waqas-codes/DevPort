import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Briefcase, Cpu, MessageSquare, TrendingUp, Mail, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Overview = () => {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsLoading(true);
                const [projectsRes, skillsRes, messagesRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/skills'),
                    api.get('/messages')
                ]);
                setProjects(projectsRes.data);
                setSkills(skillsRes.data);
                setMessages(messagesRes.data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data.');
                setIsLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const stats = [
        { label: 'Total Projects', value: projects.length, icon: <Briefcase />, color: 'bg-blue-500' },
        { label: 'Skills Listed', value: skills.length, icon: <Cpu />, color: 'bg-purple-500' },
        { label: 'Total Messages', value: messages.length, icon: <MessageSquare />, color: 'bg-amber-500' },
        { label: 'Unread Messages', value: messages.filter(m => !m.isRead).length, icon: <TrendingUp />, color: 'bg-emerald-500' },
    ];

    if (isLoading) return <div className="text-center py-20 text-slate-400 font-bold">Loading Overview...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back. Here's what's happening with your portfolio.</p>
                </div>
                {error && <span className="text-red-500 font-bold">{error}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-${stat.color.split('-')[1]}-200`}>
                            {stat.icon}
                        </div>
                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Messages */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Recent Messages</h3>
                        <Link to="/admin/messages" className="text-primary text-sm font-bold hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {messages.length === 0 ? (
                            <p className="text-slate-400 text-center py-10">No messages yet.</p>
                        ) : (
                            messages.slice(0, 3).map((msg) => (
                                <div key={msg._id} className="p-4 rounded-2xl border border-slate-50 hover:border-slate-100 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-900 text-sm">{msg.name}</h4>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-1">{msg.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Latest Projects */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Latest Projects</h3>
                        <Link to="/admin/projects" className="text-primary text-sm font-bold hover:underline">Manage All</Link>
                    </div>
                    <div className="space-y-4">
                        {projects.length === 0 ? (
                            <p className="text-slate-400 text-center py-10">No projects yet.</p>
                        ) : (
                            projects.slice(0, 3).map((project) => (
                                <div key={project._id} className="flex gap-4 p-4 rounded-2xl border border-slate-50 hover:border-slate-100 transition-colors">
                                    <img
                                        src={project.image 
                                            ? (project.image.startsWith('http') ? project.image : `https://devport-mzh7.onrender.com${project.image}`) 
                                            : 'https://via.placeholder.com/150'}
                                        alt={project.title}
                                        className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 text-sm truncate">{project.title}</h4>
                                        <p className="text-xs text-slate-500 line-clamp-1">{project.description}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
