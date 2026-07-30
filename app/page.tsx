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
  ["01", "Início", "#top"],
  ["02", "Manifesto", "#manifesto"],
  ["03", "Projetos", "#projetos"],
  ["04", "Serviços", "#servicos"],
  ["05", "Processo", "#processo"],
  ["06", "Contato", "#contato"],
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [entryActive, setEntryActive] = useState(true);
  const [orbsVisible, setOrbsVisible] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const entryRef = useRef<HTMLElement>(null);
  const heroOrbsRef = useRef<HTMLDivElement>(null);

  const visibleProjects = useMemo(
    () =>
      filter === "Todos"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  useEffect(() => {
    if (!heroOrbsRef.current) return;

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
  }, []);

  useEffect(() => {
    if (!orbsVisible || !heroOrbsRef.current) return;

    const stage = heroOrbsRef.current;
    const elements = Array.from(
      stage.querySelectorAll<HTMLElement>(".hero-orb"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches || !elements.length) return;

    const starts = [
      [0.03, 0.68],
      [0.2, 0.12],
      [0.43, 0.52],
      [0.68, 0.17],
      [0.83, 0.7],
    ];
    const velocities = [
      [148, -112],
      [-126, 154],
      [172, 108],
      [-158, -126],
      [118, 166],
    ];
    const spins = [18, -23, 14, -17, 21];

    type OrbBody = {
      element: HTMLElement;
      size: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      spin: number;
    };

    let width = stage.clientWidth;
    let height = stage.clientHeight;
    const speedScale = Math.max(0.62, Math.min(1, width / 1100));
    let bodies: OrbBody[] = elements.map((element, index) => {
      const size = Math.min(element.offsetWidth, element.offsetHeight);
      const availableX = Math.max(0, width - size);
      const availableY = Math.max(0, height - size);

      return {
        element,
        size,
        x: starts[index][0] * availableX,
        y: starts[index][1] * availableY,
        vx: velocities[index][0] * speedScale,
        vy: velocities[index][1] * speedScale,
        angle: index * 18,
        spin: spins[index],
      };
    });

    const keepInsideStage = (body: OrbBody) => {
      const maxX = Math.max(0, width - body.size);
      const maxY = Math.max(0, height - body.size);

      if (body.x <= 0) {
        body.x = 0;
        body.vx = Math.abs(body.vx);
      } else if (body.x >= maxX) {
        body.x = maxX;
        body.vx = -Math.abs(body.vx);
      }

      if (body.y <= 0) {
        body.y = 0;
        body.vy = Math.abs(body.vy);
      } else if (body.y >= maxY) {
        body.y = maxY;
        body.vy = -Math.abs(body.vy);
      }
    };

    const resolveCollisions = () => {
      for (let firstIndex = 0; firstIndex < bodies.length; firstIndex += 1) {
        for (
          let secondIndex = firstIndex + 1;
          secondIndex < bodies.length;
          secondIndex += 1
        ) {
          const first = bodies[firstIndex];
          const second = bodies[secondIndex];
          const firstRadius = first.size / 2;
          const secondRadius = second.size / 2;
          const deltaX = second.x + secondRadius - (first.x + firstRadius);
          const deltaY = second.y + secondRadius - (first.y + firstRadius);
          const minimumDistance = firstRadius + secondRadius;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;

          if (distanceSquared >= minimumDistance * minimumDistance) continue;

          const distance = Math.sqrt(distanceSquared) || 0.001;
          const normalX = deltaX / distance;
          const normalY = deltaY / distance;
          const overlap = minimumDistance - distance;

          first.x -= normalX * overlap * 0.5;
          first.y -= normalY * overlap * 0.5;
          second.x += normalX * overlap * 0.5;
          second.y += normalY * overlap * 0.5;

          const relativeNormalVelocity =
            (second.vx - first.vx) * normalX +
            (second.vy - first.vy) * normalY;

          if (relativeNormalVelocity < 0) {
            first.vx += relativeNormalVelocity * normalX;
            first.vy += relativeNormalVelocity * normalY;
            second.vx -= relativeNormalVelocity * normalX;
            second.vy -= relativeNormalVelocity * normalY;
          }
        }
      }
    };

    let animationFrame = 0;
    let previousTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - previousTime) / 1000, 0.032);
      previousTime = currentTime;

      bodies.forEach((body) => {
        body.x += body.vx * deltaTime;
        body.y += body.vy * deltaTime;
        body.angle += body.spin * deltaTime;
        keepInsideStage(body);
      });

      resolveCollisions();

      bodies.forEach((body) => {
        keepInsideStage(body);
        body.element.style.transform = `translate3d(${body.x.toFixed(2)}px, ${body.y.toFixed(2)}px, 0) rotate(${body.angle.toFixed(2)}deg)`;
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      const previousWidth = width;
      const previousHeight = height;
      width = stage.clientWidth;
      height = stage.clientHeight;

      bodies = bodies.map((body) => {
        const size = Math.min(body.element.offsetWidth, body.element.offsetHeight);
        const oldMaxX = Math.max(1, previousWidth - body.size);
        const oldMaxY = Math.max(1, previousHeight - body.size);
        const newMaxX = Math.max(0, width - size);
        const newMaxY = Math.max(0, height - size);

        return {
          ...body,
          size,
          x: (body.x / oldMaxX) * newMaxX,
          y: (body.y / oldMaxY) * newMaxY,
        };
      });
    });

    resizeObserver.observe(stage);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
      elements.forEach((element) => element.removeAttribute("style"));
    };
  }, [orbsVisible]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);

      const scrollRange = Math.max(window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollRange));
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const fadeProgress = Math.max(0, (progress - 0.55) / 0.45);

      entryRef.current?.style.setProperty(
        "--entry-scale",
        (1 + easedProgress * 9).toFixed(3),
      );
      entryRef.current?.style.setProperty(
        "--entry-opacity",
        (1 - fadeProgress).toFixed(3),
      );
      setEntryActive(progress < 0.98);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal, .photo-reactive",
    );
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const scrollRevealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"),
    );

    if (reducedMotion.matches) {
      scrollRevealElements.forEach((element) => {
        element.style.setProperty("--scroll-reveal", "0%");
      });
      return;
    }

    let frame = 0;

    const render = () => {
      const viewportHeight = window.innerHeight;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -viewportHeight || rect.top > viewportHeight * 2) return;

        const distanceFromCenter =
          viewportHeight / 2 - (rect.top + rect.height / 2);
        const range = (viewportHeight + rect.height) / 2;
        const progress = Math.max(-1, Math.min(1, distanceFromCenter / range));
        const travel = Number(element.dataset.parallax ?? 72);

        element.style.setProperty(
          "--parallax-y",
          `${(progress * travel).toFixed(2)}px`,
        );
      });

      scrollRevealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const rawProgress =
          (viewportHeight - rect.top) / Math.max(viewportHeight * 0.88, 1);
        const progress = Math.max(0, Math.min(1, rawProgress));
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        element.style.setProperty(
          "--scroll-reveal",
          `${((1 - easedProgress) * 100).toFixed(2)}%`,
        );
      });

      frame = 0;
    };

    const queueRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", queueRender, { passive: true });
    window.addEventListener("resize", queueRender);

    return () => {
      window.removeEventListener("scroll", queueRender);
      window.removeEventListener("resize", queueRender);
      if (frame) window.cancelAnimationFrame(frame);
    };
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
      <div className="cursor" ref={cursorRef} aria-hidden="true" />

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${entryActive ? "site-header--entry" : ""} ${menuOpen ? "site-header--menu" : ""}`}>
        <a className="header-brand" href="#top" aria-label="Maoka - início" onClick={() => setMenuOpen(false)}>
          <Brand compact />
        </a>
        <div className={`menu-shell ${menuOpen ? "is-open" : ""}`}>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-controls="menu-panel"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <small>Menu</small>
            <span />
            <span />
          </button>

          <div className="menu-panel" id="menu-panel" aria-hidden={!menuOpen}>
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
              <a href="tel:+5531992066650" tabIndex={menuOpen ? 0 : -1}>+55 31 99206-6650 ↗</a>
              <a href="mailto:maokacenografia@gmail.com" tabIndex={menuOpen ? 0 : -1}>maokacenografia@gmail.com ↗</a>
              <a href="https://www.instagram.com/maokacenografia/" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>Instagram ↗</a>
            </div>
          </div>
        </div>
        <a className="header-contact" href="mailto:maokacenografia@gmail.com">
          Vamos conversar
        </a>
      </header>

      <button
        className={`menu-backdrop ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label="Fechar menu"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <main id="top">
        <section className="site-entry" ref={entryRef} aria-label="Abertura Maoka">
          <div className="site-entry-inner">
            <p className="site-entry-title" aria-hidden="true">
              Ideia em<br />movimento
            </p>
            <div className="site-entry-zoom">
              <img
                className="site-entry-sign"
                src={projectImage("Sign Outline.svg")}
                alt="Símbolo da Maoka"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-intro">
            <div className="hero-statement">
              <h1 id="hero-title">Damos forma ao que sua<br className="mobile-only" aria-hidden="true" /> marca quer fazer sentir.</h1>
              <p>Cenografia · Arquitetura · Experiência</p>
            </div>

            <div
              className={`hero-orbs ${orbsVisible ? "is-visible" : ""}`}
              ref={heroOrbsRef}
              role="img"
              aria-label="Símbolos da Maoka em movimento"
            >
              {heroLetters.map(([letter, filename], index) => (
                <span className="hero-orb" key={`${letter}-${index}`}>
                  <img src={projectImage(filename)} alt="" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
        </section>

        <figure
          className="hero-image hero-scroll-reveal photo-reactive"
          data-scroll-reveal
        >
          <img
            className="parallax-media"
            data-parallax="110"
            src={projectImage("carnaval-dos-sonhos.webp")}
            alt="Experiência cenográfica Carnaval dos Sonhos criada pela Maoka"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Carnaval dos Sonhos · Entretenimento</figcaption>
        </figure>

        <section className="manifesto section-pad" id="manifesto">
          <div className="section-label reveal">
            <span>01</span>
            <p>O que nos move</p>
          </div>
          <div className="manifesto-grid">
            <h2 className="display-copy reveal">
              Não montamos<br />
              <em>cenários.</em><br /> Desenhamos<br />
              relações.
            </h2>
            <div className="manifesto-copy reveal">
              <p>
                A Maoka nasce do desejo de renovar conexões sociais por meio de projetos arquitetônicos inventivos. Criamos espaços onde marcas encontram forma, abrigo e presença.
              </p>
              <p>
                Do conceito à execução, equilibramos estratégia, design e técnica para transformar ambientes físicos em sensações vivas.
              </p>
              <a className="text-link" href="#processo">
                <strong>Conheça nosso processo</strong>
                <span aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="manifesto-feature">
            <p className="manifesto-aside reveal">
              <span>Forma com intenção</span>
              Cada projeto é pensado como uma paisagem viva: uma composição de matéria, luz, percurso e encontro.
            </p>
            <div className="manifesto-sign reveal" aria-hidden="true">
              <div className="manifesto-sign-motion" data-parallax="92">
                <img src={projectImage("Sign_3D.svg")} alt="" loading="lazy" />
              </div>
            </div>
            <figure className="manifesto-feature-media photo-reactive reveal media-reveal">
              <img
                className="parallax-media"
                data-parallax="82"
                src={projectImage("toka.webp")}
                alt="Experiência cenográfica Toka criada pela Maoka"
                loading="lazy"
              />
              <figcaption>Toka · Arquitetura comercial</figcaption>
            </figure>
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
                className={`project-card project-card--${(index % 7) + 1} photo-reactive reveal`}
                type="button"
                key={project.name}
                onClick={() => setActiveProject(project)}
                aria-label={`Abrir projeto ${project.name}`}
              >
                <span className="project-image media-mask">
                  <img
                    className="parallax-media"
                    data-parallax={index % 2 === 0 ? "62" : "48"}
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                  />
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

        <section className="craft" id="servicos">
          <div className="craft-image photo-reactive reveal media-reveal">
            <img className="parallax-media" data-parallax="86" src={projectImage("purina-pro-plan.webp")} alt="Ambiente imersivo criado pela Maoka para Purina Pro Plan" loading="lazy" />
            <span className="image-note">Purina Pro Plan · Experiência corporativa</span>
          </div>
          <div className="craft-content section-pad">
            <div className="section-label reveal">
              <span>03</span>
              <p>O que fazemos</p>
            </div>
            <h2 className="reveal">Onde estratégia,<br />design e <br /><em>experiência</em><br />se encontram.</h2>
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
            <h2 className="reveal">Da escuta<br />ao <br /><em>extraordinário.</em></h2>
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
          <div className="closing-image photo-reactive" aria-hidden="true">
            <img className="parallax-media" data-parallax="120" src={projectImage("imperio.webp")} alt="" loading="lazy" />
          </div>
          <div className="closing-shade" />
          <div className="closing-content reveal">
            <p>Tem uma ideia em movimento?</p>
            <h2>Vamos criar algo<br />que ninguém <br /><em>esquece?</em></h2>
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
            <div className="modal-media photo-reactive is-visible"><img src={activeProject.image} alt={activeProject.name} /></div>
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
