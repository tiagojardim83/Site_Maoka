import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  projects,
  categoryOrder,
  categorySlugs,
  categoryLabels,
  categoryDescriptions,
} from "../../data/projects";
import CategoryDetailClient from "./CategoryDetailClient";

export function generateStaticParams() {
  return categoryOrder.map((category) => ({ slug: categorySlugs[category] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryOrder.find((c) => categorySlugs[c] === slug);
  if (!category) return {};
  return {
    title: categoryLabels[category].pt,
    description: categoryDescriptions[category].pt,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = categoryOrder.findIndex((c) => categorySlugs[c] === slug);
  const category = categoryOrder[index];
  if (!category) notFound();

  const categoryProjects = projects.filter((project) => project.category === category);
  const otherCategories = [
    ...categoryOrder.slice(index + 1),
    ...categoryOrder.slice(0, index),
  ];

  return (
    <CategoryDetailClient
      category={category}
      categoryProjects={categoryProjects}
      otherCategories={otherCategories}
    />
  );
}
