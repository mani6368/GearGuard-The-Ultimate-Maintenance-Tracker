import React from 'react';
import { LayoutDashboard, Wrench, ClipboardList, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NavItem = ({ icon: Icon, label, id, currentView, setView, onClick, className }) => {
    const isActive = currentView === id;
    return (
        <button
            onClick={onClick || (() => setView(id))}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${className || ''}
        ${isActive
                    ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)] text-white'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
        >
            <Icon size={20} className={isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
            <span className="font-medium">{label}</span>
            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_white]" />}
        </button>
    );
};

export default function Sidebar({ currentView, setView }) {
    const { logout } = useAuth();

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'equipment', label: 'Equipment', icon: Wrench },
        { id: 'requests', label: 'Requests', icon: ClipboardList },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'teams', label: 'Teams', icon: Users },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 p-4 border-r border-slate-800/50 bg-slate-950/80 backdrop-blur-xl flex flex-col z-50">
            <div className="flex items-center gap-3 px-4 py-4 mb-8">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Wrench size={18} className="text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    GearGuard
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map(item => (
                    <NavItem key={item.id} {...item} currentView={currentView} setView={setView} />
                ))}
            </nav>

            <div className="pt-4 border-t border-slate-800/50 space-y-2">
                <NavItem id="settings" label="Settings" icon={Settings} currentView={currentView} setView={setView} />
                <NavItem
                    id="logout"
                    label="Sign Out"
                    icon={LogOut}
                    currentView={null}
                    setView={() => { }}
                    onClick={logout}
                    className="hover:bg-red-500/10 hover:text-red-400"
                />
            </div>
        </aside>
    );
}
