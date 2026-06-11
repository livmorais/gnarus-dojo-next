"use client";

import type * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

type RadioCardInputProps = Omit<
  React.ComponentPropsWithRef<"input">,
  | "checked"
  | "className"
  | "defaultChecked"
  | "disabled"
  | "name"
  | "onChange"
  | "type"
  | "value"
>;

type RadioCardProps = {
  checked?: boolean;
  className?: string;
  defaultChecked?: boolean;
  label: React.ReactNode;
  disabled?: boolean;
  inputProps?: RadioCardInputProps;
  name?: string;
  onChange?: (value: string) => void;
  value: string | number;
  variant?: "default" | "card";
};

const radioCardRootVariants = cva(
  [
    "group flex cursor-pointer rounded-sm transition-[border-color,box-shadow,opacity] duration-100",
    "focus-within:ring-2 focus-within:ring-border-focus/30",
  ],
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-60",
      },
      variant: {
        default: "flex-col items-center gap-1 text-center",
        card: [
          "min-h-16 w-full items-center justify-between gap-4 border border-border-default bg-surface-subtle px-6 py-5 text-left",
          "font-roboto-flex text-lg font-light leading-6 tracking-normal text-text-body",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const radioCardIndicatorVariants = cva([
  "flex size-5.5 shrink-0 items-center justify-center rounded-full border bg-surface-interactive transition-colors",
  "border-border-default group-hover:border-[#7A9FF0]/60",
  "peer-checked:border-[#7A9FF0] peer-checked:border-[7px] peer-checked:bg-transparent",
  "peer-disabled:group-hover:border-border-default",
]);

export function RadioCard({
  checked,
  className,
  defaultChecked,
  label,
  disabled,
  inputProps,
  name,
  onChange,
  value,
  variant,
}: RadioCardProps) {
  const isControlled = checked !== undefined;

  return (
    <label
      className={cn(radioCardRootVariants({ disabled, variant }), className)}
    >
      <input
        {...inputProps}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={isControlled ? undefined : defaultChecked}
        onChange={(event) => {
          onChange?.(event.target.value);
        }}
        disabled={disabled}
        className="peer sr-only"
      />

      {label}

      <span className={radioCardIndicatorVariants()} />
    </label>
  );
}

export type { RadioCardProps };
