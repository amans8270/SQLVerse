import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Zap } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-50 glass-panel border-t-0 border-x-0 rounded-none bg-saas-900/60 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="p-2 bg-gradient-to-br from-saas-primary to-saas-accent rounded-xl group-hover:scale-110 transition-transform">
                                <Database className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                SQL<span className="text-saas-primary">Verse</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {location.pathname !== '/connect' && location.pathname !== '/dashboard' && (
                            <Link
                                to="/connect"
                                className="glass-button px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center space-x-2 text-sm font-medium text-white shadow-lg shadow-saas-primary/20 hover:shadow-saas-primary/40"
                            >
                                <span>Connect DB</span>
                                <Zap className="w-4 h-4 text-saas-accent ml-1" />
                            </Link>
                        )}
                        {location.pathname === '/dashboard' && (
                            <Link
                                to="/connect"
                                className="px-4 py-2 rounded-lg border border-saas-border hover:bg-saas-800 transition-colors flex items-center space-x-2 text-sm font-medium text-saas-textMuted hover:text-white"
                            >
                                <span className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-saas-success mr-2 animate-pulse"></div>
                                    Connected
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
