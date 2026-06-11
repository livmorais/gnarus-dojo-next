"use client";

import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

type AvatarSize = "md" | "lg";

type AvatarProps = {
  imageLink: string | null;
  initials: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  size?: AvatarSize;
  unoptimized?: boolean;
  enhanceImageQuality?: boolean;
};

const avatarRootVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
  {
    variants: {
      size: {
        md: "size-10",
        lg: "size-27",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const avatarFallbackVariants = cva(
  [
    "inline-flex size-full items-center justify-center rounded-full",
    "border border-brand-default/20 bg-surface-brand",
    "font-encode-sans font-medium uppercase text-brand-default",
  ],
  {
    variants: {
      size: {
        md: "text-xs md:text-base",
        lg: "text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const avatarImageDimensions: Record<AvatarSize, number> = {
  md: 80,
  lg: 110,
};
const AVATAR_IMAGE_REQUEST_SIZE = "500";

function normalizeInitials(initials: string) {
  return initials.trim().slice(0, 2).toUpperCase();
}

function buildAvatarImageSrc(imageLink: string) {
  const [urlWithoutHash, hash = ""] = imageLink.split("#", 2);
  const [pathname, search = ""] = urlWithoutHash.split("?", 2);
  const searchParams = new URLSearchParams(search);

  searchParams.set("size", AVATAR_IMAGE_REQUEST_SIZE);

  if (searchParams.has("width")) {
    searchParams.set("width", AVATAR_IMAGE_REQUEST_SIZE);
  }

  if (searchParams.has("height")) {
    searchParams.set("height", AVATAR_IMAGE_REQUEST_SIZE);
  }

  const queryString = searchParams.toString();
  const hashSuffix = hash ? `#${hash}` : "";

  if (!queryString) {
    return `${pathname}${hashSuffix}`;
  }

  return `${pathname}?${queryString}${hashSuffix}`;
}

export function Avatar({
  imageLink,
  initials,
  alt = "",
  className,
  imageClassName,
  size = "md",
  unoptimized = false,
  enhanceImageQuality = false,
}: AvatarProps) {
  const normalizedInitials = normalizeInitials(initials);

  if (imageLink) {
    const dimension = avatarImageDimensions[size];
    const avatarImageSrc = enhanceImageQuality
      ? buildAvatarImageSrc(imageLink)
      : imageLink;

    return (
      <Image
        src={avatarImageSrc}
        alt={alt}
        width={dimension}
        height={dimension}
        unoptimized={unoptimized}
        className={cn(avatarRootVariants({ size }), className, imageClassName)}
      />
    );
  }

  return (
    <span className={cn(avatarRootVariants({ size }), className)}>
      <span className={cn(avatarFallbackVariants({ size }))}>
        {normalizedInitials}
      </span>
    </span>
  );
}

export type { AvatarProps, AvatarSize };
