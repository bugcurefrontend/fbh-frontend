"use client";

import * as React from "react";
import Image from "next/image";
import { CustomNavigationMenu } from "./ui/navigation-menu";
import { MobileNavigation } from "./ui/mobile-navigation";
import Link from "next/link";
import { LogOut, TriangleAlert, User, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import CurrencySelect from "./CurrencySelect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LightBox from "./light-box/LightBox";

export default function Header() {
  const { isAuthenticated, userProfile, isLoading, login, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [showSignOutAlert, setShowSignOutAlert] = React.useState(false);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        // Do not close if clicking inside an open alert dialog
        !(event.target as HTMLElement).closest('[role="alertdialog"]')
      ) {
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
      label: "Project",
      href: "/projects",
    },
    {
      label: "Species",
      href: "/species",
    },
    {
      label: "About",
      sub: [
        { label: "About us", href: "/about-us" },
        { label: "Our Team", href: "/team" },
      ],
    },
    {
      label: "Contact Us",
      href: "/contact-us",
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
        <div className="max-md:hidden flex items-center gap-3">
          <LightBox />
          <CurrencySelect />
          {/* Authentication Section */}
          <div className="max-md:hidden relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                {/* User Avatar Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "250px",
                  }}
                  className="relative flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors overflow-hidden"
                >
                  {userProfile?.picture ? (
                    <Image
                      src={userProfile.picture}
                      alt={userProfile.name || "User profile picture"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 top-full bg-white z-50"
                    style={{
                      width: "200px",
                      height: "220px",
                      marginTop: "5px",
                      paddingTop: "16px",
                      paddingBottom: "8px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      border: "1px solid #E4E4E4",
                      boxShadow: "0px 21px 40px 0px #31313133",
                      borderRadius: "0px",
                    }}
                  >
                    {/* User Info Section - Horizontal Layout */}
                    <Link
                      href="/account"
                      className="hover:bg-gray-50 rounded-md transition-colors flex items-center justify-center gap-2"
                      style={{
                        fontFamily: "Public Sans",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "0px",
                        color: "#454950",
                      }}
                      onClick={() => setDropdownOpen(false)}
                      // className="flex items-center gap-3 pb-3"
                    >
                      <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {userProfile?.picture ? (
                          <Image
                            src={userProfile.picture}
                            alt={userProfile.name || "User profile picture"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span
                          className="font-semibold truncate"
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "22px",
                            letterSpacing: "0px",
                            color: "#454950",
                          }}
                        >
                          {userProfile?.firstName} {userProfile?.lastName}
                        </span>
                        <span
                          className="truncate"
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: 600,
                            fontSize: "12px",
                            lineHeight: "18px",
                            letterSpacing: "0px",
                            color: "#94979A",
                          }}
                          title={userProfile?.email}
                        >
                          {userProfile?.email}
                        </span>
                      </div>
                    </Link>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-2 py-3">
                      <Link
                        href="/account"
                        className="block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                        style={{
                          fontFamily: "Public Sans",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "24px",
                          letterSpacing: "0px",
                          color: "#454950",
                        }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/my-trees"
                        className="block px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
                        style={{
                          fontFamily: "Public Sans",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "24px",
                          letterSpacing: "0px",
                          color: "#454950",
                        }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Trees
                      </Link>

                      {/* Sign Out Button */}
                      <div
                        style={{ marginLeft: "-16px", marginRight: "-16px" }}
                      >
                        <button
                          onClick={() => setShowSignOutAlert(true)}
                          className="flex items-center gap-2 w-full py-2 transition-colors"
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "22px",
                            letterSpacing: "0px",
                            color: "#F04438",
                            paddingLeft: "28px",
                            paddingRight: "16px",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#E6EBF5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          <span>Sign Out</span>
                          <LogOut
                            className="w-4 h-4"
                            style={{ color: "#F04438" }}
                          />
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
        </div>
        <AlertDialog open={showSignOutAlert} onOpenChange={setShowSignOutAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle
                className="flex items-center justify-between
              uppercase font-bold text-2xl mb-6"
              >
                <div className="flex items-center gap-2">
                  <TriangleAlert className="text-yellow-600 w-5 h-5" />
                  Confirmation
                </div>
                <button
                  onClick={() => setShowSignOutAlert(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <X size={20} className="text-black" />
                </button>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-black">
                Are you sure you want to sign out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setDropdownOpen(false);
                  logout({ redirect: true, targetPath: "/" });
                }}
                className="bg-[#003399] hover:bg-[#032d80]"
              >
                Sign Out
              </AlertDialogAction>
              <AlertDialogCancel onClick={() => setDropdownOpen(false)}>
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Mobile Navigation */}
        <MobileNavigation
          navigationItems={navigationItems}
          isAuthenticated={isAuthenticated}
          userProfile={userProfile}
          login={login}
          onSignOut={() => setShowSignOutAlert(true)}
        />
      </div>
    </header>
  );
}
