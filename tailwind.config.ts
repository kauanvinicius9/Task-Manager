import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#E8EDF1",
        ink: "#16202A",
        muted: "#55646F",
        line: "#CBD5DD",
        todo: "#9E2896",
        doing: "#007BC0",
        done: "#18837E",
      },
    },
  },
  plugins: [],
};
export default config;
