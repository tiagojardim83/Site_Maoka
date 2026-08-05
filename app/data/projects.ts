export type Locale = "pt" | "en";

export type ProjectCategory = "entertainment" | "corporate" | "activations";

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
  images?: string[];
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
    images: [1, 2, 3, 4, 5, 6].map((n) => projectImage(`unigames-0${n}.webp`)),
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
    images: [1, 2, 3, 4].map((n) => projectImage(`shein-0${n}.webp`)),
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
    images: [1, 2, 3, 4, 5, 6].map((n) => projectImage(`purina-0${n}.webp`)),
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
    images: [1, 2, 3, 4, 5, 6, 7].map((n) => projectImage(`arraial-0${n}.webp`)),
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
    images: [1, 2, 3, 4, 5].map((n) => projectImage(`ultimo-samba-0${n}.webp`)),
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
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => projectImage(`anninha-0${n}.webp`)),
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
    images: [1, 2, 3, 4, 5, 6, 7].map((n) => projectImage(`imperio-detail-0${n}.webp`)),
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
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => projectImage(`toka-detail-0${n}.webp`)),
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
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => projectImage(`nescafe-${String(n).padStart(2, "0")}.webp`)),
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
    images: [1, 2, 3, 4, 5].map((n) => projectImage(`movemente-0${n}.webp`)),
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
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => projectImage(`arcelormittal-detail-0${n}.webp`)),
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
