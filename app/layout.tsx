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
import { fetchGlobal } from "@/services/global";

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
  let footerMenu: any = null;
  let socialLinks: any = null;
  let usefulLinks: any = null;
  let global: any = null;

  try {
    [footerMenu, socialLinks, usefulLinks, global] = await Promise.all([
      fetchFooterMenu(),
      fetchSocialLinks(),
      fetchUsefulLinks(),
      fetchGlobal(),
    ]);
  } catch (err) {
    console.error("Error fetching layout data:", err);
    footerMenu = { items: [] };
    socialLinks = null;
    usefulLinks = { items: [] };
    global = null;
  }

  // Convert simple Markdown links [text](url) to HTML anchor tags for rendering
  const convertMarkdownLinksToHtml = (md: string) => {
    if (!md) return md;
    // don't convert if already contains HTML
    if (md.includes("<a ") || md.includes("<p>")) return md;
    return md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  const copyrightHtml = global?.copyright ? convertMarkdownLinksToHtml(global.copyright) : null;

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
              copyright={copyrightHtml}
            />
          </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
