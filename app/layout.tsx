import Header from "@/components/Header";
import "./globals.css";
import {
  Poppins,
  Public_Sans,
  Playfair_Display,
  Roboto,
} from "next/font/google";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import AuthWrapper from "@/components/AuthWrapper";
import { fetchFooterMenu } from "@/services/footer-menu";
import { fetchSocialLinks } from "@/services/social-link";
import { fetchUsefulLinks } from "@/services/useful-link";

export const metadata = {
  title: "Forests by Heartfulness",
  description:
    "Creating a greener, more sustainable future through forest restoration and conservation",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [footerMenu, socialLinks, usefulLinks] = await Promise.all([
    fetchFooterMenu(),
    fetchSocialLinks(),
    fetchUsefulLinks(),
  ]);

  return (
    <html lang="en" className={publicSans.className}>
      <body>
        <AuthProvider>
          <AuthWrapper>
            <Header />
            {children}
            <Footer
              menuItems={footerMenu.items}
              socialLinks={socialLinks}
              usefulLinks={usefulLinks.items}
            />
          </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
