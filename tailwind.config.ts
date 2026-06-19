import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
    },
    extend: {
      colors: {
        // Primary: Teal (로고 메인 컬러)
        primary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14919B",  // 로고 메인 틸
          600: "#0D7377",  // 로고 진한 틸
          700: "#0A5C5F",
          800: "#084547",
          900: "#063131",
          950: "#042121",
        },
        // Secondary: Cyan (로고 밝은 시안)
        secondary: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#5DD9E3",  // 로고 밝은 시안
          500: "#40C4CE",  // 로고 시안
          600: "#2BA8B3",
          700: "#1F8A94",
          800: "#176C75",
          900: "#115156",
          950: "#0B3538",
        },
        // Accent: Silver Gray (로고 실버)
        accent: {
          50: "#f8fafa",
          100: "#f0f4f4",
          200: "#e0e6e7",
          300: "#c8d2d4",
          400: "#B8C4C6",  // 로고 밝은 실버
          500: "#8B9A9C",  // 로고 실버
          600: "#6B7A7C",
          700: "#525E60",
          800: "#3C4546",
          900: "#2A3032",
          950: "#1A1F20",
        },
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      animation: {
        vote: "vote 1s ease-in-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        typewriter: "typewriter 2s steps(40) 1s forwards",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        vote: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-30deg)" },
          "75%": { transform: "rotate(30deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(20, 145, 155, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(20, 145, 155, 0.8), 0 0 60px rgba(64, 196, 206, 0.4)",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            backgroundSize: "400% 400%",
            backgroundPosition: "center top",
          },
          "50%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "left center",
          },
          "50%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            backgroundSize: "400% 400%",
            backgroundPosition: "left center",
          },
          "50%": {
            backgroundSize: "200% 200%",
            backgroundPosition: "right center",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "currentColor" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #042121 0%, #063131 50%, #0D7377 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(20, 145, 155, 0.1) 0%, rgba(64, 196, 206, 0.1) 100%)",
        "glow-gradient": "linear-gradient(90deg, #14919B, #40C4CE, #5DD9E3, #14919B)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(20, 145, 155, 0.5)",
        "glow-lg": "0 0 40px rgba(20, 145, 155, 0.5), 0 0 80px rgba(64, 196, 206, 0.3)",
        "glow-accent": "0 0 20px rgba(139, 154, 156, 0.5)",
        "card-dark": "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
