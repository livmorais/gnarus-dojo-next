"use client";

import type * as React from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
  description?: string;
};

export function FormField({
  label,
  error,
  children,
  description,
}: FormFieldProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-encode-sans text-[20px] leading-6 font-extralight text-text-title">
          {label}
        </h3>

        {description ? (
          <p className="text-sm text-text-body">{description}</p>
        ) : null}
      </div>

      {children}

      {error ? (
        <p className="text-sm text-feedback-error-default" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type { FormFieldProps };
