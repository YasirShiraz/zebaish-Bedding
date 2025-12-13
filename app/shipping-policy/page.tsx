export default function ShippingPolicy() {
    return (
        <div className="bg-white dark:bg-black min-h-screen py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-serif">
                    Shipping Policy
                </h1>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    <p className="mb-4">
                        At Zebaish Bedding, we are dedicated to delivering your order with
                        speed and care.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                        Delivery Time
                    </h2>
                    <p className="mb-4">
                        Standard delivery takes 3-5 business days. Orders placed on weekends
                        or holidays will be processed on the next business day.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                        Shipping Charges
                    </h2>
                    <p className="mb-4">
                        We offer free shipping on all orders nationwide.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                        Order Tracking
                    </h2>
                    <p className="mb-4">
                        Once your order is shipped, you will receive a confirmation email
                        with a tracking number. You can also track your order status in the
                        "My Orders" section of your account.
                    </p>
                </div>
            </div>
        </div>
    );
}
