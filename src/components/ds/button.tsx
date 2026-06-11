"use client";

import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "mini"
  | "link"
  | "tertiary"
  | "danger"
  | "luri"
  | "quaternary"
  | "iconOnly";

type ButtonRootProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "aria-label"
> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  rounded?: boolean;
  ariaLabel?: string;
  ariaControls?: string;
  ariaExpanded?: React.AriaAttributes["aria-expanded"];
  ariaHaspopup?: React.AriaAttributes["aria-haspopup"];
};

type ButtonIconProps = React.ComponentPropsWithoutRef<"span">;
type ButtonLabelProps = React.ComponentPropsWithoutRef<"span">;

const buttonRootVariants = cva(
  [
    "relative inline-flex w-fit items-center justify-center gap-2",
    "font-roboto-flex font-normal leading-[normal] tracking-normal",
    "text-base transition-[background-color,color,border-color,opacity] duration-200",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    "disabled:pointer-events-none disabled:cursor-default disabled:opacity-60",
    "aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-60",
    "[&_[data-slot=ds-button-icon]>svg]:shrink-0 border border-transparent",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-button-primary-default p-4 text-text-on-brand hover:bg-button-primary-hover [&_[data-slot=ds-button-icon]>svg]:size-4.5",
        secondary:
          "bg-button-secondary-default p-4 text-text-title hover:bg-button-secondary-hover [&_[data-slot=ds-button-icon]>svg]:size-4.5",
        mini: "bg-button-secondary-default px-4 py-3 text-sm text-text-title hover:bg-button-secondary-hover [&_[data-slot=ds-button-icon]>svg]:size-4.5",
        link: "bg-transparent p-0 text-text-interactive hover:text-interactive-primary-hover hover:underline hover:underline-offset-4",
        tertiary:
          "border border-brand-logo bg-transparent p-4 text-text-title hover:bg-brand-logo hover:text-text-main-card-title [&_[data-slot=ds-button-icon]>svg]:size-4.5",
        luri: "bg-[linear-gradient(223.8deg,#6e7fc3_30.21%,#c1c2c8_100%)] p-4 text-text-main-card-title hover:bg-[linear-gradient(90deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.4)_100%),linear-gradient(223.8deg,#6373b3_30.21%,#c1c2c8_100%)] [&_[data-slot=ds-button-icon]>svg]:size-5",
        quaternary:
          "bg-brand-logo p-4 text-brand-default hover:border hover:bg-transparent hover:text-brand-logo [&_[data-slot=ds-button-icon]>svg]:size-4.5",
        iconOnly:
          "size-9 gap-0 bg-transparent p-0 text-text-title hover:text-icon-primary [&_[data-slot=ds-button-icon]>svg]:size-5",
        danger:
          "bg-button-secondary-default p-4 text-text-title border-transparent hover:border-feedback-error-default hover:bg-feedback-error-default [&_[data-slot=ds-button-icon]>svg]:size-4.5",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      rounded: false,
    },
  },
);

function ButtonRoot({
  asChild = false,
  ariaControls,
  ariaExpanded,
  ariaHaspopup,
  ariaLabel,
  children,
  className,
  disabled = false,
  onClick,
  onKeyDown,
  rounded,
  tabIndex,
  type,
  variant = "primary",
  ...props
}: ButtonRootProps) {
  const Comp = asChild ? Slot : "button";
  const nativeAriaLabel = (props as { "aria-label"?: string })["aria-label"];
  const resolvedAriaLabel = nativeAriaLabel ?? ariaLabel;
  const resolvedRounded = rounded ?? variant === "iconOnly";

  const sharedProps = {
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    "aria-haspopup": ariaHaspopup,
    "aria-label": resolvedAriaLabel,
    className: cn(
      buttonRootVariants({
        variant,
        rounded: resolvedRounded,
      }),
      className,
    ),
    "data-variant": variant,
    "data-slot": "ds-button-root",
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onKeyDown?.(event as unknown as React.KeyboardEvent<HTMLButtonElement>);
    },
  };

  if (asChild) {
    return (
      <Comp
        {...props}
        {...sharedProps}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={disabled ? -1 : tabIndex}
      >
        {children}
      </Comp>
    );
  }

  return (
    <button
      {...props}
      {...sharedProps}
      type={type ?? "button"}
      disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
}

function ButtonIcon({ className, ...props }: ButtonIconProps) {
  return (
    <span
      data-slot="ds-button-icon"
      aria-hidden="true"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    />
  );
}

function ButtonLabel({ className, ...props }: ButtonLabelProps) {
  return (
    <span
      data-slot="ds-button-label"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    />
  );
}

ButtonRoot.displayName = "Button.Root";
ButtonIcon.displayName = "Button.Icon";
ButtonLabel.displayName = "Button.Label";

const Button = {
  Root: ButtonRoot,
  Icon: ButtonIcon,
  Label: ButtonLabel,
};

export {
  Button,
  ButtonIcon,
  ButtonLabel,
  ButtonRoot,
  type ButtonRootProps,
  type ButtonVariant,
};
