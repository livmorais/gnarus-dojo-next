"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ds/button";
import { Input } from "@/components/ds/input";
import { cn } from "@/lib/cn";

type TextListInputProps = {
  addLabel?: string;
  className?: string;
  disabled?: boolean;
  getRemoveAriaLabel?: (item: string, index: number) => string;
  helperText?: React.ReactNode;
  id?: string;
  label: React.ReactNode;
  optionalLabel?: React.ReactNode;
  placeholder?: string;
  value: string[];
  onValueChange: (nextValue: string[]) => void;
};

function getDefaultRemoveAriaLabel(value: string, index: number) {
  return `Remover item ${index + 1}: ${value}`;
}

function TextListInput({
  addLabel = "Adicionar",
  className,
  disabled = false,
  getRemoveAriaLabel = getDefaultRemoveAriaLabel,
  helperText,
  id,
  label,
  optionalLabel,
  placeholder,
  value,
  onValueChange,
}: TextListInputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const [pendingValue, setPendingValue] = React.useState("");

  const handleAddItem = () => {
    const nextItem = pendingValue.trim();

    if (!nextItem || disabled) return;

    onValueChange([...value, nextItem]);
    setPendingValue("");
  };

  const handleRemoveItem = (indexToRemove: number) => {
    if (disabled) return;

    onValueChange(value.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    handleAddItem();
  };

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <Input.Root id={inputId} disabled={disabled}>
        <Input.Label className="font-light md:text-lg">
          {label}
          {optionalLabel && (
            <span className="ml-1 text-text-body text-xs font-medium">
              {optionalLabel}
            </span>
          )}
        </Input.Label>
        {helperText && <Input.Message>{helperText}</Input.Message>}
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
          <Input.Control
            onChange={(event) => setPendingValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            value={pendingValue}
          />

          <Button.Root
            type="button"
            variant="secondary"
            className="h-10 shrink-0 md:h-12"
            disabled={disabled}
            onClick={handleAddItem}
          >
            <Button.Label>{addLabel}</Button.Label>
          </Button.Root>
        </div>
      </Input.Root>

      {value.length > 0 && (
        <ul className="flex flex-col gap-3">
          {value.map((item, index) => (
            <li key={`${inputId}-item-${value[index]}`}>
              <div className="flex items-center justify-between gap-4 rounded bg-surface-default px-6 py-4">
                <h4 className="min-w-0 text-sm text-text-title">{item}</h4>
                <Button.Root
                  type="button"
                  variant="iconOnly"
                  ariaLabel={getRemoveAriaLabel(item, index)}
                  disabled={disabled}
                  onClick={() => handleRemoveItem(index)}
                >
                  <Button.Icon>
                    <Trash2 />
                  </Button.Icon>
                </Button.Root>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { TextListInput, type TextListInputProps };
