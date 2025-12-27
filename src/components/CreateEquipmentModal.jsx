import React, { useState } from 'react';
import { X, Save, Box, MapPin, Calendar, ShieldCheck, User, Wrench, Globe } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function CreateEquipmentModal({ onClose }) {
    const { addEquipment, teams } = useData();

    // Form data with defaults aligned to Excalidraw requirements
    const [formData, setFormData] = useState({
        name: '',
        serial: '',
        department: 'Production', // Default department
        teamId: teams[0]?.id || '',
        location: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        warranty: '2026-01-01',
        status: 'Active',
        employee: '',
        technician: '',
        category: 'Heavy Machinery',
        company: 'GearGuard Inc.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', // Default image
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addEquipment(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Box className="text-blue-500" size={20} />
                        Add New Equipment
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[80vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Basic Info</h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Equipment Name</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="e.g. CNC Machine X1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Serial Number</label>
                                <input
                                    required
                                    value={formData.serial}
                                    onChange={e => setFormData({ ...formData, serial: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="e.g. SN-2023-001"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option>Heavy Machinery</option>
                                    <option>Electronics</option>
                                    <option>Vehicles</option>
                                    <option>Tools</option>
                                </select>
                            </div>
                        </div>

                        {/* Ownership */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Ownership</h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Company</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        value={formData.company}
                                        disabled
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-400 italic cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Assigned Team</label>
                                <select
                                    value={formData.teamId}
                                    onChange={e => setFormData({ ...formData, teamId: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    {teams.map(team => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Department</label>
                                <input
                                    value={formData.department}
                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Personnel */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Personnel</h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Responsible Employee</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        value={formData.employee}
                                        onChange={e => setFormData({ ...formData, employee: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Name of operator"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Lead Technician</label>
                                <div className="relative">
                                    <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        value={formData.technician}
                                        onChange={e => setFormData({ ...formData, technician: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Primary technician name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Details</h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Purchase Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        type="date"
                                        value={formData.purchaseDate}
                                        onChange={e => setFormData({ ...formData, purchaseDate: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Warranty Expiry</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        type="date"
                                        value={formData.warranty}
                                        onChange={e => setFormData({ ...formData, warranty: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="e.g. Floor 1, Bay 4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-800 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
                        >
                            <Save size={18} />
                            Save Equipment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
