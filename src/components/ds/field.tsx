"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

type FieldProps = React.ComponentPropsWithoutRef<"div">;
type FieldLabelProps = Omit<
  React.ComponentPropsWithoutRef<"label">,
  "htmlFor"
> & {
  htmlFor: string;
  readOnly?: boolean;
  required?: boolean;
};
type FieldDescriptionProps = React.ComponentPropsWithoutRef<"p"> & {
  readOnly?: boolean;
  invalid?: boolean;
};

const fieldLabelVariants = cva(
  "font-encode-sans text-xs font-medium leading-none tracking-normal text-text-title md:text-sm",
  {
    variants: {
      readOnly: {
        true: "text-text-disabled",
        false: "text-text-title",
      },
    },
    defaultVariants: { readOnly: false },
  },
);

const fieldDescriptionVariants = cva(
  "font-encode-sans text-sm leading-normal tracking-normal",
  {
    variants: {
      readOnly: {
        true: "text-text-disabled",
        false: "text-text-subtle-2",
      },
      invalid: {
        true: "text-feedback-error-default",
        false: "",
      },
    },
    compoundVariants: [
      {
        readOnly: true,
        invalid: true,
        className: "text-feedback-error-default",
      },
    ],
    defaultVariants: {
      readOnly: false,
      invalid: false,
    },
  },
);

const requiredIndicatorVariants = cva(
  "font-encode-sans text-xs font-medium leading-none tracking-normal text-feedback-error-default md:text-sm",
);

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col gap-1", className)}
        data-slot="ds-field"
        {...props}
      />
    );
  },
);

Field.displayName = "Field";

function FieldLabel({
  children,
  className,
  htmlFor,
  readOnly = false,
  required = false,
  ...props
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex items-center gap-1",
        fieldLabelVariants({ readOnly }),
        className,
      )}
      data-slot="ds-field-label"
      {...props}
    >
      <span>{children}</span>
      {required ? (
        <span aria-hidden="true" className={requiredIndicatorVariants()}>
          *
        </span>
      ) : null}
    </label>
  );
}

function FieldDescription({
  className,
  invalid = false,
  readOnly = false,
  ...props
}: FieldDescriptionProps) {
  return (
    <p
      className={cn(fieldDescriptionVariants({ readOnly, invalid }), className)}
      data-slot="ds-field-description"
      role={invalid ? "alert" : props.role}
      {...props}
    />
  );
}

export {
  Field,
  FieldDescription,
  FieldLabel,
  type FieldDescriptionProps,
  type FieldLabelProps,
  type FieldProps,
};
