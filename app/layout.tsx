import Header from "@/components/Header";
import "./globals.css";
import {
  Poppins,
  Public_Sans,
  Playfair_Display,
  Roboto,
} from "next/font/google";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Forests by Heartfulness",
  description:
    "Creating a greener, more sustainable future through forest restoration and conservation",
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={publicSans.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
