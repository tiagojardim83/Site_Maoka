export type Locale = "pt" | "en";

export type ProjectCategory = "entertainment" | "corporate" | "activations";

export type ProjectImage = {
  src: string;
  /** Taller-than-wide media is grouped two per row (see
   * ProjectDetailClient) instead of being cropped into the same
   * widescreen box as the rest, so it stays fully visible. */
  portrait?: boolean;
  /** Defaults to "image". Videos autoplay muted/looped, same treatment
   * as everywhere else on the site. */
  type?: "image" | "video";
};

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  image: string;
  year: string;
  place: Record<Locale, string>;
  description: Record<Locale, string>;
  /** Real photos for the project detail page's gallery. Falls back to
   * numbered placeholder boxes when absent. */
  images?: ProjectImage[];
  /** How many portrait photos/videos sit per row on desktop. Defaults to 2. */
  portraitRowSize?: number;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const projectImage = (filename: string) => `${basePath}/projects/${filename}`;

export const projects: Project[] = [
  {
    slug: "unigames",
    name: "Unigames",
    category: "entertainment",
    image: projectImage("hero-unigames.webp"),
    year: "2026",
    place: { pt: "Alfenas", en: "Alfenas" },
    description: {
      pt: "Um palco monumental que traduz energia, disputa e celebração em uma identidade visual impossível de ignorar.",
      en: "A monumental stage that translates energy, competition and celebration into an impossible-to-ignore visual identity.",
    },
    images: [
      { src: projectImage("unigames-01.webp") },
      { src: projectImage("unigames-02.webp"), portrait: true },
      { src: projectImage("unigames-03.webp"), portrait: true },
      { src: projectImage("unigames-04.webp"), portrait: true },
      { src: projectImage("unigames-05.webp"), portrait: true },
    ],
  },
  {
    slug: "shein",
    name: "Shein",
    category: "activations",
    image: projectImage("shein.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Circulação intuitiva, visibilidade total e uma linguagem visual vibrante unem funcionalidade, produto e experiência de marca.",
      en: "Intuitive circulation, full visibility and a vibrant visual language bring together function, product and brand experience.",
    },
    images: [
      { src: projectImage("shein-01.webp"), portrait: true },
      { src: projectImage("shein-02.webp"), portrait: true },
      { src: projectImage("shein-03.webp"), portrait: true },
      { src: projectImage("shein-04.webp"), portrait: true },
    ],
  },
  {
    slug: "purina-pro-plan",
    name: "Purina Pro Plan",
    category: "corporate",
    image: projectImage("purina-pro-plan.webp"),
    year: "2026",
    place: { pt: "São Paulo", en: "São Paulo" },
    description: {
      pt: "Um encontro sofisticado que conecta inovação, pesquisa e relacionamento em uma jornada fluida entre conteúdo e convivência.",
      en: "A sophisticated setting connecting innovation, research and relationships through a fluid journey between content and gathering.",
    },
    images: [
      { src: projectImage("purina-01.webp") },
      { src: projectImage("purina-02.webp") },
      { src: projectImage("purina-03.webp") },
      { src: projectImage("purina-04.webp"), portrait: true },
      { src: projectImage("purina-05.webp"), portrait: true },
    ],
  },
  // The 8 entries below were added from freshly uploaded photos with no
  // supplied name/description yet — name is derived from the folder, and
  // the description is an intentionally generic placeholder for Tiago to
  // rewrite with the real project story.
  {
    slug: "arraial",
    name: "Arraial",
    category: "entertainment",
    image: projectImage("arraial-01.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Uma celebração popular traduzida em cenografia, identidade e experiência de marca.",
      en: "A popular celebration translated into scenography, identity and brand experience.",
    },
    images: [
      { src: projectImage("arraial-01.webp"), portrait: true },
      { src: projectImage("arraial-02.webp") },
      { src: projectImage("arraial-03.webp"), portrait: true },
      { src: projectImage("arraial-04.webp"), portrait: true },
      { src: projectImage("arraial-05.webp") },
      { src: projectImage("arraial-06.webp"), portrait: true },
      { src: projectImage("arraial-07.webp") },
    ],
  },
  {
    slug: "ultimo-samba",
    name: "Último Samba",
    category: "entertainment",
    image: projectImage("ultimo-samba-01.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Uma experiência imersiva que une música, cultura e cenografia em um só palco.",
      en: "An immersive experience bringing together music, culture and scenography on one stage.",
    },
    images: [
      { src: projectImage("ultimo-samba-01.webp"), portrait: true },
      { src: projectImage("ultimo-samba-02.webp") },
      { src: projectImage("ultimo-samba-03.webp") },
      { src: projectImage("ultimo-samba-04.webp"), portrait: true },
    ],
  },
  {
    slug: "anninha",
    name: "Anninha",
    category: "activations",
    image: projectImage("anninha-01.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Um ambiente comercial pensado para criar conexão imediata com o público.",
      en: "A commercial environment designed to create immediate connection with the audience.",
    },
    images: [
      { src: projectImage("anninha-01.webp"), portrait: true },
      { src: projectImage("anninha-02.webp"), portrait: true },
      { src: projectImage("anninha-03.webp"), portrait: true },
      { src: projectImage("anninha-04.webp"), portrait: true },
      { src: projectImage("anninha-05.webp"), portrait: true },
      { src: projectImage("anninha-06.webp"), portrait: true },
      { src: projectImage("anninha-07.webp") },
      { src: projectImage("anninha-08.webp"), portrait: true },
      { src: projectImage("anninha-09.webp"), portrait: true },
    ],
  },
  {
    slug: "imperio",
    name: "Império",
    category: "activations",
    image: projectImage("imperio.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Arquitetura comercial que transforma espaço em presença de marca.",
      en: "Commercial architecture that turns space into brand presence.",
    },
    images: [
      { src: projectImage("imperio-detail-01.webp"), portrait: true },
      { src: projectImage("imperio-detail-02.webp"), portrait: true },
      { src: projectImage("imperio-detail-03.webp"), portrait: true },
      { src: projectImage("imperio-detail-04.webp"), portrait: true },
      { src: projectImage("imperio-detail-05.webp") },
      { src: projectImage("imperio-detail-06.webp") },
    ],
  },
  {
    slug: "toka",
    name: "Toka",
    category: "activations",
    image: projectImage("toka.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Um espaço comercial construído para reforçar identidade e experiência de marca.",
      en: "A commercial space built to reinforce brand identity and experience.",
    },
    images: [
      { src: projectImage("toka-detail-01.webp") },
      { src: projectImage("toka-detail-02.webp"), portrait: true },
      { src: projectImage("toka-detail-03.webp"), portrait: true },
      { src: projectImage("toka-detail-04.webp") },
      { src: projectImage("toka-detail-05.webp") },
      { src: projectImage("toka-detail-06.webp"), portrait: true },
      { src: projectImage("toka-detail-07.webp"), portrait: true },
      { src: projectImage("toka-detail-08.webp") },
      { src: projectImage("toka-detail-09.webp") },
    ],
  },
  {
    slug: "nescafe",
    name: "Nescafé",
    category: "corporate",
    image: projectImage("nescafe-01.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Um espaço institucional que traduz estratégia de marca em presença física.",
      en: "An institutional space that translates brand strategy into physical presence.",
    },
    images: [
      { src: projectImage("nescafe-01.webp"), portrait: true },
      { src: projectImage("nescafe-03.webp"), portrait: true },
      { src: projectImage("nescafe-04.webp"), portrait: true },
      { src: projectImage("nescafe-05.webp"), portrait: true },
      { src: projectImage("nescafe-07.webp"), portrait: true },
      { src: projectImage("nescafe-08.webp") },
    ],
  },
  {
    slug: "movemente",
    name: "Movemente",
    category: "corporate",
    image: projectImage("movemente-01.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Um evento corporativo com estrutura de palco e cenografia sob medida.",
      en: "A corporate event with custom stage structure and scenography.",
    },
    images: [
      { src: projectImage("movemente-01.webp") },
      { src: projectImage("movemente-02.webp") },
      { src: projectImage("movemente-03.webp") },
      { src: projectImage("movemente-04.webp") },
      { src: projectImage("movemente-05.webp") },
    ],
  },
  {
    slug: "arcelormittal",
    name: "ArcelorMittal",
    category: "corporate",
    image: projectImage("arcelormittal.webp"),
    year: "2026",
    place: { pt: "Brasil", en: "Brazil" },
    description: {
      pt: "Um espaço corporativo que combina estrutura, identidade e presença institucional.",
      en: "A corporate space combining structure, identity and institutional presence.",
    },
    images: [
      { src: projectImage("arcelormittal-detail-01.webp"), portrait: true },
      { src: projectImage("arcelormittal-detail-03.webp"), portrait: true },
      { src: projectImage("arcelormittal-detail-04.webp"), portrait: true },
      { src: projectImage("arcelormittal-detail-06.webp") },
      { src: projectImage("arcelormittal-detail-07.webp"), portrait: true },
      { src: projectImage("arcelormittal-detail-09.webp") },
    ],
  },
];

export const categoryOrder: ProjectCategory[] = ["entertainment", "activations", "corporate"];

export const categoryLabels: Record<ProjectCategory, Record<Locale, string>> = {
  entertainment: { pt: "Entretenimento", en: "Entertainment" },
  activations: { pt: "Arquitetura Comercial", en: "Commercial Architecture" },
  corporate: { pt: "Corporativo", en: "Corporate" },
};

export const categorySlugs: Record<ProjectCategory, string> = {
  entertainment: "entretenimento",
  activations: "arquitetura-comercial",
  corporate: "corporativo",
};

export const categoryDescriptions: Record<ProjectCategory, Record<Locale, string>> = {
  entertainment: {
    pt: "Palcos, ativações e experiências ao vivo que transformam o público em protagonista, do conceito à produção de ponta a ponta.",
    en: "Stages, activations and live experiences that turn the audience into the protagonist, from concept to end-to-end production.",
  },
  activations: {
    pt: "Arquitetura comercial pensada como ação de marca: ambientes urbanos e comerciais construídos para gerar conexão imediata com o público.",
    en: "Commercial architecture built as a brand statement: urban and commercial environments designed to create an immediate connection with the audience.",
  },
  corporate: {
    pt: "Espaços institucionais e comerciais que traduzem estratégia de marca em presença física marcante, para eventos e ativações corporativas.",
    en: "Institutional and commercial spaces that translate brand strategy into a striking physical presence, for corporate events and activations.",
  },
};
