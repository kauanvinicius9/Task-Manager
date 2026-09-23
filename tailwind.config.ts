import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  
  // Cores definidas
  theme: {
    extend: {
      colors: {
        canvas: "#E8EDF1",
        ink: "#16202A",
        muted: "#55646F",
        line: "#CBD5DD",
        
        bg: "FFFFFF",
        title: "#000000",
        area: "#F4F4F5",
        areas_hover: "#E4E4E7",
        placeholder: "#A1A1AA",
        dropdown_hover: "#3F3F46",
        subtitle: "#52525B",
        dropdown_text: "#FAFAFA",


        todo: "#9E2896",
        doing: "#007BC0",
        done: "#18837E",

        bg_low_badge: "#E2F5E7",
        bg_medium_badge: "#FFEFD1",
        bg_high_badge: "#FFECEC",

        text_low_badge: "#5EBD82",
        text_medium_badge: "#CDA600",
        text_high_badge: "#FF8787",

        bg_error_toast: "#FFC6C6",
        bg_alert_toast: "#FFDF95",
        bg_success_toast: "#B8EFC9",

        primary_button: "#0284C7",
        primary_button_hover: "#0369A1",

        secondary_button: "#0284C7",
        secondary_button_hover: "#E0F2FE",
      },
    },
  },
  plugins: [],
};
export default config;
