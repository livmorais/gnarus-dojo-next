"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

export type CheckpointCardStatus = "default" | "completed";

type CheckpointCardRootProps = React.ComponentPropsWithoutRef<"article"> & {
  asChild?: boolean;
  interactive?: boolean;
  status?: CheckpointCardStatus;
};

type CheckpointCardTrackProps = React.ComponentPropsWithoutRef<"div">;
type CheckpointCardRailProps = React.ComponentPropsWithoutRef<"div">;
type CheckpointCardIndexProps = React.ComponentPropsWithoutRef<"div">;
type CheckpointCardContentProps = React.ComponentPropsWithoutRef<"div">;
type CheckpointCardTitleProps = React.ComponentPropsWithoutRef<"h3">;
type CheckpointCardFooterProps = React.ComponentPropsWithoutRef<"div">;
type CheckpointCardButtonProps = React.ComponentPropsWithoutRef<typeof Link>;
type CheckpointCardMetaProps = React.ComponentPropsWithoutRef<"div">;
type CheckpointCardAsideProps = React.ComponentPropsWithoutRef<"aside">;
type CheckpointCardAsideHeaderProps = React.ComponentPropsWithoutRef<"div">;
type CheckpointCardDescriptionProps = React.ComponentPropsWithoutRef<"p">;

type CheckpointCardContextValue = {
  status: CheckpointCardStatus;
};

const CheckpointCardContext =
  React.createContext<CheckpointCardContextValue | null>(null);

const checkpointCardRootVariants = cva(
  [
    "group isolate overflow-hidden rounded-sm text-text-title",
    "grid min-w-0 grid-cols-[5.5rem_minmax(0,1fr)]",
    "transition-[box-shadow,transform] duration-200 ease-out",
    "md:grid-cols-[7.5rem_minmax(0,1fr)]",
  ],
  {
    variants: {
      interactive: {
        true: [
          "cursor-pointer hover:-translate-y-0.5 hover:shadow-2xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-secondary",
        ],
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
    },
  },
);

const checkpointCardStatusStyles: Record<
  CheckpointCardStatus,
  React.CSSProperties
> = {
  default: {
    "--checkpoint-card-rail-bg": "var(--color-feedback-checkpoint-default)",
    "--checkpoint-card-rail-bg-hover": "var(--color-button-primary-default)",
  } as React.CSSProperties,
  completed: {
    "--checkpoint-card-rail-bg": "var(--color-feedback-success-default)",
    "--checkpoint-card-rail-bg-hover": "var(--color-feedback-success-default)",
  } as React.CSSProperties,
};

function useCheckpointCardContext() {
  const context = React.useContext(CheckpointCardContext);

  if (!context) {
    throw new Error(
      "CheckpointCard compound components must be used within CheckpointCard.Root",
    );
  }

  return context;
}

function CheckpointCardRoot({
  asChild = false,
  children,
  className,
  interactive = false,
  status = "default",
  style,
  ...props
}: CheckpointCardRootProps) {
  const Comp = asChild ? Slot : "article";
  const resolvedStyle = {
    ...checkpointCardStatusStyles[status],
    ...style,
  };

  const contextValue = React.useMemo(() => ({ status }), [status]);

  return (
    <CheckpointCardContext.Provider value={contextValue}>
      <Comp
        data-slot="ds-checkpoint-card-root"
        data-status={status}
        className={cn(
          checkpointCardRootVariants({
            interactive,
          }),
          className,
        )}
        style={resolvedStyle}
        {...props}
      >
        {children}
      </Comp>
    </CheckpointCardContext.Provider>
  );
}

function CheckpointCardTrack({
  className,
  ...props
}: Readonly<CheckpointCardTrackProps>) {
  return (
    <div
      data-slot="ds-checkpoint-card-track"
      className={cn(
        "grid h-full min-h-full grid-cols-[2.75rem_2.75rem]",
        "md:min-h-26 md:grid-cols-[3.75rem_3.75rem]",
        className,
      )}
      {...props}
    />
  );
}

function CheckpointCardRail({
  className,
  ...props
}: Readonly<CheckpointCardRailProps>) {
  const { status } = useCheckpointCardContext();

  return (
    <div
      data-slot="ds-checkpoint-card-rail"
      data-status={status}
      className={cn(
        "flex items-center justify-center bg-(--checkpoint-card-rail-bg) text-white transition-colors duration-200",
        "group-hover:bg-(--checkpoint-card-rail-bg-hover)",
        "px-2 py-3 [&_svg]:size-4 [&_svg]:shrink-0",
        "md:px-3 md:py-4 md:[&_svg]:size-4.5",
        className,
      )}
      {...props}
    />
  );
}

function CheckpointCardIndex({
  className,
  ...props
}: Readonly<CheckpointCardIndexProps>) {
  return (
    <div
      data-slot="ds-checkpoint-card-index"
      className={cn(
        "flex items-center justify-center bg-border-subtle px-2 py-3",
        "font-encode-sans text-[1.75rem] leading-6 font-extralight text-text-title",
        "md:px-3 md:py-4 md:text-[2rem]",
        className,
      )}
      {...props}
    />
  );
}

function CheckpointCardContent({
  className,
  ...props
}: Readonly<CheckpointCardContentProps>) {
  return (
    <div
      data-slot="ds-checkpoint-card-content"
      className={cn(
        "flex min-w-0 flex-col justify-center gap-4 bg-surface-default px-4 py-4 transition-colors duration-200",
        "group-hover:bg-surface-secondary",
        "md:gap-5 md:px-6 md:py-5",
        "lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-6",
        className,
      )}
      {...props}
    />
  );
}

function CheckpointCardTitle({
  className,
  children,
  ...props
}: Readonly<CheckpointCardTitleProps>) {
  return (
    <h3
      data-slot="ds-checkpoint-card-title"
      className={cn(
        "min-w-0 text-balance font-encode-sans text-[1.5rem] leading-[1.1] font-light text-text-title",
        "md:text-[1.75rem]",
        "lg:text-[2rem]",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function CheckpointCardFooter({
  className,
  ...props
}: Readonly<CheckpointCardFooterProps>) {
  return (
    <div
      data-slot="ds-checkpoint-card-footer"
      className={cn(
        "flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4",
        "lg:shrink-0 lg:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function CheckpointCardButton({
  children,
  className,
  ...props
}: Readonly<CheckpointCardButtonProps>) {
  const { status } = useCheckpointCardContext();

  return (
    <Link
      prefetch={false}
      data-slot="ds-checkpoint-card-button"
      data-status={status}
      className={cn(
        "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-button-secondary-default px-4 py-4 transition-colors duration-200",
        "group-hover:bg-button-primary-default",
        "font-roboto-flex text-base leading-6 font-normal text-text-title",
        "[&_svg]:size-4.5 [&_svg]:shrink-0",
        "sm:w-fit",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

function CheckpointCardMeta({
  className,
  ...props
}: Readonly<CheckpointCardMetaProps>) {
  return (
    <div
      data-slot="ds-checkpoint-card-meta"
      className={cn(
        "inline-flex items-center gap-2 font-jetbrains-mono text-sm leading-6 tracking-[-0.04em] text-text-body",
        "[&_svg]:size-5 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function CheckpointCardAside({
  className,
  ...props
}: Readonly<CheckpointCardAsideProps>) {
  return (
    <aside
      data-slot="ds-checkpoint-card-aside"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

function CheckpointCardAsideHeader({
  className,
  ...props
}: Readonly<CheckpointCardAsideHeaderProps>) {
  return (
    <div
      data-slot="ds-checkpoint-card-aside-header"
      className={cn(
        "inline-flex items-center gap-2 font-encode-sans text-base leading-6 font-medium text-text-title",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function CheckpointCardDescription({
  className,
  ...props
}: Readonly<CheckpointCardDescriptionProps>) {
  return (
    <p
      data-slot="ds-checkpoint-card-description"
      className={cn(
        "font-roboto-flex text-base leading-7 font-light",
        className,
      )}
      {...props}
    />
  );
}

CheckpointCardRoot.displayName = "CheckpointCard.Root";
CheckpointCardTrack.displayName = "CheckpointCard.Track";
CheckpointCardRail.displayName = "CheckpointCard.Rail";
CheckpointCardIndex.displayName = "CheckpointCard.Index";
CheckpointCardContent.displayName = "CheckpointCard.Content";
CheckpointCardTitle.displayName = "CheckpointCard.Title";
CheckpointCardFooter.displayName = "CheckpointCard.Footer";
CheckpointCardButton.displayName = "CheckpointCard.Button";
CheckpointCardMeta.displayName = "CheckpointCard.Meta";
CheckpointCardAside.displayName = "CheckpointCard.Aside";
CheckpointCardAsideHeader.displayName = "CheckpointCard.AsideHeader";
CheckpointCardDescription.displayName = "CheckpointCard.Description";

const CheckpointCard = {
  Root: CheckpointCardRoot,
  Track: CheckpointCardTrack,
  Rail: CheckpointCardRail,
  Index: CheckpointCardIndex,
  Content: CheckpointCardContent,
  Title: CheckpointCardTitle,
  Footer: CheckpointCardFooter,
  Button: CheckpointCardButton,
  Meta: CheckpointCardMeta,
  Aside: CheckpointCardAside,
  AsideHeader: CheckpointCardAsideHeader,
  Description: CheckpointCardDescription,
};

export {
  CheckpointCard,
  CheckpointCardAside,
  CheckpointCardAsideHeader,
  CheckpointCardButton,
  CheckpointCardContent,
  CheckpointCardDescription,
  CheckpointCardFooter,
  CheckpointCardIndex,
  CheckpointCardMeta,
  CheckpointCardRail,
  CheckpointCardRoot,
  CheckpointCardTitle,
  CheckpointCardTrack,
  type CheckpointCardRootProps,
};
