import Link from 'next/link';
import { Prisma } from '@prisma/client';

type ReviewWithUserAndProduct = Prisma.ReviewGetPayload<{
    include: {
        user: true;
        product: true;
    }
}>;

export default function RecentReviews({ reviews }: { reviews: ReviewWithUserAndProduct[] }) {
    const renderStars = (rating: number) => {
        return (
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Recent Reviews</h2>
                <Link href="/admin/reviews" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View All
                </Link>
            </div>
            <div className="divide-y divide-gray-100">
                {reviews.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No reviews yet.</div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                        {(review.user.name?.[0] || 'U').toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{review.user.name}</p>
                                        <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                {renderStars(review.rating)}
                            </div>
                            <Link href={`/admin/products/${review.product.slug}`} className="text-xs text-blue-500 hover:underline mb-2 block font-medium">
                                {review.product.name}
                            </Link>
                            <p className="text-sm text-gray-600 line-clamp-2 italic">"{review.comment}"</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
