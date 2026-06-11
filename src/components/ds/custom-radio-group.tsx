"use client";

import type * as React from "react";
import { RadioCard } from "./radio-card";

type RadioOption<T extends string | number> = {
  label: React.ReactNode;
  value: T;
};

type CustomRadioGroupProps<T extends string | number> = {
  name: string;
  value?: T;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  className?: string;
  renderOption?: (option: RadioOption<T>, checked: boolean) => React.ReactNode;
};

export function CustomRadioGroup<T extends string | number>({
  name,
  value,
  onChange,
  options,
  className,
  renderOption,
}: CustomRadioGroupProps<T>) {
  return (
    <div role="radiogroup" className={className}>
      {options.map((option) => {
        const checked = value === option.value;

        if (renderOption) {
          return (
            <div key={String(option.value)}>
              {renderOption(option, checked)}
            </div>
          );
        }

        return (
          <RadioCard
            key={String(option.value)}
            name={name}
            value={option.value}
            checked={checked}
            onChange={(next) => onChange(next as T)}
            label={<span>{option.label}</span>}
          />
        );
      })}
    </div>
  );
}

export type { CustomRadioGroupProps, RadioOption };
