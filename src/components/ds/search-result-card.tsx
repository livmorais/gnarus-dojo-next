"use client";

import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

type SearchResultCardRootProps = React.ComponentPropsWithoutRef<"article"> & {
  accentColor?: string;
  accentColorAsGradient?: boolean;
  asChild?: boolean;
  interactive?: boolean;
  rounded?: "default" | "lg";
};

type SearchResultCardContentProps = React.ComponentPropsWithoutRef<"div">;

type SearchResultCardHeaderProps = React.ComponentPropsWithoutRef<"div">;

type SearchResultCardFooterProps = React.ComponentPropsWithoutRef<"div"> & {
  variant?: "default" | "plain";
};

type SearchResultCardTitleProps = React.ComponentPropsWithoutRef<"h3">;

type SearchResultCardDescriptionProps = React.ComponentPropsWithoutRef<"p">;

type SearchResultCardNumeralProps = React.ComponentPropsWithoutRef<"div">;

const searchResultCardRootVariants = cva(
  [
    "group relative flex min-h-100 w-full max-w-none flex-col overflow-hidden bg-search-result-card-background text-text-title md:max-w-68",
    "ring-2 ring-transparent",
    "outline-solid outline-2 outline-transparent -outline-offset-2",
    "transition-[opacity,transform,box-shadow,color,outline-color] duration-300 ease-out",
    "focus-visible:outline-brand-hover shadow hover:shadow-md",
  ],
  {
    variants: {
      interactive: {
        true: "cursor-pointer hover:ring-brand-hover",
        false: "",
      },
      rounded: {
        default: "rounded-sm",
        lg: "rounded-xl",
      },
    },
  },
);

const searchResultCardFooterVariants = cva(
  [
    "relative min-h-12 mt-auto flex items-center justify-between gap-3 border-t-2 px-4 py-3",
    "before:pointer-events-none before:absolute before:inset-x-0 before:-top-0.5 before:h-0.5 before:bg-(image:--search-result-card-top-border-gradient,none) before:content-['']",
  ],
  {
    variants: {
      variant: {
        default:
          "border-t-(--search-result-card-accent) [background:linear-gradient(91deg,var(--color-search-result-card-footer-gradient-start)_0.88%,var(--color-search-result-card-footer-gradient-end)_99.18%)]",
        plain: "border-t-transparent bg-surface-default",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function SearchResultCardRoot({
  accentColor,
  accentColorAsGradient = false,
  asChild = false,
  children,
  className,
  interactive = false,
  rounded = "default",
  style,
  ...props
}: SearchResultCardRootProps) {
  const Comp = asChild ? Slot : "article";
  const resolvedAccentColor =
    accentColor ?? "var(--color-feedback-info-default)";
  const resolvedTopBorderGradient = accentColorAsGradient
    ? "var(--color-category-overlay)"
    : undefined;

  const resolvedStyle = {
    ...style,
    "--search-result-card-accent": resolvedAccentColor,
    ...(resolvedTopBorderGradient
      ? {
          "--search-result-card-top-border-gradient": resolvedTopBorderGradient,
        }
      : {}),
  } as React.CSSProperties;

  return (
    <Comp
      {...props}
      className={cn(
        searchResultCardRootVariants({
          interactive,
          rounded,
        }),
        className,
      )}
      style={resolvedStyle}
    >
      {children}
    </Comp>
  );
}

function SearchResultCardHeader({
  className,
  ...props
}: Readonly<SearchResultCardHeaderProps>) {
  return (
    <div
      data-slot="ds-search-result-card-header"
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      {...props}
    />
  );
}

function SearchResultCardContent({
  className,
  ...props
}: Readonly<SearchResultCardContentProps>) {
  return (
    <div
      data-slot="ds-search-result-card-content"
      className={cn("flex flex-1 flex-col gap-4 px-6 pt-6 pb-6", className)}
      {...props}
    />
  );
}

function SearchResultCardFooter({
  className,
  variant = "default",
  ...props
}: SearchResultCardFooterProps) {
  return (
    <div
      data-slot="ds-search-result-card-footer"
      className={cn(searchResultCardFooterVariants({ variant }), className)}
      {...props}
    />
  );
}

function SearchResultCardTitle({
  className,
  ...props
}: Readonly<SearchResultCardTitleProps>) {
  return (
    <h3
      data-slot="ds-search-result-card-title"
      className={cn(
        "font-encode-sans line-clamp-3 text-[26px] leading-[1.3] font-light text-text-title transition-colors duration-300 ease-out group-hover:text-brand-light group-focus-visible:text-brand-light md:text-xl md:leading-[1.35] md:font-normal",
        className,
      )}
      {...props}
    >
      {props?.children}
    </h3>
  );
}

function SearchResultCardDescription({
  className,
  ...props
}: Readonly<SearchResultCardDescriptionProps>) {
  return (
    <p
      data-slot="ds-search-result-card-description"
      className={cn(
        "line-clamp-4 font-roboto-flex text-lg leading-[1.56] font-thin text-text-body md:text-base md:leading-normal",
        className,
      )}
      {...props}
    />
  );
}

function SearchResultCardNumeral({
  className,
  ...props
}: Readonly<SearchResultCardNumeralProps>) {
  return (
    <div
      data-slot="ds-search-result-card-numeral"
      className={cn(
        "absolute top-0 right-0 flex size-11 items-center justify-center rounded-bl-sm bg-search-result-card-numeral-block px-3.5 py-4.5 text-center",
        className,
      )}
      {...props}
    />
  );
}

SearchResultCardRoot.displayName = "SearchResultCard.Root";
SearchResultCardHeader.displayName = "SearchResultCard.Header";
SearchResultCardContent.displayName = "SearchResultCard.Content";
SearchResultCardFooter.displayName = "SearchResultCard.Footer";
SearchResultCardTitle.displayName = "SearchResultCard.Title";
SearchResultCardDescription.displayName = "SearchResultCard.Description";
SearchResultCardNumeral.displayName = "SearchResultCard.Numeral";

const SearchResultCard = {
  Root: SearchResultCardRoot,
  Header: SearchResultCardHeader,
  Content: SearchResultCardContent,
  Footer: SearchResultCardFooter,
  Title: SearchResultCardTitle,
  Description: SearchResultCardDescription,
  Numeral: SearchResultCardNumeral,
};

export {
  SearchResultCard,
  SearchResultCardContent,
  SearchResultCardDescription,
  SearchResultCardFooter,
  SearchResultCardHeader,
  SearchResultCardNumeral,
  SearchResultCardRoot,
  SearchResultCardTitle,
  type SearchResultCardNumeralProps,
  type SearchResultCardRootProps,
};
