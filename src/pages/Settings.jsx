import React, { useState } from 'react';
import { Bell, Moon, RefreshCw, Shield, User, Globe } from 'lucide-react';
import { useData } from '../context/DataContext';

const SettingSection = ({ title, children }) => (
    <div className="glass-panel p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const Toggle = ({ label, description, checked, onChange, icon: Icon }) => (
    <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/30 transition-colors">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <Icon size={20} />
            </div>
            <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200">{label}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
            </div>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'}`}
        >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${checked ? 'left-7' : 'left-1'}`} />
        </button>
    </div>
);

export default function Settings() {
    const { theme, toggleTheme } = useData();
    const [notifications, setNotifications] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(false);

    return (
        <div className="h-full overflow-y-auto pb-10 max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-1 text-slate-900 dark:text-white">Settings</h2>
                <p className="text-slate-500 dark:text-slate-400">System configuration and preferences.</p>
            </div>

            <SettingSection title="General">
                <Toggle
                    icon={Moon}
                    label="Dark Mode"
                    description="Use dark theme across the application"
                    checked={theme === 'dark'}
                    onChange={(val) => toggleTheme(val ? 'dark' : 'light')}
                />
                <Toggle
                    icon={Globe}
                    label="Language"
                    description="English (US)"
                    checked={true}
                    onChange={() => { }}
                />
            </SettingSection>

            <SettingSection title="Notifications">
                <Toggle
                    icon={Bell}
                    label="Push Notifications"
                    description="Receive alerts for critical maintenance issues"
                    checked={notifications}
                    onChange={setNotifications}
                />
            </SettingSection>

            <SettingSection title="System">
                <Toggle
                    icon={RefreshCw}
                    label="Auto Refresh Data"
                    description="Automatically update dashboard data every minute"
                    checked={autoRefresh}
                    onChange={setAutoRefresh}
                />
                <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700/30 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h4 className="font-medium text-slate-800 dark:text-slate-200">System Version</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">v1.2.0 (Stable)</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-200 transition-colors">
                        Check Updates
                    </button>
                </div>
            </SettingSection>
        </div>
    );
}
