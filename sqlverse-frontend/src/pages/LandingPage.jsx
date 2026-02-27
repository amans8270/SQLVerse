import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Database, Zap, Sparkles, MoveRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hero-glow rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none" />

            {/* Hero Section */}
            <div className="relative z-10 max-w-5xl w-full text-center mt-16 mb-24">
                <div className="inline-flex items-center space-x-2 glass-panel px-4 py-2 rounded-full mb-8 opacity-0 animate-[fade-in_1s_ease-out_forwards]">
                    <Sparkles className="w-4 h-4 text-saas-accent" />
                    <span className="text-sm font-medium text-saas-textMuted">Introducing SQLVerse AI</span>
                </div>

                <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8">
                    Talk to Your Database <br />
                    <span className="text-gradient">in Plain English.</span>
                </h1>

                <p className="text-xl text-saas-textMuted max-w-2xl mx-auto mb-10 leading-relaxed">
                    Stop writing complex SQL queries. Just ask your database questions naturally, and let our AI handle the rest. Instantly connect to Postgres, MySQL, or SQLite.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-20">
                    <Link
                        to="/connect"
                        className="group relative px-8 py-4 bg-saas-primary hover:bg-saas-primaryHover text-white rounded-2xl font-semibold shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all flex items-center space-x-2 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10">Get Started</span>
                        <MoveRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button className="px-8 py-4 glass-panel rounded-2xl font-semibold text-white hover:bg-white/5 transition-colors">
                        View Live Demo
                    </button>
                </div>
            </div>

            {/* Feature Cards Showcase */}
            <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <div className="animate-float">
                    <GlassCard className="p-8" glow={true}>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6">
                            <Database className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Instant Connection</h3>
                        <p className="text-saas-textMuted leading-relaxed">Securely connect to your existing databases without moving your data. We support major SQL dialects.</p>
                    </GlassCard>
                </div>

                <div className="animate-float-delayed">
                    <GlassCard className="p-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6">
                            <Bot className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">AI-Powered Queries</h3>
                        <p className="text-saas-textMuted leading-relaxed">Our specialized LLM translates your natural language directly into optimized, indexing-aware SQL.</p>
                    </GlassCard>
                </div>

                <div className="animate-float">
                    <GlassCard className="p-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-6">
                            <Zap className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Blazing Fast</h3>
                        <p className="text-saas-textMuted leading-relaxed">Get results instantly. Responses are streamlined and cached for optimal performance.</p>
                    </GlassCard>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;
