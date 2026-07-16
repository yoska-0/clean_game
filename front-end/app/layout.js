import { Geist, Tajawal } from "next/font/google";
import "./globals.css";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

//import comoponentes
import Footer from "./_componts/Footer";
import NavBar from "./_componts/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const TajawalFont = Tajawal({
  variable: "--font-Tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata = {
  title: "Clean Game",
  description:
    "منصة تساعدك على معرفة مدى توافق الألعاب مع القيم الإسلامية من خلال تقييمات وآراء المجتمع.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${TajawalFont.variable}`}>
        <NavBar></NavBar>
        {children}
        <Footer />
      </body>
    </html>
  );
}
