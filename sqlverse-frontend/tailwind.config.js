/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saas: {
          900: '#0B0F19',
          800: '#111827',
          700: '#1F2937',
          border: '#374151',
          primary: '#3B82F6',
          primaryHover: '#2563EB',
          accent: '#8B5CF6',
          success: '#10B981',
          text: '#F9FAFB',
          textMuted: '#9CA3AF'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
      },
      backdropBlur: {
        xs: "2px",
        md: "8px",
        lg: "12px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        'float-delayed': "float 6s ease-in-out 3s infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        }
      },
    },
  },
  plugins: [],
};