"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated && !isLoading) {
      // If user is already logged in, redirect based on role
      // But we need to wait for user object to be populated
      if (user) {
        if ((user as any).role === 'ADMIN') {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    }
  }, [mounted, isAuthenticated, isLoading, router, user]);

  if (!mounted || (isAuthenticated && !isLoading)) {
    return (
      <div className="bg-white dark:bg-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const user = await login(formData.email, formData.password);
      if (user) {
        if ((user as any).role === 'ADMIN') {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      } else {
        setErrors({ submit: "Invalid email or password. Please try again." });
      }
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-zinc-950 dark:to-zinc-900">
      {/* Left Side - Image/Brand */}
      <div className="hidden lg:block relative h-full">
        <div className="absolute inset-0 bg-gray-900">
          {/* Use a high-quality placeholder if local image not available, or keep existing pattern */}
          <Image
            src="/images/zebaish4.jpg"
            alt="Luxury Bedding"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <Link href="/" className="text-3xl font-serif font-bold tracking-wider">
            ZEBAISH
          </Link>
          <div className="animate-fade-in-up">
            <h1 className="text-5xl font-serif font-medium leading-tight mb-6">
              Welcome Back to <br /> Luxury Living
            </h1>
            <p className="text-lg text-gray-200 max-w-md font-light">
              Sign in to access your saved items, track orders, and discover our latest premium collections.
            </p>
          </div>
          <div className="text-sm text-gray-400">
            © 2025 Zebaish. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-4 sm:p-8 lg:p-16 relative">

        <div className="w-full max-w-md space-y-10 rounded-2xl bg-white/90 dark:bg-zinc-950/90 shadow-xl shadow-black/5 border border-slate-100 dark:border-zinc-800 backdrop-blur">
          <div className="px-6 pt-6 sm:px-8 sm:pt-8 text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600 dark:bg-zinc-900 dark:text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Secure login • Zebaish Members
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sign in to view orders, wishlist, and exclusive bedding offers.
              {" "}
              <span className="block mt-1">
                New here?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-all"
                >
                  Create an account
                </Link>
              </span>
            </p>
          </div>

          <div className="space-y-6 px-6 pb-6 sm:px-8 sm:pb-8">
            {/* Google Login */}
            {/* Social auth */}
            <div className="grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const result = await signInWithPopup(auth, googleProvider);
                    const firebaseUser = result.user;

                    // Sync with app backend
                    const res = await fetch("/api/auth/social-login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email: firebaseUser.email,
                        name: firebaseUser.displayName,
                        image: firebaseUser.photoURL,
                      }),
                    });

                    if (res.ok) {
                      window.location.href = "/";
                    } else {
                      setErrors({ submit: "Failed to sync with server" });
                    }
                  } catch (error: any) {
                    console.error("Google sign in error", error);
                    const errorMsg = error.message || "Failed to sign in with Google";
                    setErrors({ submit: errorMsg });
                  }
                }}
                className="group relative flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all dark:bg-black dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M11.99 10.2v3.6h5.02c-.2 1.14-.81 2.1-1.73 2.75l2.8 2.17C19.96 17.4 21 15.2 21 12.6c0-.44-.04-.86-.11-1.26H11.99z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.62 13.62 5.96 14.1l-2.24 1.73C5.13 19 8.31 21 11.99 21c2.43 0 4.47-.8 5.96-2.18l-2.8-2.17c-.78.54-1.78.87-3.16.87-2.43 0-4.49-1.63-5.21-3.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M4.72 8.83 2.48 7.1C1.54 8.86 1.54 11.02 2.48 12.78c.8 1.56 2.16 2.77 3.74 3.34v-2.5C5.5 12.35 5.3 11.7 5.3 11c0-.7.2-1.35.42-1.98z"
                  />
                  <path
                    fill="#4285F4"
                    d="M11.99 4.5c1.33 0 2.52.46 3.46 1.37l2.58-2.57C16.45 1.8 14.42 1 11.99 1 8.31 1 5.13 3 3.72 6.27l2.9 2.56c.72-2.27 2.78-4.33 5.37-4.33z"
                  />
                </svg>
                <span>Login with Google</span>
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-black px-4 text-gray-500 dark:text-gray-400 lowercase italic">
                  or login with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full rounded-xl border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.email ? "ring-red-500 focus:ring-red-600" : "ring-gray-200 focus:ring-blue-600 dark:ring-gray-800 dark:bg-gray-900 dark:text-white"
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-shadow`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full rounded-xl border-0 py-3.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ${errors.password ? "ring-red-500 focus:ring-red-600" : "ring-gray-200 focus:ring-blue-600 dark:ring-gray-800 dark:bg-gray-900 dark:text-white"
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-shadow`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>
              </div>

              {errors.submit && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 px-4 py-3.5 text-sm font-semibold leading-6 text-white shadow-lg shadow-rose-500/40 ring-1 ring-rose-500/40 transition-all hover:shadow-rose-500/60 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500 disabled:opacity-60 disabled:cursor-not-allowed dark:from-amber-400 dark:via-rose-400 dark:to-fuchsia-500"
              >
                <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(254,249,195,0.28),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(244,114,182,0.35),_transparent_55%)] opacity-60" />
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in to your account"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

