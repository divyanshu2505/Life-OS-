import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
});

export const metadata = {
  title: "LifeOS AI | The All-in-One AI Super App",
  description:
    "One App to Learn, Earn, and Save Time. Your AI-powered life assistant."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} bg-background font-sans text-white overflow-x-hidden`}
        style={{
          fontFamily: "var(--font-inter)"
        }}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
