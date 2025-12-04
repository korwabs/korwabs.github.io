"use client";

import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", to: "hero" },
    { name: "Solution", to: "solution" },
    { name: "UseCase", to: "demo" },
    { name: "Process", to: "process" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 top-0 transition-all duration-300 ${
          isScroll
            ? "bg-dark-900/80 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="hero" smooth duration={500} className="cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <Image
                  src={logo}
                  alt="WABS Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-white font-bold text-xl md:text-2xl">
                  WABS
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth
                  duration={500}
                  spy={true}
                  activeClass="text-primary-400"
                  className="px-4 py-2 text-dark-300 hover:text-white font-medium cursor-pointer transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              {/* CTA Button */}
              <motion.a
                href="mailto:wabs@wabs.io"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-sm hover:shadow-glow transition-shadow"
              >
                상담 신청
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-dark-800/50 flex items-center justify-center text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="mx-4 mt-2 p-4 rounded-2xl bg-dark-800/95 backdrop-blur-lg border border-white/10 shadow-xl">
              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={item.to}
                      smooth
                      duration={500}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-dark-300 hover:text-white hover:bg-dark-700 rounded-xl font-medium cursor-pointer transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="pt-2 mt-2 border-t border-white/10"
                >
                  <a
                    href="mailto:wabs@wabs.io"
                    className="block px-4 py-3 text-center rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold"
                  >
                    무료 상담 신청
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-dark-900/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
