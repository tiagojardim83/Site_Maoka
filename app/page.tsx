"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { projects, projectImage, categoryOrder, categorySlugs, type Locale } from "./data/projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ArrowIcon } from "./components/icons";
import { useHoverTitles } from "./lib/useHoverTitles";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const whatsAppContacts = [
  { label: "+55 12 98214-1215", href: "https://wa.me/5512982141215" },
  { label: "+55 31 9206-6650", href: "https://wa.me/553192066650" },
] as const;

const heroLetters = [
  ["M", "Asset 5_M.svg"],
  ["A", "Asset 4_A.svg"],
  ["O", "Asset 2_O.svg"],
  ["K", "Asset 1_K.svg"],
  ["A", "Asset 3_A.svg"],
];

const itaipavaImages = Array.from(
  { length: 6 },
  (_, index) => `maoka_itaipava_0${index + 1}.webp`,
);

const translations = {
  pt: {
    metaTitle: "Maoka — Cenografia & Experiência",
    metaDescription: "Cenografia, arquitetura e experiências de marca criadas pela Maoka.",
    brandAlt: "MAOKA — Cenografia & Experiência",
    languageLabel: "Traduzir site para inglês",
    startLabel: "Maoka - início",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    mainNavigation: "Navegação principal",
    menu: ["Início", "Manifesto", "Projetos", "Serviços", "Processo", "Contato"],
    headerContact: "Vamos conversar",
    entryLabel: "Abertura Maoka",
    entryTitle: ["Ideia em", "movimento"],
    symbolAlt: "Símbolo da Maoka",
    heroTitle: ["Damos forma ao que sua", " marca quer fazer sentir."],
    heroSubtitle: "Cenografia · Arquitetura · Experiência",
    heroSymbols: "Símbolos da Maoka em movimento",
    carnivalAlt: "Experiência cenográfica Carnaval dos Sonhos criada pela Maoka",
    manifestoLabel: "O que nos move",
    manifestoTitle: ["Não montamos", "cenários", "Desenhamos", "relações."],
    manifestoParagraphs: [
      "A Maoka nasce do desejo de renovar conexões sociais por meio de projetos arquitetônicos inventivos. Criamos espaços onde marcas encontram forma, abrigo e presença.",
      "Do conceito à execução, equilibramos estratégia, design e técnica para transformar ambientes físicos em sensações vivas.",
    ],
    processLink: "Conheça nosso processo",
    itaipavaAlt: "Experiência cenográfica Grupo Petrópolis criada pela Maoka",
    itaipavaEyebrow: "Projeto premiado",
    itaipavaTitle: "Grupo Petrópolis",
    itaipavaDetails: "Detalhes do projeto",
    areasLabel: "Áreas de atuação da Maoka",
    degrees: "graus",
    numbers: ["Criação de ponta a ponta", "Frentes de atuação", "Experiência integrada"],
    marquee: ["ENTRETENIMENTO", "CORPORATIVO", "ARQUITETURA COMERCIAL"],
    projectsLabel: "Projetos em destaque",
    projectsTitle: ["Espaços para", "lembrar", " e viver."],
    projectsCopy: "Uma seleção dos projetos que melhor traduzem a Maoka, porque as melhores ideias merecem ser revividas.",
    openProject: "Abrir projeto",
    viewProject: "Ver projeto",
    categories: {
      entertainment: "Entretenimento",
      corporate: "Corporativo",
      activations: "Arquitetura Comercial",
    },
    areasKicker: "Frentes de atuação",
    areasProjectsWord: "projetos",
    craftLabel: "O que fazemos",
    craftTitle: ["Onde estratégia,", "design e", "experiência", "se encontram."],
    services: [
      ["Conceito & Estratégia", "Escuta, pesquisa e uma ideia central capaz de sustentar toda a experiência."],
      ["Arquitetura & Cenografia", "Espaços autorais que traduzem identidade com estética, função e intenção."],
      ["Produção & Execução", "Excelência técnica, gestão integrada e cuidado absoluto com cada detalhe."],
    ],
    ritualLabel: "Nosso ritual",
    ritualTitle: ["Da escuta", "ao", "extraordinário."],
    ritualCopy: "Um processo contínuo, próximo e transparente.",
    steps: [
      ["Compreender", "Mergulhamos na marca, nas pessoas e no que ainda não foi dito.", "Imersão · Briefing"],
      ["Idealizar", "Transformamos estratégia em conceito, narrativa, desenho e atmosfera.", "Conceito · Projeto"],
      ["Materializar", "Coordenamos produção, fornecedores, montagem e cada acabamento.", "Produção · Gestão"],
      ["Fazer viver", "Entregamos o espaço pronto para gerar presença, encontro e memória.", "Experiência · Entrega"],
    ],
    brandsLabel: "Marcas que já viveram experiências Maoka",
    brandsCopy: "Marcas que já viveram essa experiência",
    closingQuestion: "Tem uma ideia em movimento?",
    closingTitle: ["Vamos criar algo", "que ninguém", "esquece?"],
    startProject: "Começar um projeto",
    footerStatement: "Projetos singulares para interações coletivas",
    conversation: "Conversa",
    base: "Base",
    country: "Brasil",
    return: "Retorno",
    backToTop: "Voltar ao topo ↑",
    footerBrand: "Maoka Cenografia",
    footerTagline: "Estratégia · Espaço · Experiência",
    closeProject: "Fechar projeto",
    projectDialog: "Projeto",
    createWithMaoka: "Criar uma experiência com a Maoka",
  },
  en: {
    metaTitle: "Maoka — Scenography & Experience",
    metaDescription: "Scenography, architecture and brand experiences created by Maoka.",
    brandAlt: "MAOKA — Scenography & Experience",
    languageLabel: "Translate site to Portuguese",
    startLabel: "Maoka - home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNavigation: "Main navigation",
    menu: ["Home", "Manifesto", "Projects", "Services", "Process", "Contact"],
    headerContact: "Let's talk",
    entryLabel: "Maoka opening",
    entryTitle: ["Idea in", "motion"],
    symbolAlt: "Maoka symbol",
    heroTitle: ["We shape what your", " brand wants people to feel."],
    heroSubtitle: "Scenography · Architecture · Experience",
    heroSymbols: "Maoka symbols in motion",
    carnivalAlt: "Carnaval dos Sonhos scenographic experience created by Maoka",
    manifestoLabel: "What moves us",
    manifestoTitle: ["We don't build", "sets", "We design", "connections."],
    manifestoParagraphs: [
      "Maoka was born from the desire to renew social connections through inventive architectural projects. We create spaces where brands find form, shelter and presence.",
      "From concept to delivery, we balance strategy, design and technique to transform physical environments into living sensations.",
    ],
    processLink: "Discover our process",
    itaipavaAlt: "Grupo Petrópolis scenographic experience created by Maoka",
    itaipavaEyebrow: "Award-winning project",
    itaipavaTitle: "Grupo Petrópolis",
    itaipavaDetails: "Project details",
    areasLabel: "Maoka areas of expertise",
    degrees: "degrees",
    numbers: ["End-to-end creation", "Areas of expertise", "Integrated experience"],
    marquee: ["ENTERTAINMENT", "CORPORATE", "COMMERCIAL ARCHITECTURE"],
    projectsLabel: "Featured projects",
    projectsTitle: ["Spaces to", "remember", " and live."],
    projectsCopy: "A curated selection of the projects that best translate Maoka, because the best ideas deserve to be relived.",
    openProject: "Open project",
    viewProject: "View project",
    categories: {
      entertainment: "Entertainment",
      corporate: "Corporate",
      activations: "Commercial Architecture",
    },
    areasKicker: "Areas of expertise",
    areasProjectsWord: "projects",
    craftLabel: "What we do",
    craftTitle: ["Where strategy,", "design and", "experience", "meet."],
    services: [
      ["Concept & Strategy", "Listening, research and one central idea strong enough to sustain the entire experience."],
      ["Architecture & Scenography", "Original spaces that translate identity through aesthetics, function and intention."],
      ["Production & Delivery", "Technical excellence, integrated management and absolute care for every detail."],
    ],
    ritualLabel: "Our ritual",
    ritualTitle: ["From listening", "to the", "extraordinary."],
    ritualCopy: "A continuous, close and transparent process.",
    steps: [
      ["Understand", "We immerse ourselves in the brand, the people and what has not yet been said.", "Immersion · Briefing"],
      ["Envision", "We turn strategy into concept, narrative, design and atmosphere.", "Concept · Design"],
      ["Build", "We coordinate production, suppliers, installation and every finish.", "Production · Management"],
      ["Bring to life", "We deliver a space ready to generate presence, connection and memory.", "Experience · Delivery"],
    ],
    brandsLabel: "Brands that have experienced Maoka",
    brandsCopy: "Brands that have shared this experience",
    closingQuestion: "Got an idea in motion?",
    closingTitle: ["Let's create something", "no one", "forgets?"],
    startProject: "Start a project",
    footerStatement: "Singular projects for collective interactions",
    conversation: "Let's talk",
    base: "Base",
    country: "Brazil",
    return: "Return",
    backToTop: "Back to top ↑",
    footerBrand: "Maoka Scenography",
    footerTagline: "Strategy · Space · Experience",
    closeProject: "Close project",
    projectDialog: "Project",
    createWithMaoka: "Create an experience with Maoka",
  },
} as const;

// Splits text into per-letter spans so each one can carry its own
// animation-delay, turning a single CSS keyframe (see .jelly-letter) into a
// soft wave that ripples across the word instead of the whole line bobbing
// in lockstep.
function WaveText({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span className="jelly-letter" style={{ animationDelay: `${i * 70}ms` }} key={i}>
          {char === " " ? " " : char}
        </span>
      ))}
    </>
  );
}

function TrophyIcon() {
  return (
    <svg className="trophy-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M7 4h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 5H4v2a4 4 0 0 0 4 4M17 5h3v2a4 4 0 0 1-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13v3m-3 4h6m-6 0c0-2 1-3 3-3s3 1 3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useScrollJackCarousel<T extends HTMLElement>(
  sectionRef: RefObject<T | null>,
  viewportRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
  // >1 moves the images faster than the scroll itself, so the pinned
  // section doesn't need a full vertical scroll-px per horizontal-px to
  // clear the whole track — shortens the empty-feeling scroll runway.
  speed = 1,
  // When the pinned box holds more than the carousel itself (e.g. a block
  // stacked below it), its height isn't a fixed CSS value anymore, so the
  // section's total scroll height has to be measured from the real DOM
  // rather than computed with a calc(). This keeps that trailing block
  // pinned in view together with the carousel instead of only appearing
  // once the whole (much taller) section has scrolled past.
  stickyRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let horizontalTravel = 0;
    let pinDistance = 0;
    let frame = 0;

    const render = () => {
      if (reducedMotion.matches) {
        frame = 0;
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      // Pins flush to the top (top: 0 in CSS, same as the projects
      // carousel) — the heading now lives inside the sticky box itself
      // instead of scrolling away above it, so it stays on screen with
      // the images the whole time, like the projects carousel does.
      const progress = pinDistance
        ? Math.max(0, Math.min(1, -sectionRect.top / pinDistance))
        : 0;

      // Driven via scrollLeft rather than a CSS transform: some WebKit
      // builds fold a translateX applied to this same element into its own
      // scrollWidth, creating a feedback loop where the measured width (and
      // thus the required travel) keeps growing as the transform grows.
      // scrollLeft doesn't affect scrollWidth, so it can't self-corrupt.
      viewport.scrollLeft = progress * horizontalTravel;
      frame = 0;
    };

    const queueRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const measure = () => {
      // Avoid track.scrollWidth / viewport.scrollWidth entirely: some
      // WebKit builds report an inflated scrollWidth for a scrolled
      // container (or its scrolled ancestor) once a non-zero scrollLeft is
      // applied, and mobile Safari fires "resize" whenever the address bar
      // shows/hides mid-gesture, which can poison a single scrollWidth-based
      // reading with a stale, scrolled travel value. Compute the natural
      // track width analytically from each card's own rect (unaffected by
      // any ancestor's scroll position) instead.
      const cards = Array.from(track.children) as HTMLElement[];
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || "0") || 0;
      const paddingLeft = parseFloat(trackStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(trackStyle.paddingRight) || 0;
      const cardsWidth = cards.reduce(
        (sum, card) => sum + card.getBoundingClientRect().width,
        0,
      );
      const trackWidth =
        cardsWidth + gap * Math.max(0, cards.length - 1) + paddingLeft + paddingRight;
      horizontalTravel = Math.max(0, trackWidth - viewport.clientWidth);
      pinDistance = horizontalTravel / speed;
      section.style.setProperty("--horizontal-travel", `${pinDistance}px`);

      const sticky = stickyRef?.current;
      if (sticky) {
        // The sticky box holds more than the carousel now (heading above
        // it, a number card below it), so its height isn't a fixed CSS
        // value — measure the real rendered height and size the section
        // to match (sticky height + the scroll distance still needed to
        // clear the horizontal travel).
        const stickyHeight = sticky.getBoundingClientRect().height;
        section.style.height = `${stickyHeight + pinDistance}px`;
      }

      queueRender();
    };

    measure();

    // Mobile Safari fires "resize" whenever its address bar shows or hides
    // mid-scroll, which only changes window.innerHeight — not the width.
    // Re-running measure() on that recalculated the section's height
    // (stickyHeight + pinDistance) mid-gesture, visibly shifting the
    // pinned carousel out from under the user. Only re-measure on a real
    // width change (resize/orientation), never on a height-only one.
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      measure();
    };

    window.addEventListener("scroll", queueRender, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", queueRender);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
      section.style.removeProperty("--horizontal-travel");
      if (stickyRef?.current) {
        section.style.removeProperty("height");
      }
      viewport.scrollLeft = 0;
    };
  }, [sectionRef, viewportRef, trackRef, speed, stickyRef]);
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("pt");
  const [entryActive, setEntryActive] = useState(true);
  const [orbsVisible, setOrbsVisible] = useState(false);
  const entryRef = useRef<HTMLElement>(null);
  const heroOrbsRef = useRef<HTMLDivElement>(null);
  const manifestoNumbersRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const projectsViewportRef = useRef<HTMLDivElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const itaipavaSectionRef = useRef<HTMLElement>(null);
  const itaipavaViewportRef = useRef<HTMLDivElement>(null);
  const itaipavaTrackRef = useRef<HTMLDivElement>(null);
  const itaipavaStickyRef = useRef<HTMLDivElement>(null);
  const copy = translations[locale];

  useHoverTitles();

  useScrollJackCarousel(projectsSectionRef, projectsViewportRef, projectsTrackRef);
  useScrollJackCarousel(itaipavaSectionRef, itaipavaViewportRef, itaipavaTrackRef, 2.5, itaipavaStickyRef);

  // Arriving at a hash below the scroll-jacked carousels (e.g. #frentes,
  // reached via "Ver todas as frentes") lands short: the browser's native
  // hash-scroll runs before useScrollJackCarousel's effect resizes those
  // sections to their real (measured) height, so it targets the anchor's
  // pre-resize position. Re-scroll once that resize has settled.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const scrollToHash = () => {
      document.getElementById(hash)?.scrollIntoView();
    };

    if (document.readyState === "complete") {
      requestAnimationFrame(() => requestAnimationFrame(scrollToHash));
    } else {
      window.addEventListener("load", scrollToHash, { once: true });
      return () => window.removeEventListener("load", scrollToHash);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.title = copy.metaTitle;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", copy.metaDescription);
  }, [copy.metaDescription, copy.metaTitle, locale]);

  const toggleLocale = () => {
    setLocale((currentLocale) => currentLocale === "pt" ? "en" : "pt");
  };

  useEffect(() => {
    if (!manifestoNumbersRef.current) return;

    // The 360° card lives inside the pinned carousel and the 03/01 cards
    // live in normal flow right after it (so the pin only needs to cover
    // the carousel + that first card, not the whole three-card block) —
    // query the whole document since they're no longer under one container.
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".manifesto-number"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animationFrames = new Map<HTMLElement, number>();

    const animateCounter = (card: HTMLElement) => {
      const number = card.querySelector<HTMLElement>("[data-count]");
      if (!number) return;

      const target = Number(number.dataset.count ?? 0);
      const suffix = number.dataset.suffix ?? "";
      const padding = Number(number.dataset.pad ?? 0);
      const finalValue = `${String(target).padStart(padding, "0")}${suffix}`;
      const activeFrame = animationFrames.get(card);

      if (activeFrame) window.cancelAnimationFrame(activeFrame);
      if (reducedMotion.matches) {
        number.textContent = finalValue;
        return;
      }

      const startedAt = performance.now();
      const duration = target > 10 ? 1400 : 900;

      const tick = (currentTime: number) => {
        const progress = Math.min(1, (currentTime - startedAt) / duration);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * easedProgress);

        number.textContent = `${String(value).padStart(padding, "0")}${suffix}`;

        if (progress < 1) {
          animationFrames.set(card, window.requestAnimationFrame(tick));
        } else {
          number.textContent = finalValue;
          animationFrames.delete(card);
        }
      };

      number.textContent = `${String(0).padStart(padding, "0")}${suffix}`;
      animationFrames.set(card, window.requestAnimationFrame(tick));
    };

    // Re-trigger (and highlight blue, like a hover) every time a card
    // crosses dead-center of the viewport, scrolling up or down — not just
    // once on first view, and on any device (mobile included).
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            animateCounter(card);
            card.classList.add("is-centered");
          } else {
            card.classList.remove("is-centered");
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    const replay = (event: Event) => animateCounter(event.currentTarget as HTMLElement);

    cards.forEach((card) => {
      observer.observe(card);
      card.addEventListener("pointerenter", replay);
      card.addEventListener("focus", replay);
    });

    return () => {
      observer.disconnect();
      cards.forEach((card) => {
        card.removeEventListener("pointerenter", replay);
        card.removeEventListener("focus", replay);
      });
      animationFrames.forEach((frame) => window.cancelAnimationFrame(frame));
    };
  }, []);

  useEffect(() => {
    // Only one row highlighted blue at a time: whichever crosses
    // dead-center of the viewport while scrolling (either direction, on
    // any device), or whichever is hovered on desktop — hover wins while
    // active, falling back to the centered row once the pointer leaves.
    const rows = Array.from(document.querySelectorAll<HTMLElement>(".areas-row"));
    let centeredRow: HTMLElement | null = null;
    let hoveredRow: HTMLElement | null = null;

    const applyActive = () => {
      const active = hoveredRow ?? centeredRow;
      rows.forEach((row) => row.classList.toggle("is-centered", row === active));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const row = entry.target as HTMLElement;
          if (entry.isIntersecting) centeredRow = row;
          else if (centeredRow === row) centeredRow = null;
        });
        applyActive();
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    const onEnter = (event: Event) => {
      hoveredRow = event.currentTarget as HTMLElement;
      applyActive();
    };
    const onLeave = () => {
      hoveredRow = null;
      applyActive();
    };

    rows.forEach((row) => {
      observer.observe(row);
      row.addEventListener("pointerenter", onEnter);
      row.addEventListener("pointerleave", onLeave);
    });

    return () => {
      observer.disconnect();
      rows.forEach((row) => {
        row.removeEventListener("pointerenter", onEnter);
        row.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

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
      const scrollRange = Math.max(window.innerHeight * 0.65, 1);
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollRange));
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const fadeProgress = Math.max(0, (progress - 0.3) / 0.7);

      entryRef.current?.style.setProperty(
        "--entry-scale",
        (1 + easedProgress * 9).toFixed(3),
      );
      entryRef.current?.style.setProperty(
        "--entry-opacity",
        (1 - fadeProgress).toFixed(3),
      );
      entryRef.current?.style.setProperty(
        "--entry-visibility",
        progress >= 1 ? "hidden" : "visible",
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
  }, []);

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
  }, []);

  return (
    <>
      <Header locale={locale} onToggleLocale={toggleLocale} entryActive={entryActive} />

      <main id="top">
        <section className="site-entry" ref={entryRef} aria-label={copy.entryLabel}>
          <div className="site-entry-inner">
            <p className="site-entry-title" aria-hidden="true">
              <WaveText text={copy.entryTitle[0]} /><br /><WaveText text={copy.entryTitle[1]} />
            </p>
            <div className="site-entry-zoom">
              <img
                className="site-entry-sign"
                src={projectImage("Sign Outline.svg")}
                alt={copy.symbolAlt}
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <div className="hero-transition">
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-intro">
              <div className="hero-statement">
                <h1 id="hero-title" className="hover-title">{copy.heroTitle[0]}<br className="mobile-only" aria-hidden="true" />{copy.heroTitle[1]}</h1>
                <p className="hover-title">{copy.heroSubtitle}</p>
              </div>

              <div
                className={`hero-orbs ${orbsVisible ? "is-visible" : ""}`}
                ref={heroOrbsRef}
                role="img"
                aria-label={copy.heroSymbols}
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
            <video
              className="parallax-media"
              data-parallax="110"
              src={projectImage("CDS_MAPA3D.mp4")}
              poster={projectImage("carnaval-dos-sonhos.webp")}
              aria-label={copy.carnivalAlt}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </figure>
        </div>

        <section className="manifesto section-pad" id="manifesto">
          <div className="section-label reveal">
            <span>01</span>
            <p>{copy.manifestoLabel}</p>
          </div>
          <div className="manifesto-grid">
            <h2 className="display-copy reveal hover-title">
              {copy.manifestoTitle[0]}<br />
              <em>{copy.manifestoTitle[1]}</em><br /> {copy.manifestoTitle[2]}<br />
              {copy.manifestoTitle[3]}
            </h2>
            <p className="manifesto-lead reveal">{copy.manifestoParagraphs[0]}</p>
            <div className="manifesto-copy reveal">
              <p>{copy.manifestoParagraphs[1]}</p>
            </div>
          </div>
        </section>

        <section className="itaipava-section" ref={itaipavaSectionRef}>
          <div className="itaipava-sticky" ref={itaipavaStickyRef}>
            <div className="itaipava-intro">
              <p className="itaipava-eyebrow reveal hover-title"><TrophyIcon /> {copy.itaipavaEyebrow}</p>
              <h3 className="itaipava-title reveal hover-title">{copy.itaipavaTitle}</h3>
              <Link className="text-link itaipava-details-link reveal" href="/projects/itaipava">
                <strong>{copy.itaipavaDetails}</strong>
                <span aria-hidden="true" />
              </Link>
            </div>

            <div className="itaipava-viewport" ref={itaipavaViewportRef}>
              <div className="itaipava-track" ref={itaipavaTrackRef}>
                {itaipavaImages.map((filename) => (
                  <figure className="itaipava-card photo-reactive reveal" key={filename}>
                    <Link href="/projects/itaipava" className="itaipava-card-link" aria-label={copy.itaipavaTitle}>
                      <img
                        className="parallax-media"
                        src={projectImage(filename)}
                        alt={copy.itaipavaAlt}
                        loading="lazy"
                      />
                    </Link>
                  </figure>
                ))}
              </div>
            </div>

            <div className="manifesto-numbers manifesto-numbers--lead" aria-label={copy.areasLabel}>
              <div className="manifesto-number" tabIndex={0} aria-label={`360 ${copy.degrees} — ${copy.numbers[0]}`}>
                <strong data-count="360" data-suffix="°" aria-hidden="true">360°</strong>
                <span>{copy.numbers[0]}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="manifesto-numbers manifesto-numbers--rest" ref={manifestoNumbersRef}>
          <div className="manifesto-number" tabIndex={0} aria-label={`03 — ${copy.numbers[1]}`}>
            <strong data-count="3" data-pad="2" aria-hidden="true">03</strong>
            <span>{copy.numbers[1]}</span>
          </div>
          <div className="manifesto-number" tabIndex={0} aria-label={`01 — ${copy.numbers[2]}`}>
            <strong data-count="1" data-pad="2" aria-hidden="true">01</strong>
            <span>{copy.numbers[2]}</span>
          </div>
        </div>

        <section className="projects" id="projetos" ref={projectsSectionRef}>
          <div className="projects-sticky">
            <div className="projects-heading reveal">
              <div className="section-label">
                <span>02</span>
                <p className="hover-title">{copy.projectsLabel}</p>
              </div>
              <h2 className="hover-title">{copy.projectsTitle[0]}<br /><em>{copy.projectsTitle[1]}</em>{copy.projectsTitle[2]}</h2>
              <p>{copy.projectsCopy}</p>
            </div>

            <div className="project-viewport" ref={projectsViewportRef}>
              <div className="project-track" ref={projectsTrackRef}>
                {projects.map((project, index) => (
                  <Link
                    className={`project-card project-card--${(index % 7) + 1} photo-reactive reveal`}
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    aria-label={`${copy.openProject} ${project.name}`}
                  >
                    <span className="project-image media-mask">
                      <img
                        className="parallax-media"
                        data-parallax={index % 2 === 0 ? "62" : "48"}
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                      />
                      <span className="project-open" aria-hidden="true">{copy.viewProject} ↗</span>
                    </span>
                    <span className="project-meta">
                      <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                      <span>
                        <strong>{project.name}</strong>
                        <small>{copy.categories[project.category]} · {project.year}</small>
                      </span>
                      <i aria-hidden="true">↗</i>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="areas section-pad" id="frentes">
          <div className="section-label reveal">
            <span>03</span>
            <p className="hover-title">{copy.areasKicker}</p>
          </div>
          <div className="areas-list">
            {categoryOrder.map((category) => {
              const count = projects.filter((project) => project.category === category).length;
              const direction = category === "activations" ? "rtl" : "ltr";
              const label = copy.categories[category];
              return (
                <Link
                  className={`areas-row areas-row--${direction} reveal`}
                  href={`/categorias/${categorySlugs[category]}`}
                  key={category}
                >
                  <span className="areas-row-marquee" aria-hidden="true">
                    <span className="areas-row-marquee-track">
                      <strong>{label}</strong><i>•</i>
                      <strong>{label}</strong><i>•</i>
                    </span>
                  </span>
                  <i className="areas-row-arrow" aria-hidden="true"><ArrowIcon /></i>
                  <small className="areas-row-count">
                    <span>{count} {copy.areasProjectsWord}</span>
                    <span>{label}</span>
                  </small>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>{copy.marquee[0]}</span><i>✦</i><span>{copy.marquee[1]}</span><i>✦</i><span>{copy.marquee[2]}</span><i>✦</i>
            <span>{copy.marquee[0]}</span><i>✦</i><span>{copy.marquee[1]}</span><i>✦</i><span>{copy.marquee[2]}</span><i>✦</i>
          </div>
        </div>

        <section className="craft" id="servicos">
          <div className="craft-content section-pad">
            <div className="section-label reveal">
              <span>04</span>
              <p className="hover-title">{copy.craftLabel}</p>
            </div>
            <div className="craft-title-wrap">
              <h2 className="reveal hover-title">{copy.craftTitle[0]}<br />{copy.craftTitle[1]} <br /><em>{copy.craftTitle[2]}</em><br />{copy.craftTitle[3]}</h2>
              <div className="craft-sign reveal" aria-hidden="true">
                <div className="craft-sign-motion" data-parallax="92">
                  <img src={projectImage("Sign_3D.svg")} alt="" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="service-list">
              {copy.services.map(([title, description], index) => (
                <article className="reveal" key={`service-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="hover-title">{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process section-pad" id="processo">
          <div className="process-intro">
            <div className="section-label reveal" id="processo-04">
              <span>05</span>
              <p className="hover-title">{copy.ritualLabel}</p>
            </div>
            <h2 className="reveal hover-title">{copy.ritualTitle[0]} {copy.ritualTitle[1]}<br /><em>{copy.ritualTitle[2]}</em></h2>
            <p className="reveal">{copy.ritualCopy}</p>
          </div>
          <div className="process-steps">
            {copy.steps.map(([title, description, note], index) => (
              <article className="reveal" key={`step-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3 className="hover-title">{title}</h3><p>{description}</p><i>{note}</i>
              </article>
            ))}
          </div>
        </section>

        <section className="brand-strip" aria-label={copy.brandsLabel}>
          <p>{copy.brandsCopy}</p>
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
            <p className="hover-title">{copy.closingQuestion}</p>
            <h2 className="hover-title">{copy.closingTitle[0]}<br />{copy.closingTitle[1]} <br /><em>{copy.closingTitle[2]}</em></h2>
            <a className="cta-orbit" href={whatsAppContacts[0].href} target="_blank" rel="noreferrer">
              <span>{copy.startProject}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
