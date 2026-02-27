import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles, Table2, Key } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { SQLVerseAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: 'Hello! I am connected to your database. What would you like to know?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const connectionId = localStorage.getItem("sqlverse_connection_id");

    useEffect(() => {
        if (!connectionId) {
            navigate('/connect');
        }
    }, [connectionId, navigate]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || !connectionId) return;

        const newMsg = {
            id: messages.length + 1,
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await SQLVerseAPI.queryDatabase(connectionId, newMsg.content);

            const responseMsg = {
                id: messages.length + 2,
                role: 'assistant',
                content: response.answer,
                sql: response.sql,
                data: response.data,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, responseMsg]);
        } catch (error) {
            const errorMsg = {
                id: messages.length + 2,
                role: 'assistant',
                content: `I encountered an error executing your query: ${error.message}`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen pt-16 flex flex-col bg-[#0B0F19] overflow-hidden">

            {/* Dynamic Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-saas-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-saas-accent/10 rounded-full blur-[120px] pointer-events-none" />

            <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 relative z-10 h-full">

                {/* Connection Status Bar */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-saas-textMuted bg-saas-800/50 py-2 px-4 rounded-lg border border-white/5">
                        <Key className="w-4 h-4 text-saas-accent" />
                        <span>Connected <strong className="text-white font-mono bg-white/10 px-1 rounded truncate max-w-[150px] inline-block align-bottom">{connectionId}</strong></span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-saas-success animate-pulse" />
                        <span className="text-saas-textMuted">System Online</span>
                    </div>
                </div>

                {/* Chat Area */}
                <GlassCard className="flex-1 flex flex-col mb-4 overflow-hidden border-white/5 shadow-2xl">

                    {/* Messages Scroll View */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fade-in-up_0.3s_ease-out]`}
                            >
                                <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                    {/* Avatar */}
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-saas-primary to-blue-600 ml-3'
                                        : 'bg-gradient-to-br from-purple-500 to-saas-accent mr-3'
                                        }`}>
                                        {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-5 py-3.5 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-saas-primary text-white rounded-tr-sm shadow-[0_4px_20px_-5px_rgba(59,130,246,0.3)]'
                                            : 'bg-saas-800/80 border border-white/5 text-saas-text rounded-tl-sm'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                        </div>

                                        {/* SQL & Result Data (if AI) */}
                                        {msg.sql && (
                                            <div className="mt-3 w-full animate-[fade-in_0.5s_ease-out_0.2s_both]">
                                                <div className="bg-[#0f1423] border border-white/5 rounded-xl overflow-hidden">
                                                    <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
                                                        <span className="text-xs font-mono text-saas-textMuted flex items-center"><Sparkles className="w-3 h-3 mr-1 text-saas-accent" /> Generated SQL</span>
                                                    </div>
                                                    <pre className="p-4 text-sm font-mono text-blue-300 overflow-x-auto">
                                                        {msg.sql}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}

                                        {msg.data && (
                                            <div className="mt-3 w-full animate-[fade-in_0.5s_ease-out_0.4s_both]">
                                                <div className="bg-saas-800/50 border border-white/5 rounded-xl overflow-hidden">
                                                    <div className="flex items-center px-4 py-2 bg-black/20 border-b border-white/5">
                                                        <Table2 className="w-3.5 h-3.5 text-emerald-400 mr-2" />
                                                        <span className="text-xs font-semibold text-saas-textMuted">Query Results</span>
                                                    </div>
                                                    <div className="overflow-x-auto">
                                                        <table className="w-full text-sm text-left">
                                                            <thead className="text-xs text-saas-textMuted uppercase bg-black/20">
                                                                <tr>
                                                                    {Object.keys(msg.data[0]).map(key => (
                                                                        <th key={key} className="px-4 py-3 font-medium">{key}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {msg.data.map((row, i) => (
                                                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                                        {Object.values(row).map((val, j) => (
                                                                            <td key={j} className="px-4 py-3 text-saas-text">{val}</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Loading / Thinking Indicator */}
                        {isLoading && (
                            <div className="flex justify-start animate-[fade-in-up_0.3s_ease-out]">
                                <div className="flex flex-row max-w-[85%]">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-saas-accent mr-3 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="px-5 py-4 rounded-2xl bg-saas-800/80 border border-white/5 text-saas-text rounded-tl-sm flex items-center space-x-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-saas-accent" />
                                        <span className="text-sm text-saas-textMuted animate-pulse">Translating to SQL...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-saas-900/80 backdrop-blur-md border-t border-white/5">
                        <form onSubmit={handleSubmit} className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask your database anything... e.g., 'Show me the top 5 active users'"
                                className="w-full bg-saas-800/50 border border-saas-border rounded-2xl py-4 pl-5 pr-14 text-white placeholder-saas-textMuted focus:outline-none focus:ring-2 focus:ring-saas-primary/50 focus:border-saas-primary transition-all shadow-inner"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 p-2.5 bg-saas-primary hover:bg-saas-primaryHover text-white rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-saas-primary"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                        <div className="text-center mt-2">
                            <span className="text-[10px] text-saas-textMuted">SQLVerse AI can make mistakes. Verify critical queries.</span>
                        </div>
                    </div>
                </GlassCard>
            </main>
        </div>
    );
};

export default Dashboard;
