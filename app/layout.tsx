import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Organize suas tarefas em: A Fazer, Em Andamento e Concluídas.",
  icons: {
    icon: "/bosch_symbol_logo_black_2.svg"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={sans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
