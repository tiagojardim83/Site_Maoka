import type { Metadata } from "next";
import { projects, projectImage, type Project } from "../../data/projects";
import ProjectDetailClient from "../[slug]/ProjectDetailClient";

const itaipavaProject: Project = {
  slug: "itaipava",
  name: "Grupo Petrópolis",
  category: "activations",
  image: projectImage("maoka_itaipava_01.webp"),
  year: "2026",
  place: { pt: "Brasil", en: "Brazil" },
  description: {
    pt: "Um estande premiado que traduz a energia da marca Grupo Petrópolis em uma experiência imersiva de luz, estrutura e presença de marca.",
    en: "An award-winning stand that translates Grupo Petrópolis' brand energy into an immersive experience of light, structure and brand presence.",
  },
  // Photos and behind-the-scenes takes intercalated (photo, video, photo,
  // video...) rather than grouped apart, per Tiago's request. Every asset
  // here is portrait, so groupProjectImages lays them out in rows of
  // portraitRowSize, in this exact order.
  images: [
    { src: projectImage("maoka_itaipava_01.webp"), portrait: true },
    { src: projectImage("grupo-petropolis-video-01.mp4"), portrait: true, type: "video" },
    { src: projectImage("maoka_itaipava_02.webp"), portrait: true },
    { src: projectImage("grupo-petropolis-video-02.mp4"), portrait: true, type: "video" },
    { src: projectImage("maoka_itaipava_03.webp"), portrait: true },
    { src: projectImage("grupo-petropolis-video-03.mp4"), portrait: true, type: "video" },
    { src: projectImage("maoka_itaipava_04.webp"), portrait: true },
    { src: projectImage("grupo-petropolis-video-04.mp4"), portrait: true, type: "video" },
    { src: projectImage("maoka_itaipava_05.webp"), portrait: true },
    { src: projectImage("grupo-petropolis-video-05.mp4"), portrait: true, type: "video" },
    { src: projectImage("maoka_itaipava_06.webp"), portrait: true },
    { src: projectImage("grupo-petropolis-video-06.mp4"), portrait: true, type: "video" },
    { src: projectImage("grupo-petropolis-video-07.mp4"), portrait: true, type: "video" },
  ],
  portraitRowSize: 3,
};

export const metadata: Metadata = {
  title: itaipavaProject.name,
  description: itaipavaProject.description.pt,
};

export default function ItaipavaDetailPage() {
  return <ProjectDetailClient project={itaipavaProject} others={projects.slice(0, 3)} />;
}
