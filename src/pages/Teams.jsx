
import React, { useState } from 'react';
import { User, Shield, Phone, Mail, Edit, Trash2 } from 'lucide-react';
import AddTeamModal from '../components/AddTeamModal';
import TeamDetailsModal from '../components/TeamDetailsModal';
import TeamContactModal from '../components/TeamContactModal';
import ConfirmationModal from '../components/ConfirmationModal';

const TeamCard = ({ name, role, members, status, onViewDetails, onEdit, onDelete, onContact, phone, email }) => (
    <div className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-500 transition-colors shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                    <Shield size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{role}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                    <Edit size={16} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                    {status}
                </span>
            </div>
        </div>

        <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <User size={16} />
                <span>{members} Members</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Phone size={16} />
                <span>{phone || "+1 (555) 000-0000"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail size={16} />
                <span>{email || "contact@gearguard.com"}</span>
            </div>
        </div>

        <div className="pt-4 border-t border-slate-700/50 flex gap-2">
            <button
                onClick={onViewDetails}
                className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-sm font-medium transition-colors"
            >
                View Details
            </button>
            <button
                onClick={onContact}
                className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
            >
                Contact
            </button>
        </div>
    </div>
);

export default function Teams() {
    const [teams, setTeams] = useState([
        {
            id: 1,
            name: "Alpha Crew",
            role: "Preventive Maintenance",
            members: 5,
            status: "Active",
            leader: "Sarah Jenkins",
            membersList: ["Sarah Jenkins", "Mike Ross", "Rachel Zane", "Louis Litt", "Harvey Specter"],
            email: "alpha@gearguard.com",
            phone: "+1 (555) 123-4567"
        },
        {
            id: 2,
            name: "Beta Mechanics",
            role: "Corrective Repair",
            members: 4,
            status: "Active",
            leader: "Tom Holland",
            membersList: ["Tom Holland", "Zendaya", "Jacob Batalon", "Tony Stark"],
            email: "beta@gearguard.com",
            phone: "+1 (555) 987-6543"
        },
        {
            id: 3,
            name: "Gamma Techs",
            role: "Electrical Systems",
            members: 3,
            status: "On Leave",
            leader: "Elon Musk",
            membersList: ["Elon Musk", "Grimes", "X Æ A-12"],
            email: "gamma@gearguard.com",
            phone: "+1 (555) 333-2222"
        },
        {
            id: 4,
            name: "Delta Ops",
            role: "Facility Management",
            members: 6,
            status: "Active",
            leader: "Walter White",
            membersList: ["Walter White", "Jesse Pinkman", "Skyler White", "Hank Schrader", "Saul Goodman", "Mike Ehrmantraut"],
            email: "delta@gearguard.com",
            phone: "+1 (555) 777-8888"
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [contactTeam, setContactTeam] = useState(null);
    const [editingTeam, setEditingTeam] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    const handleAddTeam = (newTeam) => {
        setTeams([...teams, { ...newTeam, id: Date.now() }]);
    };

    const handleEditTeam = (team) => {
        setEditingTeam(team);
        setIsModalOpen(true);
    };

    const handleUpdateTeam = (updatedTeam) => {
        setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
        setEditingTeam(null);
    };

    const handleDeleteClick = (team) => {
        setDeleteConfirmation(team);
    };

    const confirmDelete = () => {
        if (deleteConfirmation) {
            setTeams(teams.filter(t => t.id !== deleteConfirmation.id));
            setDeleteConfirmation(null);
        }
    };

    const handleViewDetails = (team) => {
        setSelectedTeam(team);
    };

    const handleContact = (team) => {
        setContactTeam(team);
    }

    return (
        <div className="h-full overflow-y-auto pb-10">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-1">Teams Management</h2>
                <p className="text-slate-400">Manage your maintenance crews and assignments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map(team => (
                    <TeamCard
                        key={team.id}
                        {...team}
                        onViewDetails={() => handleViewDetails(team)}
                        onContact={() => handleContact(team)}
                        onEdit={() => handleEditTeam(team)}
                        onDelete={() => handleDeleteClick(team)}
                    />
                ))}

                {/* Add New Team Card */}
                <button
                    onClick={() => { setEditingTeam(null); setIsModalOpen(true); }}
                    className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex flex-col items-center justify-center gap-4 text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 group min-h-[250px]"
                >
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-500/10 flex items-center justify-center transition-colors">
                        <User size={32} />
                    </div>
                    <span className="font-medium">Add New Team</span>
                </button>
            </div>

            <AddTeamModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingTeam(null); }}
                onAdd={handleAddTeam}
                onEdit={handleUpdateTeam}
                team={editingTeam}
            />

            <TeamDetailsModal
                isOpen={!!selectedTeam}
                onClose={() => setSelectedTeam(null)}
                team={selectedTeam}
            />

            <TeamContactModal
                isOpen={!!contactTeam}
                onClose={() => setContactTeam(null)}
                team={contactTeam}
            />

            <ConfirmationModal
                isOpen={!!deleteConfirmation}
                onClose={() => setDeleteConfirmation(null)}
                onConfirm={confirmDelete}
                title="Delete Team"
                message={`Are you sure you want to delete "${deleteConfirmation?.name}"? This action cannot be undone.`}
                confirmText="Delete Team"
                isDestructive={true}
            />
        </div>
    );
}

