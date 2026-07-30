"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  name: string;
  category: "Entretenimento" | "Corporativo" | "Ativações";
  image: string;
  year: string;
  place: string;
  description: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const projectImage = (filename: string) => `${basePath}/projects/${filename}`;

const heroLetters = [
  ["M", "Asset 5_M.svg"],
  ["A", "Asset 4_A.svg"],
  ["O", "Asset 2_O.svg"],
  ["K", "Asset 1_K.svg"],
  ["A", "Asset 3_A.svg"],
];

const projects: Project[] = [
  {
    name: "Nossa Praia",
    category: "Entretenimento",
    image: projectImage("hero-nossa-praia.webp"),
    year: "2026",
    place: "Brasil",
    description:
      "Materiais naturais, luz quente e cores de pôr do sol transformam a paisagem em um espaço de permanência, leveza e conexão.",
  },
  {
    name: "Google Marketing Live",
    category: "Corporativo",
    image: projectImage("hero-google.webp"),
    year: "2026",
    place: "São Paulo",
    description:
      "Uma jornada imersiva e acessível, com soluções tipológicas próprias para conteúdo, interação e aproximação entre público e marca.",
  },
  {
    name: "Unigames",
    category: "Entretenimento",
    image: projectImage("hero-unigames.webp"),
    year: "2026",
    place: "Alfenas",
    description:
      "Um palco monumental que traduz energia, disputa e celebração em uma identidade visual impossível de ignorar.",
  },
  {
    name: "Toyota Yaris Cross",
    category: "Corporativo",
    image: projectImage("toyota-yaris.webp"),
    year: "2026",
    place: "São Paulo",
    description:
      "Três grandes painéis de LED e uma plataforma giratória transformam a revelação do veículo em um momento de movimento e impacto.",
  },
  {
    name: "Shein",
    category: "Ativações",
    image: projectImage("shein.webp"),
    year: "2026",
    place: "Brasil",
    description:
      "Circulação intuitiva, visibilidade total e uma linguagem visual vibrante unem funcionalidade, produto e experiência de marca.",
  },
  {
    name: "Purina Pro Plan",
    category: "Corporativo",
    image: projectImage("purina-pro-plan.webp"),
    year: "2026",
    place: "São Paulo",
    description:
      "Um encontro sofisticado que conecta inovação, pesquisa e relacionamento em uma jornada fluida entre conteúdo e convivência.",
  },
  {
    name: "Iced Coffee Club",
    category: "Ativações",
    image: projectImage("iced-coffee-club.webp"),
    year: "2026",
    place: "Edifício Itália, SP",
    description:
      "Café gelado, música e lifestyle se encontram em uma experiência urbana com ativações sensoriais e espaços de conexão social.",
  },
];

const menuItems = [
  ["01", "Manifesto", "#manifesto"],
  ["02", "Projetos", "#projetos"],
  ["03", "Processo", "#processo"],
  ["04", "Contato", "#contato"],
];

const filters = ["Todos", "Entretenimento", "Corporativo", "Ativações"];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand--compact" : ""}`}>
      <img
        className="brand-logo"
        src={projectImage("LOGOTYPEx.svg")}
        alt="MAOKA — Cenografia & Experiência"
      />
    </span>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [orbsVisible, setOrbsVisible] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroOrbsRef = useRef<HTMLDivElement>(null);

  const visibleProjects = useMemo(
    () =>
      filter === "Todos"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading || !heroOrbsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOrbsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(heroOrbsRef.current);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || activeProject ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, activeProject]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filter]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className={`preloader ${loading ? "" : "preloader--done"}`} aria-hidden="true">
        <div className="preloader-inner">
          <Brand />
          <div className="preloader-track">
            <span />
          </div>
          <small>Ideias em movimento</small>
        </div>
      </div>

      <div className="cursor" ref={cursorRef} aria-hidden="true" />

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${menuOpen ? "site-header--menu" : ""}`}>
        <a className="header-brand" href="#top" aria-label="Maoka - início" onClick={() => setMenuOpen(false)}>
          <Brand compact />
        </a>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <small>{menuOpen ? "Fechar" : "Menu"}</small>
          <span />
          <span />
        </button>
        <a className="header-contact" href="mailto:maokacenografia@gmail.com">
          Vamos conversar
        </a>
      </header>

      <div className={`menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-ambient" aria-hidden="true">MAOKA</div>
        <nav aria-label="Navegação principal">
          {menuItems.map(([number, label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
              <small>{number}</small>
              <span>{label}</span>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </nav>
        <div className="menu-footer">
          <a href="https://www.instagram.com/maokacenografia/" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
            Instagram ↗
          </a>
          <span>Belo Horizonte · Brasil</span>
        </div>
      </div>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-intro">
            <div className="hero-statement">
              <span aria-hidden="true" />
              <h1 id="hero-title">Damos forma ao que sua marca quer fazer sentir.</h1>
              <p>Cenografia · Arquitetura · Experiência</p>
            </div>

            <div
              className={`hero-orbs ${orbsVisible ? "is-visible" : ""}`}
              ref={heroOrbsRef}
              role="img"
              aria-label="MAOKA"
            >
              {heroLetters.map(([letter, filename], index) => (
                <span className="hero-orb" key={`${letter}-${index}`}>
                  <img src={projectImage(filename)} alt="" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>

          <figure className="hero-image">
            <img
              src={projectImage("hero-nossa-praia.webp")}
              alt="Experiência cenográfica Nossa Praia criada pela Maoka"
              loading="eager"
              fetchPriority="high"
            />
            <figcaption>Nossa Praia · Entretenimento</figcaption>
          </figure>
        </section>

        <section className="manifesto section-pad" id="manifesto">
          <div className="section-label reveal">
            <span>01</span>
            <p>O que nos move</p>
          </div>
          <div className="manifesto-grid">
            <h2 className="display-copy reveal">
              Não montamos<br />
              <em>cenários.</em> Desenhamos<br />
              relações.
            </h2>
            <div className="manifesto-copy reveal">
              <p>
                A Maoka nasce do desejo de renovar conexões sociais por meio de projetos arquitetônicos inventivos. Criamos espaços onde marcas encontram forma, abrigo e presença.
              </p>
              <p>
                Do conceito à execução, equilibramos estratégia, design e técnica para transformar ambientes físicos em sensações vivas.
              </p>
              <a className="text-link" href="#processo">Conheça nosso processo <span>↘</span></a>
            </div>
          </div>
          <div className="manifesto-numbers reveal" aria-label="Áreas de atuação da Maoka">
            <div><strong>360°</strong><span>Criação de ponta a ponta</span></div>
            <div><strong>03</strong><span>Frentes de atuação</span></div>
            <div><strong>01</strong><span>Experiência integrada</span></div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>ENTRETENIMENTO</span><i>✦</i><span>CORPORATIVO</span><i>✦</i><span>ARQUITETURA COMERCIAL</span><i>✦</i>
            <span>ENTRETENIMENTO</span><i>✦</i><span>CORPORATIVO</span><i>✦</i><span>ARQUITETURA COMERCIAL</span><i>✦</i>
          </div>
        </div>

        <section className="projects section-pad" id="projetos">
          <div className="projects-heading reveal">
            <div className="section-label">
              <span>02</span>
              <p>Projetos em destaque</p>
            </div>
            <h2>Espaços para<br /><em>lembrar.</em> E viver.</h2>
          </div>

          <div className="filter-bar reveal" aria-label="Filtrar projetos">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? "is-active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}<sup>{item === "Todos" ? projects.length : projects.filter((project) => project.category === item).length}</sup>
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <button
                className="project-card reveal"
                type="button"
                key={project.name}
                onClick={() => setActiveProject(project)}
                aria-label={`Abrir projeto ${project.name}`}
              >
                <span className="project-image">
                  <img src={project.image} alt={project.name} loading="lazy" />
                  <span className="project-open" aria-hidden="true">Ver projeto ↗</span>
                </span>
                <span className="project-meta">
                  <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{project.name}</strong>
                    <small>{project.category} · {project.year}</small>
                  </span>
                  <i aria-hidden="true">↗</i>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="craft">
          <div className="craft-image reveal">
            <img src={projectImage("purina-pro-plan.webp")} alt="Ambiente imersivo criado pela Maoka para Purina Pro Plan" loading="lazy" />
            <span className="image-note">Purina Pro Plan · Experiência corporativa</span>
          </div>
          <div className="craft-content section-pad">
            <div className="section-label reveal">
              <span>03</span>
              <p>O que fazemos</p>
            </div>
            <h2 className="reveal">Onde estratégia,<br />design e <em>experiência</em><br />se encontram.</h2>
            <div className="service-list">
              <article className="reveal">
                <span>01</span>
                <div><h3>Conceito &amp; Estratégia</h3><p>Escuta, pesquisa e uma ideia central capaz de sustentar toda a experiência.</p></div>
              </article>
              <article className="reveal">
                <span>02</span>
                <div><h3>Arquitetura &amp; Cenografia</h3><p>Espaços autorais que traduzem identidade com estética, função e intenção.</p></div>
              </article>
              <article className="reveal">
                <span>03</span>
                <div><h3>Produção &amp; Execução</h3><p>Excelência técnica, gestão integrada e cuidado absoluto com cada detalhe.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="process section-pad" id="processo">
          <div className="process-intro">
            <div className="section-label reveal">
              <span>04</span>
              <p>Nosso ritual</p>
            </div>
            <h2 className="reveal">Da escuta<br />ao <em>extraordinário.</em></h2>
            <p className="reveal">Um processo contínuo, próximo e transparente — porque as melhores experiências começam antes de o espaço existir.</p>
          </div>
          <div className="process-steps">
            <article className="reveal"><span>01</span><h3>Compreender</h3><p>Mergulhamos na marca, nas pessoas e no que ainda não foi dito.</p><i>Imersão · Briefing</i></article>
            <article className="reveal"><span>02</span><h3>Idealizar</h3><p>Transformamos estratégia em conceito, narrativa, desenho e atmosfera.</p><i>Conceito · Projeto</i></article>
            <article className="reveal"><span>03</span><h3>Materializar</h3><p>Coordenamos produção, fornecedores, montagem e cada acabamento.</p><i>Produção · Gestão</i></article>
            <article className="reveal"><span>04</span><h3>Fazer viver</h3><p>Entregamos o espaço pronto para gerar presença, encontro e memória.</p><i>Experiência · Entrega</i></article>
          </div>
        </section>

        <section className="brand-strip" aria-label="Marcas que já viveram experiências Maoka">
          <p>Marcas que já viveram essa experiência</p>
          <div className="client-marquee">
            <div>
              <span>GOOGLE</span><span>TOYOTA</span><span>ELECTROLUX</span><span>PURINA</span><span>SHEIN</span><span>ARCELORMITTAL</span><span>ANGLOGOLD</span>
              <span>GOOGLE</span><span>TOYOTA</span><span>ELECTROLUX</span><span>PURINA</span><span>SHEIN</span><span>ARCELORMITTAL</span><span>ANGLOGOLD</span>
            </div>
          </div>
        </section>

        <section className="closing" id="contato">
          <div className="closing-image" aria-hidden="true">
            <img src={projectImage("imperio.webp")} alt="" loading="lazy" />
          </div>
          <div className="closing-shade" />
          <div className="closing-content reveal">
            <p>Tem uma ideia em movimento?</p>
            <h2>Vamos criar algo<br />que ninguém <em>esquece?</em></h2>
            <a className="cta-orbit" href="https://wa.me/5531992066650" target="_blank" rel="noreferrer">
              <span>Começar um projeto</span>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <Brand />
          <p>Projetos singulares<br />para interações coletivas.</p>
        </div>
        <div className="footer-grid">
          <div><small>Conversa</small><a href="mailto:maokacenografia@gmail.com">maokacenografia@gmail.com</a><a href="tel:+5531992066650">+55 31 99206-6650</a></div>
          <div><small>Social</small><a href="https://www.instagram.com/maokacenografia/" target="_blank" rel="noreferrer">Instagram ↗</a></div>
          <div><small>Base</small><span>Belo Horizonte<br />Brasil</span></div>
          <div><small>Retorno</small><a href="#top">Voltar ao topo ↑</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Maoka Cenografia</span><span>Estratégia · Espaço · Experiência</span></div>
      </footer>

      {activeProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={`Projeto ${activeProject.name}`}>
          <button className="modal-backdrop" aria-label="Fechar projeto" onClick={() => setActiveProject(null)} />
          <div className="modal-panel">
            <button className="modal-close" type="button" onClick={() => setActiveProject(null)} aria-label="Fechar projeto"><span /> <span /></button>
            <div className="modal-media"><img src={activeProject.image} alt={activeProject.name} /></div>
            <div className="modal-copy">
              <div className="modal-tags"><span>{activeProject.category}</span><span>{activeProject.year}</span><span>{activeProject.place}</span></div>
              <h2>{activeProject.name}</h2>
              <p>{activeProject.description}</p>
              <a href="mailto:maokacenografia@gmail.com">Criar uma experiência com a Maoka <span>↗</span></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
