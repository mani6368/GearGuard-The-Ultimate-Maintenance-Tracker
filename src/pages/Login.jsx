import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
    const { login, authError } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(formData.email, formData.password);
        if (success) {
            navigate('/'); // Redirect to Dashboard/Home on success
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-950 -z-20" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-800/50 w-full max-w-md p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 text-sm">Sign in to access your GearGuard portal.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {authError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-center gap-2 text-sm">
                            <AlertCircle size={16} />
                            {authError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Email ID</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                            placeholder="user@gearguard.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2 group"
                    >
                        <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                        Sign In
                    </button>

                    <div className="flex items-center justify-center gap-4 text-sm mt-6">
                        <button type="button" className="text-slate-400 hover:text-white transition-colors">
                            Forgot Password?
                        </button>
                        <span className="text-slate-600">|</span>
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="pt-6 border-t border-slate-800/50">
                        <button
                            type="button"
                            onClick={() => login('admin@gearguard.com', 'Password@123') && navigate('/')}
                            className="hover:scale-[1.02] active:scale-[0.98] w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            🚀 Quick Demo Login (Admin)
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
