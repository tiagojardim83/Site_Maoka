"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ArrowIcon } from "../../components/icons";
import { categoryLabels, categoryOrder, categorySlugs, type Locale, type Project } from "../../data/projects";
import { useHoverTitles } from "../../lib/useHoverTitles";

const placeholderCount = 5;

const copy: Record<Locale, {
  back: string;
  next: string;
  continueExploring: string;
  allProjects: string;
  socialCtaBefore: string;
  socialCtaMiddle: string;
  socialCtaAfter: string;
}> = {
  pt: {
    back: "Voltar",
    next: "Próximo projeto",
    continueExploring: "Continue explorando",
    allProjects: "Ver projetos",
    socialCtaBefore: "Para acompanhar outros projetos e processos da Maoka, visite nosso ",
    socialCtaMiddle: " e ",
    socialCtaAfter: ".",
  },
  en: {
    back: "Back",
    next: "Next project",
    continueExploring: "Keep exploring",
    allProjects: "See projects",
    socialCtaBefore: "To follow more of Maoka's projects and process, visit our ",
    socialCtaMiddle: " and ",
    socialCtaAfter: ".",
  },
};

export default function ProjectDetailClient({
  project,
  others,
}: {
  project: Project;
  others: Project[];
}) {
  const [locale, setLocale] = useState<Locale>("pt");
  const toggleLocale = () => setLocale((current) => (current === "pt" ? "en" : "pt"));
  const t = copy[locale];

  useHoverTitles();

  return (
    <>
      <Header locale={locale} onToggleLocale={toggleLocale} />

      <main className="project-detail">
        <section className="project-detail-hero">
          <p className="project-detail-kicker hover-title">
            {categoryLabels[project.category][locale]} · {project.year} · {project.place[locale]}
          </p>
          <h1 className="project-detail-title hover-title">{project.name}</h1>
          <p className="project-detail-text">{project.description[locale]}</p>
        </section>

        <section className="project-detail-images" aria-label={`${project.name} — ${t.next}`}>
          {project.images
            ? project.images.map((src, i) => (
                <figure className="project-detail-image project-detail-image--photo" key={src}>
                  <img src={src} alt={`${project.name} ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} />
                </figure>
              ))
            : Array.from({ length: placeholderCount }, (_, i) => (
                <figure className="project-detail-image" key={i}>
                  <span className="project-detail-image-index">{String(i + 1).padStart(2, "0")}</span>
                </figure>
              ))}
        </section>

        <section className="project-detail-next">
          <p className="project-detail-next-kicker hover-title">{t.next}</p>
          <h2 className="project-detail-next-heading hover-title">{t.continueExploring}</h2>
          <div className="project-detail-next-grid">
            {others.slice(0, 3).map((other) => (
              <Link className="project-detail-next-card" href={`/projects/${other.slug}`} key={other.slug}>
                <span className="project-detail-next-image">
                  <img src={other.image} alt={other.name} loading="lazy" />
                </span>
                <span className="project-detail-next-meta">
                  <strong>{other.name}</strong>
                  <small>{categoryLabels[other.category][locale]} · {other.year}</small>
                </span>
              </Link>
            ))}
          </div>
          <p className="project-detail-view-projects-label">{t.allProjects}</p>
          <div className="project-detail-category-links">
            {categoryOrder.map((cat) => (
              <Link className="project-detail-all" href={`/categorias/${categorySlugs[cat]}`} key={cat}>
                {categoryLabels[cat][locale]} <ArrowIcon />
              </Link>
            ))}
          </div>
        </section>

        <p className="project-detail-social-cta">
          {t.socialCtaBefore}
          <a href="https://www.instagram.com/maokacenografia/" target="_blank" rel="noreferrer">Instagram</a>
          {t.socialCtaMiddle}
          <a href="https://www.behance.net/maokacenografia" target="_blank" rel="noreferrer">Behance</a>
          {t.socialCtaAfter}
        </p>
      </main>

      <Footer locale={locale} />
    </>
  );
}
