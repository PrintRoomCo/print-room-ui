import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  
  // Enable dark mode with class strategy
  darkMode: ['class', "class"],
  
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			'figma-bg': '#FBFBF6',
  			'figma-button': '#4B4D72',
  			'figma-hover': '#0900FF',
  			'figma-border': '#2C2C2C',
        storefront: {
          blue: '#2B3990',
          cta: '#4B4D72',
          offWhite: '#FBFBF6',
          pill: '#EEE',
          sliderGreen: '#658A6A'
        },
  			primary: {
  				'50': '#f5f3ff',
  				'100': '#ede9fe',
  				'200': '#ddd6fe',
  				'300': '#c4b5fd',
  				'400': '#a78bfa',
  				'500': '#8b5cf6',
  				'600': '#7c3aed',
  				'700': '#6d28d9',
  				'800': '#5b21b6',
  				'900': '#4c1d95',
  				'950': '#2e1065',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f7fee7',
  				'100': '#ecfccb',
  				'200': '#d9f99d',
  				'300': '#bef264',
  				'400': '#a3e635',
  				'500': '#84cc16',
  				'600': '#65a30d',
  				'700': '#4d7c0f',
  				'800': '#3f6212',
  				'900': '#365314',
  				'950': '#1a2e05',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				'50': '#ecfdf5',
  				'100': '#d1fae5',
  				'200': '#a7f3d0',
  				'300': '#6ee7b7',
  				'400': '#34d399',
  				'500': '#10b981',
  				'600': '#059669',
  				'700': '#047857',
  				'800': '#065f46',
  				'900': '#064e3b',
  				'950': '#022c22',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			neutral: {
  				'0': '#ffffff',
  				'50': '#f8fafc',
  				'100': '#f1f5f9',
  				'200': '#e2e8f0',
  				'300': '#cbd5e1',
  				'400': '#94a3b8',
  				'500': '#64748b',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1e293b',
  				'900': '#0f172a',
  				'950': '#020617'
  			},
  			success: {
  				'50': '#ecfdf5',
  				'100': '#d1fae5',
  				'200': '#a7f3d0',
  				'300': '#6ee7b7',
  				'400': '#34d399',
  				'500': '#10b981',
  				'600': '#059669',
  				'700': '#047857',
  				'800': '#065f46',
  				'900': '#064e3b'
  			},
  			warning: {
  				'50': '#fffbeb',
  				'100': '#fef3c7',
  				'200': '#fde68a',
  				'300': '#fcd34d',
  				'400': '#fbbf24',
  				'500': '#f59e0b',
  				'600': '#d97706',
  				'700': '#b45309',
  				'800': '#92400e',
  				'900': '#78350f'
  			},
  			error: {
  				'50': '#fef2f2',
  				'100': '#fee2e2',
  				'200': '#fecaca',
  				'300': '#fca5a5',
  				'400': '#f87171',
  				'500': '#ef4444',
  				'600': '#dc2626',
  				'700': '#b91c1c',
  				'800': '#991b1b',
  				'900': '#7f1d1d'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			none: '0px',
  			sm: 'calc(var(--radius) - 4px)',
  			DEFAULT: '6px',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: '16px',
  			'2xl': '20px',
  			'3xl': '24px',
  			full: '9999px',
  			button: '8px',
  			card: '12px',
  			modal: '27px',
  			pill: '9999px',
        input: '9999px',
        textarea: '10px',
        cta: '40px',
        submit: '50px'
  		},
  		fontSize: {
  			'display-2xl': [
  				'3rem',
  				{
  					lineHeight: '3.75rem',
  					letterSpacing: '-0.02em',
  					fontWeight: '700'
  				}
  			],
  			'display-xl': [
  				'2.5rem',
  				{
  					lineHeight: '3rem',
  					letterSpacing: '-0.02em',
  					fontWeight: '700'
  				}
  			],
  			'display-lg': [
  				'2rem',
  				{
  					lineHeight: '2.5rem',
  					letterSpacing: '-0.02em',
  					fontWeight: '600'
  				}
  			],
  			'display-md': [
  				'1.75rem',
  				{
  					lineHeight: '2.25rem',
  					letterSpacing: '-0.02em',
  					fontWeight: '600'
  				}
  			],
  			'display-sm': [
  				'1.5rem',
  				{
  					lineHeight: '2rem',
  					letterSpacing: '-0.02em',
  					fontWeight: '600'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.875rem',
  					fontWeight: '500'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem',
  					fontWeight: '500'
  				}
  			],
  			md: [
  				'1rem',
  				{
  					lineHeight: '1.5rem',
  					fontWeight: '400'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem',
  					fontWeight: '400'
  				}
  			],
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1.125rem',
  					fontWeight: '400'
  				}
  			]
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-dm-sans)',
  				'DM Sans',
  				'system-ui',
  				'sans-serif'
  			],
  			'dm-sans': [
  				'var(--font-dm-sans)',
  				'DM Sans',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-dm-sans)',
  				'DM Sans',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		spacing: {
  			'1': '0.25rem',
  			'2': '0.5rem',
  			'3': '0.75rem',
  			'4': '1rem',
  			'5': '1.25rem',
  			'6': '1.5rem',
  			'7': '1.75rem',
  			'8': '2rem',
  			'10': '2.5rem',
  			'12': '3rem',
  			'16': '4rem',
  			'20': '5rem',
  			'24': '6rem',
  			'0.5': '0.125rem',
  			'1.5': '0.375rem',
  			'2.5': '0.625rem',
  			'3.5': '0.875rem'
  		},
  		boxShadow: {
  			xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  			xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  			button: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  			'button-hover': '0 4px 8px 0 rgb(0 0 0 / 0.1)',
  			card: '0 2px 4px 0 rgb(0 0 0 / 0.06), 0 1px 2px 0 rgb(0 0 0 / 0.04)',
  			modal: '0 4px 13px 2px rgba(0, 0, 0, 0.1)'
  		},
  		animation: {
  			'fade-in': 'fade-in 0.2s ease-out',
  			'slide-in': 'slide-in 0.3s ease-out',
  			'bounce-in': 'bounce-in 0.4s ease-out',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'slide-in': {
  				'0%': {
  					transform: 'translateY(-10px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			'bounce-in': {
  				'0%': {
  					transform: 'scale(0.9)',
  					opacity: '0'
  				},
  				'50%': {
  					transform: 'scale(1.02)',
  					opacity: '0.8'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
  	}
  },
  
  plugins: [tailwindcssAnimate],
}

export default config 
