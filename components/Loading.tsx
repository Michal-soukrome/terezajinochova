"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      className={`inline-block ${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        className="w-full h-full text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
}

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({
  message = "Loading...",
  fullScreen = false,
}: LoadingProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50"
    : "flex flex-col items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-gray-600 text-lg font-medium">{message}</p>
    </div>
  );
}

// Skeleton loader for content
interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = "", lines = 3 }: SkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 rounded"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          style={{
            width: `${Math.random() * 40 + 60}%`, // Random width between 60-100%
          }}
        />
      ))}
    </div>
  );
}

// Page skeleton for product pages
export function ProductPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Breadcrumb skeleton */}
      <div className="mb-8">
        <Skeleton lines={1} className="h-4 w-48" />
      </div>

      {/* Product header skeleton */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image skeleton */}
        <div className="relative h-96 lg:h-[500px] rounded-2xl bg-gray-200 animate-pulse" />

        {/* Content skeleton */}
        <div className="flex flex-col justify-center space-y-6">
          <Skeleton lines={2} className="space-y-2" />
          <div className="h-12 bg-gray-200 rounded animate-pulse w-32" />
          <div className="space-y-3">
            <Skeleton lines={5} />
          </div>
          <div className="h-12 bg-gray-200 rounded animate-pulse w-40" />
        </div>
      </div>

      {/* Content sections skeleton */}
      <div className="space-y-12">
        <div>
          <Skeleton lines={1} className="h-8 w-64 mb-6" />
          <Skeleton lines={4} />
        </div>
      </div>
    </div>
  );
}
