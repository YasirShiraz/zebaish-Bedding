export default function FAQ() {
    return (
        <div className="bg-white dark:bg-black min-h-screen py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-serif">
                    Frequently Asked Questions
                </h1>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            What payment methods do you accept?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            We accept Cash on Delivery (COD) and direct bank transfers. We will
                            contact you to confirm payment details for online transfers.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Do you ship internationally?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Currently, we only ship within Pakistan. We plan to expand to international
                            shipping in the future.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            How can I track my order?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            You can track your order by logging into your account and visiting the
                            "Orders" page. You will also receive email updates about your
                            order status.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Can I cancel my order?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Yes, you can cancel your order before it has been shipped. Please
                            contact our customer support immediately if you wish to cancel.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
