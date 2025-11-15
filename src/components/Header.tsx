"use client";

import * as React from "react";
import Image from "next/image";
import { CustomNavigationMenu } from "./ui/navigation-menu";
import { MobileNavigation } from "./ui/mobile-navigation";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const { isAuthenticated, userProfile, isLoading, login, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const navigationItems = [
    {
      label: "About",
      sub: [
        { label: "Our Mission & Vision", href: "/about/mission-vision" },
        { label: "Meet The Team", href: "/about/team" },
        { label: "FAQs", href: "/about/faqs" },
      ],
    },
    {
      label: "How it works",
      sub: [
        { label: "Process", href: "/how-it-works/process" },
        { label: "Keystone Projects", href: "/how-it-works/keystone-projects" },
        { label: "Project Archetypes", href: "/how-it-works/archetypes" },
      ],
    },
    {
      label: "Projects",
      sub: [
        { label: "All Projects", href: "/projects" },
        { label: "Featured", href: "/projects/featured" },
        { label: "Completed", href: "/projects/completed" },
      ],
    },
    {
      label: "Species",
      sub: [
        { label: "Tree Species", href: "/species" },
        { label: "Plant Database", href: "/species/database" },
      ],
    },
    {
      label: "Get involved",
      sub: [
        { label: "Volunteer", href: "/get-involved/volunteer" },
        { label: "Partner With Us", href: "/get-involved/partner" },
        { label: "Events", href: "/get-involved/events" },
      ],
    },
    {
      label: "Plant for a cause",
      sub: [
        { label: "Donate", href: "/cause/donate" },
        { label: "Corporate Gifting", href: "/cause/corporate-gifting" },
      ],
    },
  ];

  if (isLoading) {
    return (
      <header className="sticky top-0 left-0 w-full z-50 bg-[#FFFFFF] backdrop-blur-md shadow-sm h-16">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-8">
          <div className="xl:max-w-[150px] xl:w-full">
            <Link href="/" className="w-fit">
              <Image
                src="/images/logo3.svg"
                alt="logo"
                width={57}
                height={46}
                priority
                className="min-w-[57px]"
              />
            </Link>
          </div>
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#FFFFFF] backdrop-blur-md shadow-sm h-16">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <div className="xl:max-w-[150px] xl:w-full">
          <Link href="/" className="w-fit">
            <Image
              src="/images/logo3.svg"
              alt="logo"
              width={57}
              height={46}
              priority
              className="min-w-[57px]"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <CustomNavigationMenu navigationItems={navigationItems} />

        {/* Authentication Section */}
        <div className="max-md:hidden relative" ref={dropdownRef}>
          {isAuthenticated ? (
            <>
              {/* User Avatar Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '250px'
                }}
                className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors overflow-hidden"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 top-full bg-white z-50"
                  style={{
                    width: '200px',
                    height: '235px',
                    marginTop: '5px',
                    paddingTop: '16px',
                    paddingBottom: '8px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    border: '1px solid #E4E4E4',
                    boxShadow: '0px 21px 40px 0px #31313133',
                    borderRadius: '0px'
                  }}
                >
                  {/* User Info Section - Horizontal Layout */}
                  <div className="flex items-center gap-3 pb-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span
                        className="font-semibold truncate"
                        style={{
                          fontFamily: 'Public Sans',
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '22px',
                          letterSpacing: '0px',
                          color: '#454950'
                        }}
                      >
                        {userProfile?.firstName} {userProfile?.lastName}
                      </span>
                      <span
                        className="truncate"
                        style={{
                          fontFamily: 'Public Sans',
                          fontWeight: 600,
                          fontSize: '12px',
                          lineHeight: '18px',
                          letterSpacing: '0px',
                          color: '#94979A'
                        }}
                        title={userProfile?.email}
                      >
                        {userProfile?.email}
                      </span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-2 py-3">
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                      style={{
                        fontFamily: 'Public Sans',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '0px',
                        color: '#454950'
                      }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/my-trees"
                      className="block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                      style={{
                        fontFamily: 'Public Sans',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '0px',
                        color: '#454950'
                      }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Trees
                    </Link>

                  {/* Sign Out Button */}
                  <div style={{ marginLeft: '-16px', marginRight: '-16px' }}>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2 w-full py-2 transition-colors"
                      style={{
                        fontFamily: 'Public Sans',
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '22px',
                        letterSpacing: '0px',
                        color: '#F04438',
                        paddingLeft: '28px',
                        paddingRight: '16px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E6EBF5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span>Sign Out</span>
                      <LogOut className="w-4 h-4" style={{ color: '#F04438' }} />
                    </button>
                  </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={login}
              className="text-xs font-bold px-[10px] py-3 hover:bg-[#E6EBF5] bg-white transition-colors"
            >
              SIGN IN
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          navigationItems={navigationItems}
          isAuthenticated={isAuthenticated}
          userProfile={userProfile}
          login={login}
          logout={logout}
        />
      </div>
    </header>
  );
}
