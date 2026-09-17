"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const navItems = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* -------------------------------------------------------
     NAVBAR ENTRANCE + LINK STAGGER
  ------------------------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Nav container slides down */
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      /* Individual links stagger in */
      gsap.fromTo(
        ".desktop-nav-link",
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, delay: 0.35, ease: "power3.out" }
      );

      /* CTA button */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.75, ease: "power3.out" }
        );
      }
    }, navRef);

    const handleScroll = () => { setScrolled(window.scrollY > 30); };
    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* -------------------------------------------------------
     MAGNETIC HOVER — CTA button
  ------------------------------------------------------- */
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      gsap.to(btn, { x: dx * 0.28, y: dy * 0.28, duration: 0.35, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* -------------------------------------------------------
     MOBILE MENU ANIMATION
  ------------------------------------------------------- */
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      gsap.to(mobileMenuRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" });
      gsap.fromTo(
        ".mobile-nav-item",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power3.inOut" });
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      ref={navRef}
      className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-6"
    >
      <nav
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "border-slate-200/80 bg-white/88 shadow-xl shadow-slate-900/8 backdrop-blur-2xl"
            : "border-white/70 bg-white/55 backdrop-blur-xl"
        }`}
      >
        {/* ===== MAIN ROW ===== */}
        <div
          className={`flex items-center justify-between px-5 transition-all duration-500 ${
            scrolled ? "py-3" : "py-4"
          }`}
        >
          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#1F2937]"
          >
            {/* Logo mark */}
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#7C3AED] text-sm font-bold text-white shadow-md shadow-[#7C3AED]/20">
              A
            </span>
            <span>
              <span className="text-gradient">AVIORA</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div ref={linksRef} className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`desktop-nav-link relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-xl ${
                    active
                      ? "text-[#7C3AED] font-semibold"
                      : "text-[#1F2937]/65 hover:text-[#7C3AED]"
                  }`}
                >
                  {item.label}

                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-[#38BDF8] to-[#7C3AED] transition-all duration-300 origin-left ${
                      active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    }`}
                  />

                  {/* Active / hover subtle background pill */}
                  <span
                    className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      active ? "bg-[#7C3AED]/5" : "bg-[#7C3AED]/0 hover:bg-[#7C3AED]/5"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* DESKTOP CTA — magnetic */}
          <Link
            ref={ctaRef}
            href="/contact"
            className="shimmer-btn relative hidden overflow-hidden rounded-xl bg-[#1F2937] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#7C3AED] hover:shadow-purple-500/20 md:inline-flex items-center gap-2"
          >
            Book Now
            <span className="text-xs">→</span>
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C0C7D1]/60 bg-white/60 text-[#1F2937] transition-all duration-300 hover:bg-white md:hidden"
          >
            <span className="relative flex h-5 w-5 flex-col justify-center">
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-[#1F2937] transition-all duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-[6px]"
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-[#1F2937] transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[2px] w-5 rounded-full bg-[#1F2937] transition-all duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-[6px]"
                }`}
              />
            </span>
          </button>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div
          ref={mobileMenuRef}
          className="h-0 overflow-hidden opacity-0 md:hidden"
        >
          <div className="border-t border-[#C0C7D1]/40 px-5 pb-5 pt-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className={`mobile-nav-item rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                      active
                        ? "bg-[#7C3AED]/10 text-[#7C3AED] font-semibold"
                        : "text-[#1F2937]/75 hover:bg-white/70 hover:text-[#7C3AED]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />}
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="mobile-nav-item mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F2937] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7C3AED]"
            >
              Book Now →
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}