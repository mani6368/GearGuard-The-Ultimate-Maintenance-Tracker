import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { MapPin, Box, Wrench, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import CreateEquipmentModal from '../components/CreateEquipmentModal';
import ConfirmationModal from '../components/ConfirmationModal';

export default function Equipment({ setView }) {
    const { equipment, requests, getTeamName, removeEquipment } = useData();
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Delete Confirmation State
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        equipmentId: null
    });

    const getOpenRequestCount = (eqId) => requests.filter(r => r.equipmentId === eqId && ['New', 'In Progress'].includes(r.stage)).length;

    const confirmDelete = () => {
        if (deleteConfirm.equipmentId) {
            removeEquipment(deleteConfirm.equipmentId);
            setDeleteConfirm({ isOpen: false, equipmentId: null });
        }
    };

    const promptDelete = (id) => {
        setDeleteConfirm({
            isOpen: true,
            equipmentId: id
        });
    };

    return (
        <div className="space-y-6 pb-10">
            <div className="flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-500">
                <div>
                    <h2 className="text-3xl font-bold mb-1">Equipment Assets</h2>
                    <p className="text-slate-400">Manage and track your machinery.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 flex">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-100 dark:bg-slate-700 text-black dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-slate-200'}`}
                            title="Grid View"
                        >
                            <Box size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-slate-100 dark:bg-slate-700 text-black dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-slate-200'}`}
                            title="Table View"
                        >
                            <Wrench size={18} className="transform rotate-90" />
                        </button>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="glass-button px-4 py-2 rounded-lg text-sm hover:scale-105 transition-transform"
                    >
                        + Add Equipment
                    </button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {equipment.map((item, index) => {
                        const openRequests = getOpenRequestCount(item.id);

                        return (
                            <div
                                key={item.id}
                                className={`bg-white dark:bg-slate-900/50 backdrop-blur-lg border border-slate-200 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 shadow-sm dark:shadow-none rounded-2xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] animate-in fade-in slide-in-from-bottom-8 duration-700`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <h3 className="text-xl font-bold text-white mb-1 shadow-black drop-shadow-md">{item.name}</h3>
                                        <div className="flex items-center gap-2 text-xs font-medium bg-slate-900/50 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700/50 w-fit">
                                            <Box size={12} className="text-blue-400" />
                                            <span className="text-slate-300">{item.serial}</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${item.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                            item.status === 'Maintenance' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                                'bg-red-500/20 text-red-400 border-red-500/30'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-slate-600 dark:text-slate-500 block text-xs mb-1">Department</span>
                                            <span className="text-slate-900 dark:text-slate-300 font-medium">{item.department}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600 dark:text-slate-500 block text-xs mb-1">Team</span>
                                            <span className="text-slate-900 dark:text-slate-300 font-medium">{getTeamName(item.teamId)}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600 dark:text-slate-500 block text-xs mb-1">Purchase Date</span>
                                            <span className="text-slate-900 dark:text-slate-300 font-medium">{item.purchaseDate || 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600 dark:text-slate-500 block text-xs mb-1">Warranty</span>
                                            <span className={`font-medium ${item.warranty === 'Expired' ? 'text-red-500 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                                {item.warranty || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-slate-600 dark:text-slate-500 block text-xs mb-1">Location</span>
                                            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-300">
                                                <MapPin size={14} className="text-slate-500" />
                                                {item.location}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Smart Button */}
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => setView('requests', { equipmentId: item.id })}
                                            className="flex-1 py-3 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 rounded-xl flex items-center justify-between transition-all group/btn"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover/btn:bg-blue-500 group-hover/btn:text-white transition-colors">
                                                    <Wrench size={18} />
                                                </div>
                                                <span className="font-medium text-black dark:text-slate-300 group-hover/btn:text-black dark:group-hover/btn:text-white transition-colors">Maintenance History</span>
                                            </div>

                                            {openRequests > 0 ? (
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-slate-900 text-xs font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse">
                                                    {openRequests}
                                                </span>
                                            ) : (
                                                <CheckCircle size={18} className="text-emerald-500/50 group-hover/btn:text-emerald-400" />
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                promptDelete(item.id);
                                            }}
                                            className="p-3 bg-white dark:bg-slate-800 hover:bg-red-500/20 text-slate-500 dark:text-slate-400 hover:text-red-400 border border-slate-200 dark:border-slate-700 hover:border-red-500/50 rounded-xl transition-all"
                                            title="Remove Equipment"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="glass-card rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-900 dark:text-slate-400">
                            <thead className="bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-slate-200 uppercase font-medium">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Serial Number</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">Employee</th>
                                    <th className="px-6 py-4">Technician</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Company</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {equipment.map((item) => {
                                    const openRequests = getOpenRequestCount(item.id);
                                    return (
                                        <tr key={item.id} className="hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                                                <img src={item.image} alt="" className="w-8 h-8 rounded bg-slate-800 object-cover" />
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">{item.serial}</td>
                                            <td className="px-6 py-4">{item.department}</td>
                                            <td className="px-6 py-4">{item.employee || '-'}</td>
                                            <td className="px-6 py-4">{item.technician || '-'}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded bg-slate-200 text-black dark:bg-slate-800 dark:border dark:border-slate-700 dark:text-slate-200 text-xs whitespace-nowrap">
                                                    {item.category || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold border ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                    item.status === 'Maintenance' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                        'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{item.company || 'GearGuard Inc.'}</td>
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <button
                                                    onClick={() => setView('requests', { equipmentId: item.id })}
                                                    className="p-1.5 hover:bg-blue-500/10 rounded-lg text-blue-400 hover:text-blue-300 transition-colors relative group/tool"
                                                    title="View Maintenance"
                                                >
                                                    <Wrench size={18} />
                                                    {openRequests > 0 && (
                                                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 shadow-sm animate-pulse" />
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        promptDelete(item.id);
                                                    }}
                                                    className="p-1.5 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                                                    title="Remove Equipment"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {isCreateModalOpen && (
                <CreateEquipmentModal onClose={() => setIsCreateModalOpen(false)} />
            )}

            <ConfirmationModal
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
                onConfirm={confirmDelete}
                title="Remove Equipment?"
                message="Are you sure you want to remove this equipment? This will NOT delete associated requests."
                confirmText="Remove"
                isDestructive={true}
            />
        </div>
    );
}
