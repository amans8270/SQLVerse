import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Lock, Server, ShieldCheck } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ConnectionPage = () => {
    const navigate = useNavigate();
    const [dbType, setDbType] = useState('postgres');
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnect = (e) => {
        e.preventDefault();
        setIsConnecting(true);
        // Simulate connection delay
        setTimeout(() => {
            setIsConnecting(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center relative">

            {/* Background accents */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saas-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-saas-accent/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10 z-10 animate-[fade-in_0.5s_ease-out]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Connect Database</h2>
                    <p className="text-saas-textMuted">Securely link your SQL database to start chatting.</p>
                </div>

                <GlassCard className="p-8" glow={true}>
                    <form onSubmit={handleConnect} className="space-y-6">

                        {/* Database Engine Selection */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {['postgres', 'mysql', 'sqlite'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setDbType(type)}
                                    className={`py-3 px-2 rounded-xl border text-sm font-medium capitalize transition-all ${dbType === type
                                        ? 'bg-saas-primary/20 border-saas-primary text-white shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]'
                                        : 'bg-saas-900/50 border-white/5 text-saas-textMuted hover:border-white/10 hover:text-white'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* Connection Fields */}
                        {dbType !== 'sqlite' && (
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-saas-textMuted ml-1">Host URL</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Server className="h-4 w-4 text-saas-textMuted" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full pl-10 pr-3 py-3 border border-saas-border rounded-xl bg-saas-900/50 text-white placeholder-saas-border focus:outline-none focus:ring-2 focus:ring-saas-primary focus:border-transparent transition-all"
                                            placeholder="db.example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-saas-textMuted ml-1">Port</label>
                                        <input
                                            type="text"
                                            className="block w-full px-3 py-3 border border-saas-border rounded-xl bg-saas-900/50 text-white focus:outline-none focus:ring-2 focus:ring-saas-primary transition-all"
                                            placeholder={dbType === 'postgres' ? '5432' : '3306'}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-saas-textMuted ml-1">Database</label>
                                        <input
                                            type="text"
                                            className="block w-full px-3 py-3 border border-saas-border rounded-xl bg-saas-900/50 text-white focus:outline-none focus:ring-2 focus:ring-saas-primary transition-all"
                                            placeholder="public"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-saas-textMuted ml-1">Username</label>
                                    <input
                                        type="text"
                                        className="block w-full px-3 py-3 border border-saas-border rounded-xl bg-saas-900/50 text-white focus:outline-none focus:ring-2 focus:ring-saas-primary transition-all"
                                        placeholder="admin"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-saas-textMuted ml-1">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-saas-textMuted" />
                                        </div>
                                        <input
                                            type="password"
                                            className="block w-full pl-10 pr-3 py-3 border border-saas-border rounded-xl bg-saas-900/50 text-white focus:outline-none focus:ring-2 focus:ring-saas-primary transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {dbType === 'sqlite' && (
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-saas-textMuted ml-1">Connection String / File Path</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Database className="h-4 w-4 text-saas-textMuted" />
                                        </div>
                                        <input
                                            type="text"
                                            className="block w-full pl-10 pr-3 py-3 border border-saas-border rounded-xl bg-saas-900/50 text-white focus:outline-none focus:ring-2 focus:ring-saas-primary transition-all"
                                            placeholder="file:./dev.db"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isConnecting}
                                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-saas-primary hover:bg-saas-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saas-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                {isConnecting ? (
                                    <span className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                        Connecting...
                                    </span>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                                        <span className="relative z-10">Connect Database</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-saas-textMuted">
                        <ShieldCheck className="w-4 h-4 text-saas-success" />
                        <span>Credentials are NEVER stored. Connection happens locally.</span>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default ConnectionPage;
