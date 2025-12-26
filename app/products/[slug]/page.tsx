import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({ select: { slug: true } });
    return products.map((product: { slug: string }) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  // Helper to get image URL safely
  const getImageUrl = (imgJson: string | null) => {
    if (!imgJson) return '/images/placeholder.jpg';
    try {
      const parsed = JSON.parse(imgJson)[0];
      return parsed && (parsed.startsWith('/') || parsed.startsWith('http')) ? parsed : '/images/placeholder.jpg';
    } catch { return '/images/placeholder.jpg'; }
  };

  const imageUrl = getImageUrl(product.images as string);

  return {
    title: product.name,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
  });

  if (!product) {
    notFound();
  }

  // Validation helper
  const getValidImage = (imgJson: string | null) => {
    if (!imgJson) return '/images/placeholder.jpg';
    try {
      const parsed = JSON.parse(imgJson)[0];
      if (parsed && (parsed.startsWith('/') || parsed.startsWith('http'))) {
        return parsed;
      }
    } catch (e) { }
    return '/images/placeholder.jpg';
  };

  const mappedProduct = {
    ...product,
    category: product.category?.name || 'Uncategorized',
    reviews: product.reviews.map(r => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      user: {
        name: r.user.name,
        image: r.user.image
      }
    }))
  };

  // Get related products
  const relatedDbProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      slug: { not: slug }
    },
    take: 4
  });

  const relatedProducts = relatedDbProducts.map((p: any) => ({
    ...p,
    image: getValidImage(p.images as string),
    category: "Related",
    price: p.price
  }));

  return <ProductDetails product={mappedProduct as any} relatedProducts={relatedProducts} />;
}
