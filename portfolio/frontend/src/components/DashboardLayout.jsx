import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors">
            <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <main className="flex-1 min-w-0 flex flex-col">
                {/* Mobile topbar */}
                <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="text-xl font-black">
                        Dev<span className="text-primary italic">Port</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-800 rounded-lg">
                        <Menu size={24} />
                    </button>
                </div>

                {/* Dashboard content */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                    <Outlet />
                </div>
            </main>

            {/* Mobile overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
