/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void:     '#FFFFFF',
        deep:     '#F8FAFC',
        graphite: '#F1F5F9',
        surface:  '#E2E8F0',
        rail:     '#CBD5E1',
        border:   'rgba(99, 102, 241, 0.08)',
        plasma:   '#4F46E5', // Indigo elegante
        cyan:     '#7C3AED', // Violeta/Púrpura vibrante
        violet:   '#7C3AED',
        ghost:    '#0F172A', // Texto oscuro premium
        silver:   '#1E293B',
        muted:    '#475569', // Texto secundario
        dim:      '#64748B',
        emerald:  '#10B981', // Verde esmeralda
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        sans:    ['"Kumbh Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"Kumbh Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.8rem, 6.5vw, 6.8rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl':  ['clamp(2rem,   4.5vw, 4.8rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-lg':  ['clamp(1.75rem,3.2vw,3.6rem)',  { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md':  ['clamp(1.25rem,2.2vw,2.2rem)', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}
