"use client";

import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

type CardWrapperRootProps = React.ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
  borderPosition?: "top" | "left" | "right";
  interactive?: boolean;
  rounded?: "default" | "lg";
  context?: "default" | "info";
};

type CardWrapperContentProps = React.ComponentPropsWithoutRef<"div">;
type CardWrapperMetadataProps = React.ComponentPropsWithoutRef<"div">;

const cardWrapperRootVariants = cva(
  [
    "relative isolate w-full items-center gap-4 overflow-hidden",
    "bg-surface-brand p-4 text-text-title md:p-6",
    "before:pointer-events-none before:absolute before:z-0 before:content-['']",
    "transition-[background-color,color] duration-200 ease",
  ],
  {
    variants: {
      borderPosition: {
        top: "before:left-0 before:top-0 before:right-0 before:h-1",
        left: "before:left-0 before:top-0 before:bottom-0 before:w-1",
        right: "before:right-0 before:top-0 before:bottom-0 before:w-1",
      },
      context: {
        default: "before:bg-brand-logo",
        info: "before:bg-[linear-gradient(35deg,#7F98D5_-2.05%,#BFCBE7_81.02%)]",
      },
      interactive: {
        true: [
          "cursor-pointer",
          "*:relative *:z-10",
          "after:pointer-events-none after:absolute after:inset-0 after:z-0 after:rounded-[inherit] after:border after:border-transparent after:opacity-0 after:transition-opacity after:duration-300 after:content-['']",
          "after:[background:linear-gradient(35deg,#7F98D5_-2.05%,#BFCBE7_81.02%)_border-box]",
          "after:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]",
          "after:[-webkit-mask-composite:xor]",
          "after:[mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]",
          "after:mask-exclude",
          "hover:bg-brand-logo hover:**:text-text-main-card-title hover:after:opacity-100",
          "focus-visible:bg-brand-logo focus-visible:text-text-main-card-title focus-visible:outline-none focus-visible:after:opacity-100",
          "hover:[&_h1]:text-text-main-card-title hover:[&_h2]:text-text-main-card-title hover:[&_h3]:text-text-main-card-title hover:[&_p]:text-text-main-card-title hover:[&_span]:text-text-main-card-title",
          "focus-visible:[&_h1]:text-text-main-card-title focus-visible:[&_h2]:text-text-main-card-title focus-visible:[&_h3]:text-text-main-card-title focus-visible:[&_p]:text-text-main-card-title focus-visible:[&_span]:text-text-main-card-title",
          "[&_[data-slot=ds-card-wrapper-content]_*]:transition-colors [&_[data-slot=ds-card-wrapper-metadata]_*]:transition-colors",
        ],
        false: "",
      },
      rounded: {
        default:
          "rounded-sm data-[border-position=top]:before:rounded-t-sm data-[border-position=left]:before:rounded-l-sm data-[border-position=right]:before:rounded-r-sm",
        lg: "rounded-xl data-[border-position=top]:before:rounded-t-xl data-[border-position=left]:before:rounded-l-xl data-[border-position=right]:before:rounded-r-xl",
      },
    },
    defaultVariants: {
      borderPosition: "top",
      interactive: false,
      rounded: "default",
      context: "default",
    },
  },
);

function CardWrapperRoot({
  asChild = false,
  borderPosition = "top",
  children,
  className,
  context = "default",
  interactive = false,
  rounded = "default",
  ...props
}: CardWrapperRootProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-border-position={borderPosition}
      data-slot="ds-card-wrapper-root"
      className={cn(
        cardWrapperRootVariants({
          borderPosition,
          context,
          interactive,
          rounded,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

function CardWrapperContent({ className, ...props }: CardWrapperContentProps) {
  return (
    <div
      data-slot="ds-card-wrapper-content"
      className={cn("flex w-full min-w-0 flex-col gap-2 md:gap-3", className)}
      {...props}
    />
  );
}

function CardWrapperMetadata({
  className,
  ...props
}: CardWrapperMetadataProps) {
  return (
    <div
      data-slot="ds-card-wrapper-metadata"
      className={cn(
        "ml-auto flex shrink-0 items-center justify-end gap-3",
        className,
      )}
      {...props}
    />
  );
}

CardWrapperRoot.displayName = "CardWrapper.Root";
CardWrapperContent.displayName = "CardWrapper.Content";
CardWrapperMetadata.displayName = "CardWrapper.Metadata";

const CardWrapper = {
  Root: CardWrapperRoot,
  Content: CardWrapperContent,
  Metadata: CardWrapperMetadata,
};

export {
  CardWrapper,
  CardWrapperContent,
  CardWrapperMetadata,
  CardWrapperRoot,
  type CardWrapperRootProps,
};
