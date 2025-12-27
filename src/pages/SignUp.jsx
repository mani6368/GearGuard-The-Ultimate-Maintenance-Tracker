import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserPlus, AlertCircle, Check, X } from 'lucide-react';

export default function SignUp() {
    const { signup, authError, setAuthError } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        upper: false,
        lower: false,
        special: false
    });

    const validatePassword = (pass) => {
        const criteria = {
            length: pass.length > 8,
            upper: /[A-Z]/.test(pass),
            lower: /[a-z]/.test(pass),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
        };
        setPasswordCriteria(criteria);
        return Object.values(criteria).every(Boolean);
    };

    const handlePasswordChange = (e) => {
        const pass = e.target.value;
        setFormData({ ...formData, password: pass });
        validatePassword(pass);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword(formData.password)) {
            setAuthError('Password does not meet requirements');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setAuthError('Passwords do not match');
            return;
        }

        const success = signup(formData.name, formData.email, formData.password);
        if (success) {
            navigate('/'); // Auto login and redirect
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-950 -z-20" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-800/50 w-full max-w-lg p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                        Create Account
                    </h1>
                    <p className="text-slate-400 text-sm">Join the GearGuard portal today.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {authError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-center gap-2 text-sm">
                            <AlertCircle size={16} />
                            {authError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Email ID</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                            placeholder="john@gearguard.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Re-Enter Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Password Strength Indicators */}
                    <div className="bg-slate-900/30 p-3 rounded-xl space-y-2 text-xs">
                        <p className="text-slate-400 font-medium mb-1">Password Requirements:</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className={`flex items-center gap-2 ${passwordCriteria.length ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {passwordCriteria.length ? <Check size={12} /> : <X size={12} />}
                                &gt; 8 Characters
                            </div>
                            <div className={`flex items-center gap-2 ${passwordCriteria.upper ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {passwordCriteria.upper ? <Check size={12} /> : <X size={12} />}
                                Uppercase Letter
                            </div>
                            <div className={`flex items-center gap-2 ${passwordCriteria.lower ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {passwordCriteria.lower ? <Check size={12} /> : <X size={12} />}
                                Lowercase Letter
                            </div>
                            <div className={`flex items-center gap-2 ${passwordCriteria.special ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {passwordCriteria.special ? <Check size={12} /> : <X size={12} />}
                                Special Character
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 group mt-2"
                    >
                        <UserPlus size={20} className="group-hover:translate-x-1 transition-transform" />
                        Sign Up
                    </button>

                    <div className="text-center mt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-slate-400 hover:text-white transition-colors text-sm"
                        >
                            Already have an account? <span className="text-emerald-400 hover:underline">Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
