"use client";

import * as React from "react";
import Image from "next/image";
import { CustomNavigationMenu } from "./ui/navigation-menu";
import { MobileNavigation } from "./ui/mobile-navigation";
import Link from "next/link";
import { LogOut, TriangleAlert, User, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import CurrencySelect from "./CurrencySelect";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
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
import { fetchGlobal } from "@/services/global";
import { GlobalContent } from "@/types/global";

export default function Header() {
  const { isAuthenticated, userProfile, isLoading, login, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [showSignOutAlert, setShowSignOutAlert] = React.useState(false);
  const [globalData, setGlobalData] = React.useState<GlobalContent | null>(null);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Ensure component is hydrated before rendering auth-dependent content
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch global data for default attribute
  React.useEffect(() => {
    fetchGlobal().then((data) => {
      if (data) setGlobalData(data);
    });
  }, []);

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
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Species",
      href: "/species",
    },
    {
      label: "About us",
      href: "/about-us",
      sub: [{ label: "Our Team", href: "/team" }],
    },
    {
      label: "Contact Us",
      href: "/contact-us",
    },
  ];

  if (pathname === "/admin/login") return null;

  // During loading but after hydration, still render the header with content
  // Only show loading skeleton during the initial SSR phase
  if (isLoading && !isHydrated) {
    return (
      <header className={`sticky top-0 left-0 w-full z-50 bg-[#FFFFFF] backdrop-blur-md shadow-sm h-16 ${isAdminRoute ? "max-md:hidden" : ""}`}>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-8">
          <div className="xl:max-w-[150px] xl:w-full">
            <Link href="/" className="w-fit">
              <Image
                src="/images/logo3.svg"
                alt="logo"
                width={57.3}
                height={46}
                priority
                className="min-w-[57.3px] min-h-[46px]"
              />
            </Link>
          </div>
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className={`sticky top-0 left-0 w-full z-50 bg-[#FFFFFF] backdrop-blur-md shadow-sm h-15 ${isAdminRoute ? "max-md:hidden" : ""}`}>
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <div className="xl:max-w-[150px] xl:w-full">
          <Link href="/" className="w-fit">
            <Image
              src="/images/logo3.svg"
              alt="logo"
              width={57.3}
              height={46}
              priority
              className="min-w-[57.3px] min-h-[46px]"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        {!isAdminRoute && (
          <CustomNavigationMenu navigationItems={navigationItems} />
        )}
        <div className="max-md:hidden flex items-center gap-3">
          {!isAdminRoute && (
            <>
              <Suspense fallback={null}>
                <LightBox
                  preSelectedAttribute={globalData?.default_attribute || null}
                  co2Sequestration={globalData?.co2_sequestation}
                />
              </Suspense>
              <Suspense fallback={null}>
                <CurrencySelect
                  className="h-9 w-[88.88px] gap-1 rounded-[5px]"
                  className2="px-1.5 gap-1"
                />
              </Suspense>

            </>
          )}
          {/* Authentication Section */}
          <div className="max-md:hidden relative" ref={dropdownRef}>
            {isAuthenticated ? (
              isAdminRoute ? (
                <div className="flex items-center gap-2">
                  <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden bg-gray-200 border border-gray-100">
                    {userProfile?.picture ? (
                      <Image
                        src={userProfile.picture}
                        alt={userProfile.name || "User profile picture"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setShowSignOutAlert(true)}
                    className="text-[#F04438] font-semibold hover:opacity-80 transition-opacity"
                    style={{ fontFamily: "Public Sans" }}
                  >
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <>
                  {/* User Avatar Button */}
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="relative flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors overflow-hidden h-[37px] w-[37px] rounded-full"
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
                        width: "219px",
                        marginTop: "5px",
                        border: "1px solid #E4E4E4",
                        boxShadow: "0px 21px 40px 0px #31313133",
                      }}
                    >
                      {/* User Info Section - Horizontal Layout */}
                      <Link
                        href="/account"
                        className="hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 px-4 my-4"
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
                        <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
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
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <p
                            className="truncate"
                            style={{
                              fontFamily: "Public Sans",
                              fontWeight: 700,
                              fontSize: "14px",
                              lineHeight: "22px",
                              letterSpacing: "0px",
                              color: "#090C0F",
                            }}
                          >
                            {userProfile?.firstName} {userProfile?.lastName}
                          </p>
                          <p
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
                          </p>
                        </div>
                      </Link>

                      {/* Menu Items */}
                      <div className="flex flex-col">
                        <Link
                          href="/account"
                          className="block px-4 py-2 hover:bg-[#E6EBF5] transition-colors border-y border-[#E4E4E4]"
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "24px",
                            letterSpacing: "0px",
                            color: "#090C0F",
                          }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <a
                          href="https://my.heartfulness.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 hover:bg-[#E6EBF5] transition-colors border-b border-[#E4E4E4]"
                          style={{
                            fontFamily: "Public Sans",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "24px",
                            letterSpacing: "0px",
                            color: "#090C0F",
                          }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          My Account
                        </a>
                        <div>
                          <button
                            onClick={() => setShowSignOutAlert(true)}
                            className="flex items-center gap-2 w-full py-2 px-4 transition-colors"
                            style={{
                              fontFamily: "Public Sans",
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "22px",
                              letterSpacing: "0px",
                              color: "#F04438",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#E6EBF5")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                          >
                            <span>SIGN OUT</span>
                            <LogOut
                              strokeWidth="2.5px"
                              className="w-4 h-4"
                              style={{ color: "#F04438" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )
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
          <AlertDialogContent className="md:min-w-[533px] md:h-[204px] max-md:p-4 rounded-[16px] md:pb-5">
            <AlertDialogHeader>
              <AlertDialogTitle
                className="flex items-center justify-between
              uppercase font-bold text-base md:text-2xl mb-2 md:mb-5"
              >
                <div className="flex items-center gap-2 md:gap-4 text-[#232D26]">
                  <TriangleAlert
                    strokeWidth="1.5px"
                    className="text-[#F78F08] md:w-8 md:h-8 w-6 h-6"
                  />
                  Confirmation
                </div>
                <button
                  onClick={() => setShowSignOutAlert(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <X
                    size={24}
                    strokeWidth="1.5px"
                    className="text-black max-md:text-lg"
                  />
                </button>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[#090C0F] md:text-xl text-lg text-start">
                Are you sure you want to sign out?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="md:gap-4 gap-3">
              <AlertDialogAction
                onClick={() => {
                  setDropdownOpen(false);
                  logout({ redirect: true, targetPath: "/" });
                }}
                className="bg-[#003399] hover:bg-[#032d80] h-9 md:h-12 md:w-[146px] rounded-[8px] font-bold text-sm md:text-base leading-6.5 uppercase"
              >
                Sign Out
              </AlertDialogAction>
              <AlertDialogCancel
                onClick={() => setDropdownOpen(false)}
                className="h-9 md:h-12 md:w-[146px] rounded-[8px] font-bold text-sm md:text-base leading-6.5 uppercase border-[#B7B9BB]"
              >
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
          defaultAttribute={globalData?.default_attribute || null}
          co2Sequestration={globalData?.co2_sequestation}
        />
      </div>
    </header>
  );
}
