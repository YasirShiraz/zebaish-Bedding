"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserMenu({ isOpen, onClose }: UserMenuProps) {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Menu dropdown with animation */}
      <div
        className="absolute right-0 mt-2 w-72 rounded-xl shadow-2xl ring-1 ring-black/10 z-50 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(249,250,251,0.98) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(229, 231, 235, 0.8)',
          animation: 'slideDown 0.2s ease-out',
        }}
      >
        <div className="py-2">
          {isAuthenticated && user ? (
            <>
              {/* User Info Header with Purple Gradient */}
              <div
                className="px-5 py-4 mb-2"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-white/80 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items with Hover Effects */}
              <Link
                href="/profile"
                className="group flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200"
                onClick={onClose}
                style={{
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgb(243 232 255), rgb(238 242 255))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-110">👨‍💼</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">My Profile</span>
              </Link>

              {/* Admin Panel Link */}
              {(user as any).role === 'ADMIN' && (
                <Link
                  href="/admin"
                  className="group flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200"
                  onClick={onClose}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgb(254 249 195), rgb(253 224 71))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span className="text-xl transition-transform duration-200 group-hover:scale-110">⚙️</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">Admin Panel</span>
                </Link>
              )}

              <Link
                href="/orders"
                className="group flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200"
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgb(240 249 255), rgb(224 242 254))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-110">📦</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">My Orders</span>
              </Link>

              <div className="my-2 mx-4 border-t border-gray-200" />

              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="group flex items-center gap-3 w-full px-5 py-3 text-sm font-medium text-red-600 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgb(254 242 242), rgb(252 231 243))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-110">🚪</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              {/* Guest Welcome Header */}
              <div className="px-5 py-3 mb-2 bg-gradient-to-r from-purple-50 to-pink-50">
                <p className="text-sm font-semibold text-gray-800">Welcome! 👋</p>
                <p className="text-xs text-gray-600 mt-1">Sign in to access your account</p>
              </div>

              <Link
                href="/login"
                className="group flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200"
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgb(240 253 244), rgb(209 250 229))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-110">🔑</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">Login</span>
              </Link>

              <Link
                href="/signup"
                className="group flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200"
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgb(250 245 255), rgb(252 231 243))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-110">✨</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">Sign Up</span>
              </Link>

              <div className="my-2 mx-4 border-t border-gray-200" />

              <Link
                href="/contact"
                className="group flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition-all duration-200"
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgb(240 249 255), rgb(238 242 255))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="text-xl transition-transform duration-200 group-hover:scale-110">💬</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">Contact Us</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

