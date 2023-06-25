import "./globals.css";
import AnalyticsScripts from "./components/helpers/AnalyticsScripts";
import { Merriweather, Lora } from "next/font/google";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AnalyticsScripts />
      <body className={merriweather.className}>{children}</body>
    </html>
  );
}
