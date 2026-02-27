import React from 'react';

const GlassCard = ({ children, className = '', glow = false }) => {
    return (
        <div className={`relative group ${className}`}>
            {glow && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-saas-primary to-saas-accent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            )}
            <div className="relative glass-panel rounded-3xl h-full w-full">
                {children}
            </div>
        </div>
    );
};

export default GlassCard;
