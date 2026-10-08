import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.contact.website;
  const staticRoutes = ["", "/about", "/solutions", "/products", "/partners", "/contact"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...solutions.map((solution) => ({
      url: `${base}/solutions/${solution.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...products.map((product) => ({
      url: `${base}/products/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
