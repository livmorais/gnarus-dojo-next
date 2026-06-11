import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";
import type * as React from "react";

type EmptyStateAlign = "center" | "left";

type EmptyStateRootProps = React.ComponentPropsWithoutRef<"section"> & {
  align?: EmptyStateAlign;
  topBorder?: boolean;
};

type EmptyStateBodyProps = React.ComponentPropsWithoutRef<"div">;
type EmptyStateTitleProps = React.ComponentPropsWithoutRef<"h2">;
type EmptyStateHighlightProps = React.ComponentPropsWithoutRef<"span">;
type EmptyStateDescriptionProps = React.ComponentPropsWithoutRef<"p">;
type EmptyStateActionsProps = React.ComponentPropsWithoutRef<"div"> & {
  align?: EmptyStateAlign;
};

const emptyStateRootVariants = cva(
  [
    "flex w-full flex-col rounded-lg",
    "bg-surface-brand px-6 py-12 text-text-title md:px-10 md:py-16",
  ],
  {
    variants: {
      align: {
        center: "items-center text-center",
        left: "items-start text-left",
      },
      topBorder: {
        true: "border-t-[6px] border-border-subtle",
        false: "",
      },
    },
    defaultVariants: {
      align: "center",
      topBorder: true,
    },
  },
);

const emptyStateBodyVariants = cva("flex w-full flex-col gap-1");

const emptyStateActionsVariants = cva(
  "mt-5 flex w-full flex-wrap items-center gap-3",
  {
    variants: {
      align: {
        center: "justify-center",
        left: "justify-start",
      },
    },
    defaultVariants: {
      align: "center",
    },
  },
);

function EmptyStateRoot({
  align = "center",
  topBorder = true,
  className,
  ...props
}: EmptyStateRootProps) {
  return (
    <section
      data-align={align}
      data-top-border={topBorder}
      data-slot="ds-empty-state-root"
      className={cn(emptyStateRootVariants({ align, topBorder }), className)}
      {...props}
    />
  );
}

function EmptyStateBody({ className, ...props }: EmptyStateBodyProps) {
  return (
    <div
      data-slot="ds-empty-state-body"
      className={cn(emptyStateBodyVariants(), className)}
      {...props}
    />
  );
}

function EmptyStateTitle({ className, ...props }: EmptyStateTitleProps) {
  return (
    <h2
      data-slot="ds-empty-state-title"
      className={cn(
        "font-encode-sans text-2xl leading-normal font-light text-text-title",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateHighlight({
  className,
  ...props
}: EmptyStateHighlightProps) {
  return (
    <span
      data-slot="ds-empty-state-highlight"
      className={cn("text-feedback-info-default", className)}
      {...props}
    />
  );
}

function EmptyStateDescription({
  className,
  ...props
}: EmptyStateDescriptionProps) {
  return (
    <p
      data-slot="ds-empty-state-description"
      className={cn(
        "font-roboto-flex text-base leading-normal font-light text-text-body",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateActions({
  align = "center",
  className,
  ...props
}: EmptyStateActionsProps) {
  return (
    <div
      data-slot="ds-empty-state-actions"
      className={cn(emptyStateActionsVariants({ align }), className)}
      {...props}
    />
  );
}

EmptyStateRoot.displayName = "EmptyState.Root";
EmptyStateBody.displayName = "EmptyState.Body";
EmptyStateTitle.displayName = "EmptyState.Title";
EmptyStateHighlight.displayName = "EmptyState.Highlight";
EmptyStateDescription.displayName = "EmptyState.Description";
EmptyStateActions.displayName = "EmptyState.Actions";

const EmptyState = {
  Root: EmptyStateRoot,
  Body: EmptyStateBody,
  Title: EmptyStateTitle,
  Highlight: EmptyStateHighlight,
  Description: EmptyStateDescription,
  Actions: EmptyStateActions,
};

export {
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateDescription,
  EmptyStateHighlight,
  EmptyStateRoot,
  EmptyStateTitle,
  type EmptyStateActionsProps,
  type EmptyStateAlign,
  type EmptyStateRootProps,
};
