/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0a0a0f",
        primary: "#8b5cf6",
        secondary: "#3b82f6",
        accent: "#ec4899",
        neon: {
          purple: "#9d4edd",
          blue: "#00bbf9",
          pink: "#f15bb5"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-dark": "radial-gradient(circle at top left, rgba(139, 92, 246, 0.15), transparent 30%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.15), transparent 30%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        neon: "0 0 15px rgba(139, 92, 246, 0.5)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(139, 92, 246, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" }
        }
      }
    }
  },
  plugins: []
};
