"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Material UI
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

// Icons
import { PiList } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

export default function NavBar() {
  const [isLogged, setIsLogged] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navLinks = [
    {
      title: "الصفحة الرئيسية",
      href: "/#home",
    },
    {
      title: "مميزاتنا",
      href: "/#ourFeatures",
    },
    {
      title: "عن الموقع",
      href: "/#aboutUs",
    },
    {
      title: "أدلة",
      href: "/#evidence",
    },
    {
      title: "تبرع لنا",
      href: "/#donate",
    },
  ];

  return (
    <>
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-gray-800 px-5 py-5 text-white">
        {/* Logo */}
        <div>
          <Link href="/" className="text-xl font-bold">
            Clean Game
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 font-arabic md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.title}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {!isLogged ? (
            <>
              <Link href="/signup">
                <Button variant="contained">إنشاء حساب</Button>
              </Link>

              <Link href="/login">
                <Button variant="outlined">تسجيل دخول</Button>
              </Link>
            </>
          ) : (
            <Button variant="outlined" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
          )}
        </div>

        {/* Mobile Button */}
        <IconButton
          aria-label="Open menu"
          className="!text-white md:!hidden"
          onClick={() => setOpenDrawer(true)}
        >
          <PiList size={32} />
        </IconButton>
      </nav>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className="flex h-full w-72 flex-col bg-gray-900 p-5 text-white">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold">Menu</h2>

            <IconButton
              aria-label="Open menu"
              className="!text-white"
              onClick={() => setOpenDrawer(false)}
            >
              <IoClose size={28} />
            </IconButton>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenDrawer(false)}
                className="text-lg"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 px-4">
            {!isLogged ? (
              <>
                <Link href="/signup" onClick={() => setOpenDrawer(false)}>
                  <Button variant="contained">إنشاء حساب</Button>
                </Link>

                <Link href="/login" onClick={() => setOpenDrawer(false)}>
                  <Button variant="outlined">تسجيل الدخول</Button>
                </Link>
              </>
            ) : (
              <Button variant="outlined" onClick={handleLogout}>
                تسجيل الخروج
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}
