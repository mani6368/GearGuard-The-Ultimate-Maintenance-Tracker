import React from 'react';
import { X, Phone, Mail, Shield, Copy } from 'lucide-react';

export default function TeamContactModal({ isOpen, onClose, team }) {
    if (!isOpen || !team) return null;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here if desired
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white leading-none">{team.name}</h3>
                            <span className="text-xs text-slate-400">Contact Information</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors group">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Phone Number</span>
                            <button
                                onClick={() => copyToClipboard(team.phone)}
                                className="text-slate-500 hover:text-blue-400 p-1 rounded-md hover:bg-slate-700/50 transition-colors"
                                title="Copy Phone"
                            >
                                <Copy size={12} />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 text-slate-200">
                            <Phone size={18} className="text-blue-400" />
                            <span className="font-medium">{team.phone || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors group">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email Address</span>
                            <button
                                onClick={() => copyToClipboard(team.email)}
                                className="text-slate-500 hover:text-blue-400 p-1 rounded-md hover:bg-slate-700/50 transition-colors"
                                title="Copy Email"
                            >
                                <Copy size={12} />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 text-slate-200">
                            <Mail size={18} className="text-blue-400" />
                            <span className="font-medium truncate">{team.email || 'N/A'}</span>
                        </div>
                    </div>

                    <a
                        href={`mailto:${team.email}`}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Mail size={18} />
                        Send Email
                    </a>
                </div>
            </div>
        </div>
    );
}
