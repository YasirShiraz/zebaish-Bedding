"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    images: string;
    slug: string;
  };
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  city: string;
  items: OrderItem[];
}

export default function Orders() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/login?redirect=/orders");
    }
  }, [mounted, isAuthenticated, isLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;

      try {
        const res = await fetch('/api/orders/list');
        const contentType = res.headers.get("content-type");

        if (res.ok && contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setOrders(data);
        } else {
          const errorText = await res.text();
          console.error("Orders fetch failed status:", res.status);
          console.error("Orders fetch failed body:", errorText);
          toast.error("Failed to load orders history");
        }
      } catch (err) {
        console.error("Orders fetch error:", err);
        toast.error("Something went wrong while loading orders");
      } finally {
        setIsFetching(false);
      }
    };

    if (mounted && isAuthenticated) {
      fetchOrders();
    }
  }, [mounted, isAuthenticated]);

  const toggleExpand = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  if (!mounted || isLoading) {
    return (
      <div className="bg-white dark:bg-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "PROCESSING":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "SHIPPED":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "CANCELLED":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    }
  };

  return (
    <div className="bg-gray-50/50 dark:bg-black min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 pt-12 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <nav className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">
                <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">My Orders</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
                Orders History
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage your recent orders and track their delivery status.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {isFetching ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div>
            <p className="text-sm font-medium text-gray-500">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="bg-gray-50 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No orders found</h3>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Looks like you haven't placed any orders yet. Explore our latest collections and start shopping!
            </p>
            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Browse Our Store
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const date = new Date(order.createdAt);
              const isExpanded = expandedOrders.has(order.id);

              return (
                <div
                  key={order.id}
                  className="group bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700"
                >
                  {/* Order Main Row */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-6 pb-6 border-b border-gray-50 dark:border-gray-800/50">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                          <span className="text-xs font-bold text-black dark:text-white px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">#{order.id.slice(-8).toUpperCase()}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Placed on {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="h-10 w-[1px] bg-gray-100 dark:bg-gray-800 mx-2 hidden sm:block"></div>
                        <div className="text-right">
                          <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</span>
                          <span className="text-xl font-bold text-gray-900 dark:text-white">Rs {Math.round(order.total).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Preview Images */}
                    <div className="mt-8 flex flex-col md:flex-row items-center gap-8">
                      <div className="flex -space-x-4 overflow-hidden py-2 shrink-0">
                        {order.items.slice(0, 3).map((item, idx) => {
                          const imgObj = JSON.parse(item.product.images || '[]');
                          const img = imgObj[0] || '/images/placeholder.jpg';
                          return (
                            <div key={item.id} className={`relative h-20 w-20 rounded-2xl border-4 border-white dark:border-gray-900 overflow-hidden ring-1 ring-gray-100 dark:ring-gray-800 transition-transform group-hover:translate-y-[-4px]`} style={{ zIndex: 10 - idx }}>
                              <Image src={img} alt={item.product.name} fill className="object-cover" />
                            </div>
                          );
                        })}
                        {order.items.length > 3 && (
                          <div className="relative h-20 w-20 rounded-2xl border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-500 z-0">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'} in this order
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => toggleExpand(order.id)}
                            className="text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:underline underline-offset-4"
                          >
                            {isExpanded ? 'Collapse Details' : 'View Full Details'}
                          </button>
                          <span className="text-gray-300">•</span>
                          <Link href="/contact" className="text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:underline underline-offset-4">
                            Need Help?
                          </Link>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <Link
                          href={`/products/${order.items[0]?.product.slug}`}
                          className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-gray-100 dark:border-gray-800 text-xs font-bold uppercase tracking-widest text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                        >
                          Buy Again
                        </Link>
                      </div>
                    </div>

                    {/* Expanded Section */}
                    {isExpanded && (
                      <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-800 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                          {/* Items List */}
                          <div className="lg:col-span-2 space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Items Summary</h4>
                            {order.items.map((item) => {
                              const imgObj = JSON.parse(item.product.images || '[]');
                              const img = imgObj[0] || '/images/placeholder.jpg';
                              return (
                                <div key={item.id} className="flex gap-4 items-center p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/40">
                                  <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0">
                                    <Image src={img} alt={item.product.name} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <Link href={`/products/${item.product.slug}`} className="block text-sm font-bold text-gray-900 dark:text-white hover:underline truncate">
                                      {item.product.name}
                                    </Link>
                                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity} × Rs {Math.round(item.price).toLocaleString()}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Rs {Math.round(item.price * item.quantity).toLocaleString()}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Shipping info */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Shipping Info</h4>
                              <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-3xl space-y-3">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{order.customerName}</p>
                                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                  <p>{order.address}</p>
                                  <p>{order.city}</p>
                                  <p className="pt-2 font-medium">{order.phone}</p>
                                  <p>{order.customerEmail}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Order Summary</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-500">
                                  <span>Subtotal</span>
                                  <span>Rs {Math.round(order.total).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                  <span>Shipping</span>
                                  <span className="text-green-600 font-bold uppercase text-[10px] tracking-wider">Free</span>
                                </div>
                                <div className="flex justify-between pt-3 mt-2 border-t border-gray-100 dark:border-gray-800 text-lg font-bold text-gray-900 dark:text-white">
                                  <span>Total</span>
                                  <span>Rs {Math.round(order.total).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
