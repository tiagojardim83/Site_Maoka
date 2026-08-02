import type { Metadata } from "next";
import { projects, projectImage, type Project } from "../../data/projects";
import ProjectDetailClient from "../[slug]/ProjectDetailClient";

const itaipavaProject: Project = {
  slug: "itaipava",
  name: "Itaipava",
  category: "activations",
  image: projectImage("maoka_itaipava_01.webp"),
  year: "2026",
  place: { pt: "Brasil", en: "Brazil" },
  description: {
    pt: "Um estande premiado que traduz a energia da marca Itaipava em uma experiência imersiva de luz, estrutura e presença de marca.",
    en: "An award-winning stand that translates Itaipava's brand energy into an immersive experience of light, structure and brand presence.",
  },
};

export const metadata: Metadata = {
  title: itaipavaProject.name,
  description: itaipavaProject.description.pt,
};

export default function ItaipavaDetailPage() {
  return <ProjectDetailClient project={itaipavaProject} others={projects.slice(0, 3)} />;
}
