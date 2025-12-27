import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, currentView, setView }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans selection:bg-blue-500/30">
            <Sidebar currentView={currentView} setView={setView} />
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen relative">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 -z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/5 via-slate-950 to-slate-950 -z-10 pointer-events-none" />

                <div className="max-w-7xl mx-auto fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
