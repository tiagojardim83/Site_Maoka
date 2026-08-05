"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ArrowIcon } from "../../components/icons";
import {
  categoryLabels,
  categoryDescriptions,
  categorySlugs,
  projects as allProjects,
  type Locale,
  type Project,
  type ProjectCategory,
} from "../../data/projects";

const copy: Record<Locale, {
  eyebrow: string;
  projectsWord: string;
  next: string;
  continueExploring: string;
  allFronts: string;
}> = {
  pt: {
    eyebrow: "Frente de atuação",
    projectsWord: "projetos",
    next: "Outra frente",
    continueExploring: "Continue explorando",
    allFronts: "Ver todas as frentes",
  },
  en: {
    eyebrow: "Area of expertise",
    projectsWord: "projects",
    next: "Another area",
    continueExploring: "Keep exploring",
    allFronts: "See all areas",
  },
};

export default function CategoryDetailClient({
  category,
  categoryProjects,
  otherCategories,
}: {
  category: ProjectCategory;
  categoryProjects: Project[];
  otherCategories: ProjectCategory[];
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
            {t.eyebrow} · {categoryProjects.length} {t.projectsWord}
          </p>
          <h1 className="project-detail-title">{categoryLabels[category][locale]}</h1>
          <p className="project-detail-text">{categoryDescriptions[category][locale]}</p>
        </section>

        <section className="project-detail-next" aria-label={categoryLabels[category][locale]}>
          <div className="project-detail-next-grid">
            {categoryProjects.map((project) => (
              <Link className="project-detail-next-card" href={`/projects/${project.slug}`} key={project.slug}>
                <span className="project-detail-next-image">
                  <img src={project.image} alt={project.name} loading="lazy" />
                </span>
                <span className="project-detail-next-meta">
                  <strong>{project.name}</strong>
                  <small>{project.place[locale]} · {project.year}</small>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="project-detail-next">
          <p className="project-detail-next-kicker">{t.next}</p>
          <h2 className="project-detail-next-heading">{t.continueExploring}</h2>
          <div className="project-detail-next-grid">
            {otherCategories.map((other) => {
              const representative = allProjects.find((project) => project.category === other);
              const count = allProjects.filter((project) => project.category === other).length;
              return (
                <Link className="project-detail-next-card" href={`/categorias/${categorySlugs[other]}`} key={other}>
                  {representative && (
                    <span className="project-detail-next-image">
                      <img src={representative.image} alt={categoryLabels[other][locale]} loading="lazy" />
                    </span>
                  )}
                  <span className="project-detail-next-meta">
                    <strong>{categoryLabels[other][locale]}</strong>
                    <small>{count} {t.projectsWord}</small>
                  </span>
                </Link>
              );
            })}
          </div>
          <Link className="project-detail-all" href="/#projetos">
            {t.allFronts} <ArrowIcon /></Link>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
