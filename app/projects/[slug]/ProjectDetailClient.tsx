"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { ArrowIcon } from "../../components/icons";
import { categoryLabels, type Locale, type Project } from "../../data/projects";

const placeholderCount = 5;

const copy: Record<Locale, {
  back: string;
  next: string;
  continueExploring: string;
  allProjects: string;
}> = {
  pt: {
    back: "Voltar",
    next: "Próximo projeto",
    continueExploring: "Continue explorando",
    allProjects: "Ver todos os projetos",
  },
  en: {
    back: "Back",
    next: "Next project",
    continueExploring: "Keep exploring",
    allProjects: "See all projects",
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

  return (
    <>
      <Header locale={locale} onToggleLocale={toggleLocale} />

      <main className="project-detail">
        <section className="project-detail-hero">
          <p className="project-detail-kicker">
            {categoryLabels[project.category][locale]} · {project.year} · {project.place[locale]}
          </p>
          <h1 className="project-detail-title">{project.name}</h1>
          <p className="project-detail-text">{project.description[locale]}</p>
        </section>

        <section className="project-detail-images" aria-label={`${project.name} — ${t.next}`}>
          {Array.from({ length: placeholderCount }, (_, i) => (
            <figure className="project-detail-image" key={i}>
              <span className="project-detail-image-index">{String(i + 1).padStart(2, "0")}</span>
            </figure>
          ))}
        </section>

        <section className="project-detail-next">
          <p className="project-detail-next-kicker">{t.next}</p>
          <h2 className="project-detail-next-heading">{t.continueExploring}</h2>
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
          <Link className="project-detail-all" href="/#projetos">
            {t.allProjects} <ArrowIcon />
          </Link>
        </section>
      </main>
    </>
  );
}
