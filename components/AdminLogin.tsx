import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
    onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check credentials
        if (username === 'Admin180' && password === 'oneeightyhub2025') {
            setError('');
            onLogin();
        } else {
            setError('Invalid username or password');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-brand-lime/10 rounded-full mb-4">
                        <Lock className="w-12 h-12 text-brand-lime" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-white uppercase mb-2">Admin Access</h1>
                    <p className="text-gray-400">Enter your credentials to continue</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="bg-brand-charcoal border border-white/10 rounded-lg p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Username Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/50 border border-white/20 rounded pl-12 pr-4 py-3 text-white focus:border-brand-lime outline-none transition-colors"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/20 rounded pl-12 pr-12 py-3 text-white focus:border-brand-lime outline-none transition-colors"
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-brand-lime text-black py-3 rounded font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer Note */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    Authorized personnel only
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
