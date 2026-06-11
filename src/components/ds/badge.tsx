import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

type BadgeVariant = "active" | "empty" | "category" | "inverted";
type BadgeDotTone = "success" | "neutral" | "warning" | "error" | "info";
type BadgeLabelSize = "sm" | "xs";

type BadgeRootProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeRootVariants> & {
    asChild?: boolean;
  };

type BadgeDotProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeDotVariants>;

type BadgeLabelProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeLabelVariants>;

const badgeRootVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center rounded-full",
    "transition-[background-color,color,border-color] duration-200",
  ],
  {
    variants: {
      variant: {
        active: "gap-2 bg-transparent text-text-title",
        empty: "gap-2 bg-transparent text-text-title",
        category:
          "border border-border-default bg-transparent px-4 py-1 text-text-title",
        inverted:
          "border border-transparent bg-brand-logo px-4 py-1 text-border-subtle",
      },
      bordered: {
        true: "border border-border-default px-4 py-1",
        false: null,
      },
    },
    compoundVariants: [
      {
        variant: "inverted",
        bordered: true,
        className: "border-transparent",
      },
      {
        variant: "category",
        bordered: true,
        className: "text-text-title",
      },
    ],
    defaultVariants: {
      bordered: true,
      variant: "active",
    },
  },
);

const badgeDotVariants = cva("size-2 shrink-0 rounded-full", {
  variants: {
    tone: {
      success: "bg-feedback-success-default",
      neutral: "bg-icon-secondary",
      warning: "bg-feedback-attention-default",
      error: "bg-feedback-error-default",
      info: "bg-feedback-info-default",
    },
  },
  defaultVariants: {
    tone: "success",
  },
});

const badgeLabelVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap uppercase",
    "font-jetbrains-mono font-medium tracking-[-0.03em]",
  ],
  {
    variants: {
      size: {
        sm: "text-sm leading-6",
        xs: "text-xs leading-none",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

function BadgeRoot({
  asChild = false,
  bordered = true,
  className,
  variant = "active",
  ...props
}: BadgeRootProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(badgeRootVariants({ bordered, variant }), className)}
      data-bordered={bordered}
      data-slot="ds-badge-root"
      data-variant={variant}
      {...props}
    />
  );
}

function BadgeDot({ className, tone = "success", ...props }: BadgeDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(badgeDotVariants({ tone }), className)}
      data-slot="ds-badge-dot"
      data-tone={tone}
      {...props}
    />
  );
}

function BadgeLabel({ className, size = "sm", ...props }: BadgeLabelProps) {
  return (
    <span
      className={cn(badgeLabelVariants({ size }), className)}
      data-slot="ds-badge-label"
      data-size={size}
      {...props}
    />
  );
}

BadgeRoot.displayName = "Badge.Root";
BadgeDot.displayName = "Badge.Dot";
BadgeLabel.displayName = "Badge.Label";

const Badge = {
  Root: BadgeRoot,
  Dot: BadgeDot,
  Label: BadgeLabel,
};

export {
  Badge,
  BadgeDot,
  BadgeLabel,
  BadgeRoot,
  badgeDotVariants,
  badgeLabelVariants,
  badgeRootVariants,
  type BadgeDotTone,
  type BadgeLabelSize,
  type BadgeRootProps,
  type BadgeVariant,
};
