"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projectImage, type Locale } from "../data/projects";
import { ArrowIcon } from "./icons";

const menuLinks: { href: string; label: Record<Locale, string> }[] = [
  { href: "/#top", label: { pt: "Início", en: "Home" } },
  { href: "/#manifesto", label: { pt: "Manifesto", en: "Manifesto" } },
  { href: "/#projetos", label: { pt: "Projetos", en: "Projects" } },
  { href: "/#servicos", label: { pt: "Serviços", en: "Services" } },
  { href: "/#processo", label: { pt: "Processo", en: "Process" } },
  { href: "/#contato", label: { pt: "Contato", en: "Contact" } },
];

const headerCopy: Record<Locale, {
  brandAlt: string;
  languageLabel: string;
  startLabel: string;
  openMenu: string;
  closeMenu: string;
  mainNavigation: string;
  headerContact: string;
}> = {
  pt: {
    brandAlt: "MAOKA — Cenografia & Experiência",
    languageLabel: "Traduzir site para inglês",
    startLabel: "Maoka - início",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    mainNavigation: "Navegação principal",
    headerContact: "Vamos conversar",
  },
  en: {
    brandAlt: "MAOKA — Scenography & Experience",
    languageLabel: "Translate site to Portuguese",
    startLabel: "Maoka - home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNavigation: "Main navigation",
    headerContact: "Let's talk",
  },
};

function Brand({ compact = false, alt }: { compact?: boolean; alt: string }) {
  return (
    <span className={`brand ${compact ? "brand--compact" : ""}`}>
      <img className="brand-logo brand-logo--full" src={projectImage("LOGOTYPEx.svg")} alt={alt} />
      <img className="brand-logo brand-logo--mark" src={projectImage("SIGN_02.svg")} alt={alt} />
    </span>
  );
}

export default function Header({
  locale,
  onToggleLocale,
  entryActive = false,
}: {
  locale: Locale;
  onToggleLocale: () => void;
  entryActive?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const copy = headerCopy[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The site hides the native cursor globally (see `cursor: none` in
  // globals.css) and replaces it with this tracked div — every page needs
  // Header mounted for a visible pointer, since this is the only place
  // that renders it.
  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <div className="cursor" ref={cursorRef} aria-hidden="true" />

      <header
        className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${entryActive ? "site-header--entry" : ""} ${menuOpen ? "site-header--menu" : ""}`}
      >
        <Link className="header-brand" href="/#top" aria-label={copy.startLabel} onClick={() => setMenuOpen(false)}>
          <Brand compact alt={copy.brandAlt} />
        </Link>
        <div className={`menu-shell ${menuOpen ? "is-open" : ""}`}>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            aria-controls="menu-panel"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <small>Menu</small>
            <span />
            <span />
          </button>

          <div className="menu-panel" id="menu-panel" aria-hidden={!menuOpen}>
            <nav aria-label={copy.mainNavigation}>
              {menuLinks.map((link, index) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <span>{link.label[locale]}</span>
                  <i aria-hidden="true"><ArrowIcon /></i>
                </Link>
              ))}
            </nav>
            <div className="menu-footer">
              <a href="https://www.instagram.com/maokacenografia/" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>Instagram <ArrowIcon /></a>
              <a href="https://www.behance.net/maokacenografia" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>Behance <ArrowIcon /></a>
              <a href="https://www.linkedin.com/company/maokacenografia" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>LinkedIn <ArrowIcon /></a>
            </div>
          </div>
        </div>
        <button
          className="language-toggle"
          type="button"
          aria-label={copy.languageLabel}
          onClick={onToggleLocale}
        >
          {locale.toUpperCase()}
        </button>
        <a className="header-contact" href="https://wa.me/5512982141215" target="_blank" rel="noreferrer">
          {copy.headerContact}
        </a>
      </header>

      <button
        className={`menu-backdrop ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label={copy.closeMenu}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}
