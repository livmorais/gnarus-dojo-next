import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

type BadgeCardRootProps = React.ComponentPropsWithoutRef<"article"> &
  VariantProps<typeof badgeCardRootVariants>;
type BadgeCardIconProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof badgeCardIconVariants>;
type BadgeCardContentProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof badgeCardContentVariants>;

const badgeCardRootVariants = cva(
  "flex w-full overflow-hidden rounded-md bg-[linear-gradient(90deg,#292b2e_0%,#22252c_48%,#2a2d34_100%)]",
  {
    variants: {
      variant: {
        default: "min-h-30",
        sm: "min-h-18 bg-surface-subtle",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const badgeCardIconVariants = cva(
  "flex shrink-0 items-center justify-center bg-brand-default",
  {
    variants: {
      variant: {
        default: "w-26 px-2 py-2",
        sm: "w-26 px-1 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const badgeCardContentVariants = cva("flex flex-1 items-center", {
  variants: {
    variant: {
      default: "px-6 py-4",
      sm: "px-6 py-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function BadgeCardRoot({ className, variant, ...props }: BadgeCardRootProps) {
  return (
    <article
      data-slot="ds-badge-card-root"
      className={cn(badgeCardRootVariants({ variant }), className)}
      {...props}
    />
  );
}

function BadgeCardIcon({ className, variant, ...props }: BadgeCardIconProps) {
  return (
    <div
      data-slot="ds-badge-card-icon"
      className={cn(badgeCardIconVariants({ variant }), className)}
      {...props}
    />
  );
}

function BadgeCardContent({
  className,
  variant,
  ...props
}: BadgeCardContentProps) {
  return (
    <div
      data-slot="ds-badge-card-content"
      className={cn(badgeCardContentVariants({ variant }), className)}
      {...props}
    />
  );
}

BadgeCardRoot.displayName = "BadgeCard.Root";
BadgeCardIcon.displayName = "BadgeCard.Icon";
BadgeCardContent.displayName = "BadgeCard.Content";

const BadgeCard = {
  Root: BadgeCardRoot,
  Icon: BadgeCardIcon,
  Content: BadgeCardContent,
};

export {
  BadgeCard,
  BadgeCardContent,
  BadgeCardIcon,
  BadgeCardRoot,
  type BadgeCardContentProps,
  type BadgeCardIconProps,
  type BadgeCardRootProps,
};
