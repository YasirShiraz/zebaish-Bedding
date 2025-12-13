import { notFound } from "next/navigation";
import { allCollections } from "@/lib/products";
import ProductDetails from "@/components/ProductDetails";

export async function generateStaticParams() {
  return allCollections.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = allCollections.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current)
  const relatedProducts = allCollections
    .filter((p) => p.category === product.category && p.slug !== slug)
    .slice(0, 3);

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
