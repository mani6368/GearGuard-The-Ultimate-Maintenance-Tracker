import React from 'react';
import { useData } from '../context/DataContext';
import { AlertTriangle, CheckCircle, Clock, Database, Plus } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, delay, onClick }) => (
    <div
        onClick={onClick}
        className={`glass-card p-6 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 ${onClick ? 'cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/50 transition-colors' : ''}`}
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center text-${color}-600 dark:text-${color}-400`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{label}</p>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">{value}</h3>
        </div>
    </div>
);

export default function Dashboard({ setView }) {
    const { equipment, requests } = useData();

    const totalAssets = equipment.length;
    // Count active requests (New or In Progress)
    const activeRequests = requests.filter(r => ['New', 'In Progress'].includes(r.stage)).length;

    // Simple overdue check (assuming fixed date for demo physics if needed, or real date)
    // Using a fixed reference date so the demo always looks 'alive' with some overdue items if the mock data is static.
    // Or better, just count items that are strictly before today.
    const today = new Date().toISOString().split('T')[0];
    const overdueRequests = requests.filter(r => {
        return ['New', 'In Progress'].includes(r.stage) && r.date < today;
    }).length;

    const critical = requests.filter(r => r.priority === 'Critical' && ['New', 'In Progress'].includes(r.stage)).length;

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-500">
                <div>
                    <h2 className="text-3xl font-bold mb-1 text-slate-900 dark:text-white">Dashboard Overview</h2>
                    <p className="text-slate-500 dark:text-slate-400">Welcome back, Maintenance Manager.</p>
                </div>
                <button
                    onClick={() => setView('requests')}
                    className="glass-button px-6 py-3 rounded-xl font-semibold flex items-center gap-2 group"
                >
                    <div className="bg-blue-500 rounded-full p-0.5 group-hover:rotate-90 transition-transform">
                        <Plus size={16} className="text-white" />
                    </div>
                    New Request
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Database}
                    label="Total Assets"
                    value={totalAssets}
                    color="blue"
                    delay="0"
                    onClick={() => setView('equipment')}
                />
                <StatCard
                    icon={Clock}
                    label="Open Requests"
                    value={activeRequests}
                    color="amber"
                    delay="100"
                    onClick={() => setView('requests')}
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Overdue Jobs"
                    value={overdueRequests}
                    color="red"
                    delay="200"
                    onClick={() => setView('requests')}
                />
                <StatCard
                    icon={CheckCircle}
                    label="Critical Issues"
                    value={critical}
                    color="emerald"
                    delay="300"
                    onClick={() => setView('requests', { priority: 'Critical' })}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                        <button onClick={() => setView('requests')} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors">View All</button>
                    </div>
                    <div className="space-y-4">
                        {requests.slice(0, 4).map((req, i) => (
                            <div key={req.id} className="flex items-center p-4 rounded-xl bg-white dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-slate-200 dark:border-slate-700/30 cursor-pointer shadow-sm dark:shadow-none">
                                <div className={`w-1.5 h-10 rounded-full mr-4 ${req.priority === 'Critical' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                    req.priority === 'High' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`} />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">{req.subject}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                        <span>{req.type}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600" />
                                        <span>{req.date}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${req.stage === 'New' ? 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:border-blue-400/20 dark:bg-blue-400/5' :
                                        req.stage === 'In Progress' ? 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:border-amber-400/20 dark:bg-amber-400/5' :
                                            'text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:border-emerald-400/20 dark:bg-emerald-400/5'
                                        }`}>
                                        {req.stage}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Equipment Status</h3>
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-500 dark:text-slate-400 text-sm">Operational</span>
                                <span className="text-emerald-500 dark:text-emerald-400 font-bold">{equipment.filter(e => e.status === 'Active').length}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" style={{ width: `${(equipment.filter(e => e.status === 'Active').length / equipment.length) * 100}%` }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-500 dark:text-slate-400 text-sm">Under Maintenance</span>
                                <span className="text-amber-500 dark:text-amber-400 font-bold">{equipment.filter(e => e.status === 'Maintenance').length}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]" style={{ width: `${(equipment.filter(e => e.status === 'Maintenance').length / equipment.length) * 100}%` }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-500 dark:text-slate-400 text-sm">Scrap / Offline</span>
                                <span className="text-red-500 dark:text-red-400 font-bold">{equipment.filter(e => e.status === 'Scrap').length}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" style={{ width: `${(equipment.filter(e => e.status === 'Scrap').length / equipment.length) * 100}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
                        <p className="text-xs text-slate-500">System Status</p>
                        <p className="text-emerald-500 dark:text-emerald-400 font-medium text-sm flex items-center justify-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            All Systems Operational
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
