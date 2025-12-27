import React from 'react';
import { X, User, Phone, Mail, Shield, Briefcase, Star } from 'lucide-react';

export default function TeamDetailsModal({ isOpen, onClose, team }) {
    if (!isOpen || !team) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white leading-none">{team.name}</h3>
                            <span className="text-sm text-slate-400">{team.role}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Leader Section */}
                    <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                        <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                            <Star size={14} className="text-amber-500" />
                            Team Leader
                        </h4>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-slate-200 font-medium">{team.leader || 'Not Assigned'}</p>
                                <p className="text-xs text-slate-500">Head of Operations</p>
                            </div>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-700/50">
                        <h4 className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Status</h4>
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${team.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-slate-700/50 text-slate-400 border-slate-600'
                            }`}>
                            {team.status}
                        </div>
                    </div>

                    {/* Members List */}
                    <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                            <User size={14} />
                            Team Members ({team.membersList?.length || team.members || 0})
                        </h4>
                        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                            {team.membersList && team.membersList.length > 0 ? (
                                team.membersList.map((member, index) => (
                                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300 font-medium">
                                            {member.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm text-slate-300">{member}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-slate-600 italic px-2">No members listed.</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-800/30">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
}
