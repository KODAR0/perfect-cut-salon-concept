"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  placeholderLabel?: string;
}

export function SafeImage({
  src,
  alt,
  className,
  sizes,
  priority = false,
  placeholderLabel = "Image unavailable",
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const resolvedSrc = src.startsWith("/") ? `${basePath}${src}` : src;

  if (failed) {
    return (
      <div
        className="absolute inset-0 grid place-items-center bg-graphite text-center text-cream/60"
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-3 px-5">
          <ImageOff aria-hidden="true" className="size-7" />
          <span className="text-sm">{placeholderLabel}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={
          "absolute inset-0 bg-graphite transition-opacity duration-500 " +
          (loaded ? "opacity-0" : "opacity-100")
        }
        aria-hidden="true"
      />
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
}
