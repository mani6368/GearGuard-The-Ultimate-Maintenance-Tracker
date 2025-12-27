
import React, { useState, useEffect } from 'react';
import { X, Save, Shield, Users, Briefcase, User, Mail, Phone, Edit } from 'lucide-react';

export default function AddTeamModal({ isOpen, onClose, onAdd, onEdit, team }) {
    const [formData, setFormData] = useState({
        name: '',
        leader: '',
        role: '',
        memberNames: '',
        status: 'Active',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (team) {
            setFormData({
                name: team.name || '',
                leader: team.leader || '',
                role: team.role || '',
                memberNames: team.membersList ? team.membersList.join(', ') : '',
                status: team.status || 'Active',
                email: team.email || '',
                phone: team.phone || ''
            });
        } else {
            setFormData({
                name: '',
                leader: '',
                role: '',
                memberNames: '',
                status: 'Active',
                email: '',
                phone: ''
            });
        }
    }, [team, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.role) return;

        const membersList = formData.memberNames.split(',').map(name => name.trim()).filter(name => name !== '');

        const teamData = {
            ...formData,
            members: membersList.length,
            membersList: membersList
        };

        if (team) {
            onEdit({ ...teamData, id: team.id });
        } else {
            onAdd(teamData);
        }

        onClose();
        // Reset form if adding new
        if (!team) {
            setFormData({
                name: '',
                leader: '',
                role: '',
                memberNames: '',
                status: 'Active',
                email: '',
                phone: ''
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden scale-100 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30 sticky top-0 backdrop-blur-md z-10">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {team ? <Edit size={20} className="text-blue-400" /> : <Shield size={20} className="text-blue-400" />}
                        {team ? 'Edit Team Details' : 'Add New Team'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Team Name</label>
                        <div className="relative">
                            <Shield size={16} className="absolute left-3 top-3 text-slate-500" />
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="e.g. Omega Squad"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Team Leader</label>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-3 text-slate-500" />
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="e.g. John Doe"
                                value={formData.leader}
                                onChange={e => setFormData({ ...formData, leader: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Role / Function</label>
                        <div className="relative">
                            <Briefcase size={16} className="absolute left-3 top-3 text-slate-500" />
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                placeholder="e.g. Security & Surveillance"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                    placeholder="team@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Phone Number</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3 top-3 text-slate-500" />
                                <input
                                    type="tel"
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Member Names (Comma Separated)</label>
                        <div className="relative">
                            <Users size={16} className="absolute left-3 top-3 text-slate-500" />
                            <textarea
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 min-h-[100px]"
                                placeholder="e.g. Sarah, Mike, Tom"
                                value={formData.memberNames}
                                onChange={e => setFormData({ ...formData, memberNames: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Status</label>
                        <select
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 appearance-none"
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-800 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                        >
                            <Save size={18} />
                            {team ? 'Update Team' : 'Add Team'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
