// Fallback data for Footer component
import { FooterMenuItem } from "@/types/footer-menu";
import { UsefulLinkItem } from "@/types/useful-link";

export const FALLBACK_USEFUL_LINKS: UsefulLinkItem[] = [
    { label: "Heartfulness Institute", url: "#" },
    { label: "Kanha Shanti Vanam", url: "#" },
    { label: "Daaji.org", url: "#" },
    { label: "Heartfulness Magazine", url: "#" },
    { label: "One Daily Thought", url: "#" },
    { label: "Donate", url: "#" },
];

export const FALLBACK_FOOTER_MENU: FooterMenuItem[] = [
    { label: "About Us", url: "/about" },
    { label: "Contact Us", url: "/contact" },
    { label: "Case Study", url: "/case-studies" },
    { label: "Terms & Conditions", url: "/terms" },
    { label: "Privacy & Policy", url: "/privacy" },
];
