import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    Cpu,
    MessageSquare,
    LogOut,
    User,
    X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin' },
        { icon: <Briefcase size={20} />, label: 'Projects', path: '/admin/projects' },
        { icon: <Cpu size={20} />, label: 'Skills', path: '/admin/skills' },
        { icon: <MessageSquare size={20} />, label: 'Messages', path: '/admin/messages' },
    ];

    return (
        <aside
            className={`
                w-64 shrink-0 bg-slate-900 text-white min-h-screen flex flex-col z-40
                transition-transform duration-300 ease-in-out
                fixed left-0 top-0 lg:static
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}
        >
            <div className="p-8 pb-4 relative">
                <div className="text-2xl font-black mb-10 mt-2 lg:mt-0">
                    Dev<span className="text-primary italic">Port</span>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest mt-1">Admin Panel</span>
                </div>

                {/* Mobile close button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-8 right-6 p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white lg:hidden"
                >
                    <X size={20} />
                </button>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                            `}
                        >
                            {item.icon}
                            <span className="font-bold">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-8 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6 p-2">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                        <User size={20} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold truncate">Admin User</p>
                        <p className="text-[10px] text-slate-500 uppercase">Administrator</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
