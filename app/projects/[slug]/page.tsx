import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, categoryLabels, type Locale } from "../../data/projects";

const locale: Locale = "pt";
const placeholderCount = 5;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description[locale],
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const others = [
    ...projects.slice(index + 1),
    ...projects.slice(0, index),
  ];

  return (
    <main className="project-detail">
      <header className="project-detail-header">
        <Link className="project-detail-back" href="/">
          <span aria-hidden="true">←</span> Voltar
        </Link>
        <span className="project-detail-brand">MAOKA</span>
      </header>

      <section className="project-detail-hero">
        <p className="project-detail-kicker">
          {categoryLabels[project.category][locale]} · {project.year} · {project.place[locale]}
        </p>
        <h1 className="project-detail-title">{project.name}</h1>
        <p className="project-detail-text">{project.description[locale]}</p>
      </section>

      <section className="project-detail-images" aria-label={`Imagens do projeto ${project.name}`}>
        {Array.from({ length: placeholderCount }, (_, i) => (
          <figure className="project-detail-image" key={i}>
            <span className="project-detail-image-index">{String(i + 1).padStart(2, "0")}</span>
          </figure>
        ))}
      </section>

      <section className="project-detail-next">
        <p className="project-detail-next-kicker">Próximo projeto</p>
        <h2 className="project-detail-next-heading">Continue explorando</h2>
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
          Ver todos os projetos ↗
        </Link>
      </section>
    </main>
  );
}
