"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Project = {
  name: string;
  category: "entertainment" | "corporate" | "activations";
  image: string;
  year: string;
  place: Record<Locale, string>;
  description: Record<Locale, string>;
};

type Locale = "pt" | "en";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const projectImage = (filename: string) => `${basePath}/projects/${filename}`;

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

const mosaicVideo = {
  mobile: "Mosaico_Maoka_05.mp4",
  desktop: "Mosaico_Maoka_05_desktop.mp4",
};

const itaipavaImages = Array.from(
  { length: 6 },
  (_, index) => `maoka_itaipava_0${index + 1}.webp`,
);

const projects: Project[] = [
  {
    name: "Nossa Praia",
    category: "entertainment",
    image: projectImage("hero-nossa-praia.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Materiais naturais, luz quente e cores de pôr do sol transformam a paisagem em um espaço de permanência, leveza e conexão.",
      en: "Natural materials, warm light and sunset colors transform the landscape into a place for lingering, lightness and connection.",
    },
  },
  {
    name: "Google Marketing Live",
    category: "corporate",
    image: projectImage("hero-google.webp"),
    year: "2026",
    place: { pt: "São Paulo", en: "São Paulo" },
    description: {
      pt: "Uma jornada imersiva e acessível, com soluções tipológicas próprias para conteúdo, interação e aproximação entre público e marca.",
      en: "An immersive, accessible journey with tailored spatial solutions for content, interaction and meaningful connections between people and brand.",
    },
  },
  {
    name: "Unigames",
    category: "entertainment",
    image: projectImage("hero-unigames.webp"),
    year: "2026",
    place: { pt: "Alfenas", en: "Alfenas" },
    description: {
      pt: "Um palco monumental que traduz energia, disputa e celebração em uma identidade visual impossível de ignorar.",
      en: "A monumental stage that translates energy, competition and celebration into an impossible-to-ignore visual identity.",
    },
  },
  {
    name: "Toyota Yaris Cross",
    category: "corporate",
    image: projectImage("toyota-yaris.webp"),
    year: "2026",
    place: { pt: "São Paulo", en: "São Paulo" },
    description: {
      pt: "Três grandes painéis de LED e uma plataforma giratória transformam a revelação do veículo em um momento de movimento e impacto.",
      en: "Three large LED screens and a rotating platform turn the vehicle reveal into a moment of movement and impact.",
    },
  },
  {
    name: "Shein",
    category: "activations",
    image: projectImage("shein.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Circulação intuitiva, visibilidade total e uma linguagem visual vibrante unem funcionalidade, produto e experiência de marca.",
      en: "Intuitive circulation, full visibility and a vibrant visual language bring together function, product and brand experience.",
    },
  },
  {
    name: "Purina Pro Plan",
    category: "corporate",
    image: projectImage("purina-pro-plan.webp"),
    year: "2026",
    place: { pt: "São Paulo", en: "São Paulo" },
    description: {
      pt: "Um encontro sofisticado que conecta inovação, pesquisa e relacionamento em uma jornada fluida entre conteúdo e convivência.",
      en: "A sophisticated setting connecting innovation, research and relationships through a fluid journey between content and gathering.",
    },
  },
  {
    name: "Iced Coffee Club",
    category: "activations",
    image: projectImage("iced-coffee-club.webp"),
    year: "2026",
    place: { pt: "Edifício Itália, SP", en: "Edifício Itália, São Paulo" },
    description: {
      pt: "Café gelado, música e lifestyle se encontram em uma experiência urbana com ativações sensoriais e espaços de conexão social.",
      en: "Iced coffee, music and lifestyle meet in an urban experience shaped by sensory activations and spaces for social connection.",
    },
  },
];

const menuLinks = ["#top", "#manifesto", "#projetos", "#servicos", "#processo", "#contato"];

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
    manifestoTitle: ["Não montamos", "cenários.", "Desenhamos", "relações."],
    manifestoParagraphs: [
      "A Maoka nasce do desejo de renovar conexões sociais por meio de projetos arquitetônicos inventivos. Criamos espaços onde marcas encontram forma, abrigo e presença.",
      "Do conceito à execução, equilibramos estratégia, design e técnica para transformar ambientes físicos em sensações vivas.",
    ],
    processLink: "Conheça nosso processo",
    itaipavaAlt: "Experiência cenográfica Itaipava criada pela Maoka",
    areasLabel: "Áreas de atuação da Maoka",
    degrees: "graus",
    numbers: ["Criação de ponta a ponta", "Frentes de atuação", "Experiência integrada"],
    marquee: ["ENTRETENIMENTO", "CORPORATIVO", "ARQUITETURA COMERCIAL"],
    projectsLabel: "Projetos em destaque",
    projectsTitle: ["Espaços para", "lembrar.", " E viver."],
    openProject: "Abrir projeto",
    viewProject: "Ver projeto",
    categories: {
      entertainment: "Entretenimento",
      corporate: "Corporativo",
      activations: "Ativações",
    },
    mosaicLabel: "Mosaico em movimento formando a palavra Maoka",
    craftLabel: "O que fazemos",
    craftTitle: ["Onde estratégia,", "design e", "experiência", "se encontram."],
    services: [
      ["Conceito & Estratégia", "Escuta, pesquisa e uma ideia central capaz de sustentar toda a experiência."],
      ["Arquitetura & Cenografia", "Espaços autorais que traduzem identidade com estética, função e intenção."],
      ["Produção & Execução", "Excelência técnica, gestão integrada e cuidado absoluto com cada detalhe."],
    ],
    ritualLabel: "Nosso ritual",
    ritualTitle: ["Da escuta", "ao", "extraordinário."],
    ritualCopy: "Um processo contínuo, próximo e transparente — porque as melhores experiências começam antes de o espaço existir.",
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
    manifestoTitle: ["We don't build", "sets.", "We design", "connections."],
    manifestoParagraphs: [
      "Maoka was born from the desire to renew social connections through inventive architectural projects. We create spaces where brands find form, shelter and presence.",
      "From concept to delivery, we balance strategy, design and technique to transform physical environments into living sensations.",
    ],
    processLink: "Discover our process",
    itaipavaAlt: "Itaipava scenographic experience created by Maoka",
    areasLabel: "Maoka areas of expertise",
    degrees: "degrees",
    numbers: ["End-to-end creation", "Areas of expertise", "Integrated experience"],
    marquee: ["ENTERTAINMENT", "CORPORATE", "COMMERCIAL ARCHITECTURE"],
    projectsLabel: "Featured projects",
    projectsTitle: ["Spaces to", "remember.", " And live."],
    openProject: "Open project",
    viewProject: "View project",
    categories: {
      entertainment: "Entertainment",
      corporate: "Corporate",
      activations: "Activations",
    },
    mosaicLabel: "Moving mosaic forming the word Maoka",
    craftLabel: "What we do",
    craftTitle: ["Where strategy,", "design and", "experience", "meet."],
    services: [
      ["Concept & Strategy", "Listening, research and one central idea strong enough to sustain the entire experience."],
      ["Architecture & Scenography", "Original spaces that translate identity through aesthetics, function and intention."],
      ["Production & Delivery", "Technical excellence, integrated management and absolute care for every detail."],
    ],
    ritualLabel: "Our ritual",
    ritualTitle: ["From listening", "to the", "extraordinary."],
    ritualCopy: "A continuous, collaborative and transparent process — because the best experiences begin before the space exists.",
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

function Brand({ compact = false, alt }: { compact?: boolean; alt: string }) {
  return (
    <span className={`brand ${compact ? "brand--compact" : ""}`}>
      <img
        className="brand-logo"
        src={projectImage("LOGOTYPEx.svg")}
        alt={alt}
      />
    </span>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function useScrollJackCarousel<T extends HTMLElement>(
  sectionRef: RefObject<T | null>,
  viewportRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let horizontalTravel = 0;
    let frame = 0;

    const render = () => {
      if (reducedMotion.matches) {
        frame = 0;
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const progress = horizontalTravel
        ? Math.max(0, Math.min(1, -sectionRect.top / horizontalTravel))
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
      section.style.setProperty("--horizontal-travel", `${horizontalTravel}px`);
      queueRender();
    };

    measure();

    window.addEventListener("scroll", queueRender, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", queueRender);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
      section.style.removeProperty("--horizontal-travel");
      viewport.scrollLeft = 0;
    };
  }, [sectionRef, viewportRef, trackRef]);
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("pt");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [entryActive, setEntryActive] = useState(true);
  const [orbsVisible, setOrbsVisible] = useState(false);
  const [desktopMosaic, setDesktopMosaic] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const entryRef = useRef<HTMLElement>(null);
  const heroOrbsRef = useRef<HTMLDivElement>(null);
  const manifestoNumbersRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const projectsViewportRef = useRef<HTMLDivElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const itaipavaSectionRef = useRef<HTMLDivElement>(null);
  const itaipavaViewportRef = useRef<HTMLDivElement>(null);
  const itaipavaTrackRef = useRef<HTMLDivElement>(null);
  const copy = translations[locale];

  useScrollJackCarousel(projectsSectionRef, projectsViewportRef, projectsTrackRef);
  useScrollJackCarousel(itaipavaSectionRef, itaipavaViewportRef, itaipavaTrackRef);

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
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const syncMosaicFormat = () => setDesktopMosaic(desktopQuery.matches);

    syncMosaicFormat();
    desktopQuery.addEventListener("change", syncMosaicFormat);
    return () => desktopQuery.removeEventListener("change", syncMosaicFormat);
  }, []);

  useEffect(() => {
    const container = manifestoNumbersRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(".manifesto-number"),
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateCounter(entry.target as HTMLElement);
        });
      },
      { threshold: 0.38 },
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
        <a className="header-brand" href="#top" aria-label={copy.startLabel} onClick={() => setMenuOpen(false)}>
          <Brand compact alt={copy.brandAlt} />
        </a>
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
              {menuLinks.map((href, index) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <span>{copy.menu[index]}</span>
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </nav>
            <div className="menu-footer">
              {whatsAppContacts.map((contact) => (
                <a
                  className="whatsapp-link"
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                  aria-label={`WhatsApp ${contact.label}`}
                  key={contact.href}
                >
                  <WhatsAppIcon />
                  {contact.label}
                </a>
              ))}
              <a href="mailto:maokacenografia@gmail.com" tabIndex={menuOpen ? 0 : -1}>maokacenografia@gmail.com ↗</a>
              <a href="https://www.instagram.com/maokacenografia/" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>Instagram ↗</a>
              <a href="https://www.behance.net/maokacenografia" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>Behance ↗</a>
              <a href="https://www.linkedin.com/company/maokacenografia" target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>LinkedIn ↗</a>
            </div>
          </div>
        </div>
        <button
          className="language-toggle"
          type="button"
          aria-label={copy.languageLabel}
          onClick={toggleLocale}
        >
          {locale.toUpperCase()}
        </button>
        <a className="header-contact" href="mailto:maokacenografia@gmail.com">
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

      <main id="top">
        <section className="site-entry" ref={entryRef} aria-label={copy.entryLabel}>
          <div className="site-entry-inner">
            <p className="site-entry-title" aria-hidden="true">
              {copy.entryTitle[0]}<br />{copy.entryTitle[1]}
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
                <h1 id="hero-title">{copy.heroTitle[0]}<br className="mobile-only" aria-hidden="true" />{copy.heroTitle[1]}</h1>
                <p>{copy.heroSubtitle}</p>
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
            <h2 className="display-copy reveal">
              {copy.manifestoTitle[0]}<br />
              <em>{copy.manifestoTitle[1]}</em><br /> {copy.manifestoTitle[2]}<br />
              {copy.manifestoTitle[3]}
            </h2>
            <p className="manifesto-lead reveal">{copy.manifestoParagraphs[0]}</p>
            <div className="manifesto-copy reveal">
              <p>{copy.manifestoParagraphs[1]}</p>
            </div>
          </div>
          <a className="text-link manifesto-process-link reveal" href="#processo-04">
            <strong>{copy.processLink}</strong>
            <span aria-hidden="true" />
          </a>
          <div className="manifesto-feature">
            <div className="manifesto-numbers reveal" aria-label={copy.areasLabel} ref={manifestoNumbersRef}>
              <div className="manifesto-number" tabIndex={0} aria-label={`360 ${copy.degrees} — ${copy.numbers[0]}`}>
                <strong data-count="360" data-suffix="°" aria-hidden="true">360°</strong>
                <span>{copy.numbers[0]}</span>
              </div>
              <div className="manifesto-number" tabIndex={0} aria-label={`03 — ${copy.numbers[1]}`}>
                <div className="manifesto-sign reveal" aria-hidden="true">
                  <div className="manifesto-sign-motion" data-parallax="92">
                    <img src={projectImage("Sign_3D.svg")} alt="" loading="lazy" />
                  </div>
                </div>
                <strong data-count="3" data-pad="2" aria-hidden="true">03</strong>
                <span>{copy.numbers[1]}</span>
              </div>
              <div className="manifesto-number" tabIndex={0} aria-label={`01 — ${copy.numbers[2]}`}>
                <strong data-count="1" data-pad="2" aria-hidden="true">01</strong>
                <span>{copy.numbers[2]}</span>
              </div>
            </div>
            <div className="itaipava-carousel" ref={itaipavaSectionRef}>
              <div className="itaipava-carousel-sticky">
                <div className="itaipava-viewport" ref={itaipavaViewportRef}>
                  <div className="itaipava-track" ref={itaipavaTrackRef}>
                    {itaipavaImages.map((filename) => (
                      <figure className="itaipava-card photo-reactive reveal" key={filename}>
                        <img
                          className="parallax-media"
                          src={projectImage(filename)}
                          alt={copy.itaipavaAlt}
                          loading="lazy"
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>{copy.marquee[0]}</span><i>✦</i><span>{copy.marquee[1]}</span><i>✦</i><span>{copy.marquee[2]}</span><i>✦</i>
            <span>{copy.marquee[0]}</span><i>✦</i><span>{copy.marquee[1]}</span><i>✦</i><span>{copy.marquee[2]}</span><i>✦</i>
          </div>
        </div>

        <section className="projects" id="projetos" ref={projectsSectionRef}>
          <div className="projects-sticky">
            <div className="projects-heading reveal">
              <div className="section-label">
                <span>02</span>
                <p>{copy.projectsLabel}</p>
              </div>
              <h2>{copy.projectsTitle[0]}<br /><em>{copy.projectsTitle[1]}</em>{copy.projectsTitle[2]}</h2>
            </div>

            <div className="project-viewport" ref={projectsViewportRef}>
              <div className="project-track" ref={projectsTrackRef}>
                {projects.map((project, index) => (
                  <button
                    className={`project-card project-card--${(index % 7) + 1} photo-reactive reveal`}
                    type="button"
                    key={project.name}
                    onClick={() => setActiveProject(project)}
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="video-mosaic" aria-label={copy.mosaicLabel}>
          <video
            className="video-mosaic-media"
            src={projectImage(desktopMosaic ? mosaicVideo.desktop : mosaicVideo.mobile)}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </section>

        <section className="craft" id="servicos">
          <div className="craft-content section-pad">
            <div className="section-label reveal">
              <span>03</span>
              <p>{copy.craftLabel}</p>
            </div>
            <h2 className="reveal">{copy.craftTitle[0]}<br />{copy.craftTitle[1]} <br /><em>{copy.craftTitle[2]}</em><br />{copy.craftTitle[3]}</h2>
            <div className="service-list">
              {copy.services.map(([title, description], index) => (
                <article className="reveal" key={`service-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process section-pad" id="processo">
          <div className="process-intro">
            <div className="section-label reveal" id="processo-04">
              <span>04</span>
              <p>{copy.ritualLabel}</p>
            </div>
            <h2 className="reveal">{copy.ritualTitle[0]} {copy.ritualTitle[1]}<br /><em>{copy.ritualTitle[2]}</em></h2>
            <p className="reveal">{copy.ritualCopy}</p>
          </div>
          <div className="process-steps">
            {copy.steps.map(([title, description, note], index) => (
              <article className="reveal" key={`step-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3><p>{description}</p><i>{note}</i>
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
            <p>{copy.closingQuestion}</p>
            <h2>{copy.closingTitle[0]}<br />{copy.closingTitle[1]} <br /><em>{copy.closingTitle[2]}</em></h2>
            <a className="cta-orbit" href={whatsAppContacts[0].href} target="_blank" rel="noreferrer">
              <span>{copy.startProject}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-statement" aria-label={copy.footerStatement}>
          <div className="footer-statement-track" aria-hidden="true">
            <span>{copy.footerStatement}</span><i>✦</i>
            <span>{copy.footerStatement}</span><i>✦</i>
          </div>
        </div>
        <div className="footer-grid">
          <div>
            <small>{copy.conversation}</small>
            <a href="mailto:maokacenografia@gmail.com">maokacenografia@gmail.com</a>
            {whatsAppContacts.map((contact) => (
              <a
                className="whatsapp-link"
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${contact.label}`}
                key={contact.href}
              >
                <WhatsAppIcon />
                {contact.label}
              </a>
            ))}
          </div>
          <div>
            <small>Social</small>
            <a href="https://www.instagram.com/maokacenografia/" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="https://www.behance.net/maokacenografia" target="_blank" rel="noreferrer">Behance ↗</a>
            <a href="https://www.linkedin.com/company/maokacenografia" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
          <div><small>{copy.base}</small><span>Belo Horizonte<br />{copy.country}</span></div>
          <div><small>{copy.return}</small><a href="#top">{copy.backToTop}</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {copy.footerBrand}</span><span>{copy.footerTagline}</span></div>
      </footer>

      {activeProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${copy.projectDialog} ${activeProject.name}`}>
          <button className="modal-backdrop" aria-label={copy.closeProject} onClick={() => setActiveProject(null)} />
          <div className="modal-panel">
            <button className="modal-close" type="button" onClick={() => setActiveProject(null)} aria-label={copy.closeProject}><span /> <span /></button>
            <div className="modal-media photo-reactive is-visible"><img src={activeProject.image} alt={activeProject.name} /></div>
            <div className="modal-copy">
              <div className="modal-tags"><span>{copy.categories[activeProject.category]}</span><span>{activeProject.year}</span><span>{activeProject.place[locale]}</span></div>
              <h2>{activeProject.name}</h2>
              <p>{activeProject.description[locale]}</p>
              <a href="mailto:maokacenografia@gmail.com">{copy.createWithMaoka} <span>↗</span></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
