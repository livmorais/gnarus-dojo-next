"use client";

import type * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: React.ReactNode;
  disabled?: boolean;
};

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  disabled,
}: CheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-3",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        disabled={disabled}
        className="sr-only"
      />

      <span
        className={cn(
          "flex size-5 items-center justify-center rounded border transition-colors",
          checked
            ? "border-brand-default bg-brand-default text-text-on-brand"
            : "border-border-checkbox bg-surface-secondary",
        )}
      >
        {checked ? <Check className="size-3.5" /> : null}
      </span>

      <span>{label}</span>
    </label>
  );
}

export type { CheckboxProps };
