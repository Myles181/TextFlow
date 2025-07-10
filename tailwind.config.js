/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary Brand Colors (trust & navigation)
        ocean: {
          50: '#eff6ff',
          100: '#dbeafe', 
          500: '#3b82f6',
          900: '#1e3a8a'
        },
        // Success/Achievement Colors
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          900: '#064e3b'
        },
        // Energy/Action Colors  
        energy: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#ff6b35', 
          900: '#c2410c'
        },
        // Neutral System
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          400: '#9ca3af',
          600: '#6b7280', 
          800: '#374151',
          900: '#111827'
        }
      },
      spacing: {
        // 8px grid system
        '18': '4.5rem', // 72px
        '22': '5.5rem'  // 88px  
      }
    },
  },
  plugins: [],
} 