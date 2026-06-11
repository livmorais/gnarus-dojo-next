"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { Field, FieldDescription, FieldLabel } from "@/components/ds/field";
import { cn } from "@/lib/cn";

type NativeTextareaProps = Omit<
  React.ComponentPropsWithoutRef<"textarea">,
  "aria-invalid"
>;

type TextareaProps = NativeTextareaProps & {
  controlClassName?: string;
  helperText?: string;
  invalid?: boolean;
  label?: string;
  showCharacterCount?: boolean;
};

const textareaWrapperVariants = cva(
  [
    "flex w-full flex-col rounded-lg border bg-surface-subtle transition-[border-color,box-shadow] duration-200",
    "focus-within:border-border-focus focus-within:ring-2 focus-within:ring-border-focus/30",
  ],
  {
    variants: {
      invalid: {
        true: "border-feedback-error-default focus-within:border-feedback-error-default focus-within:ring-feedback-error-default/25",
        false: "border-border-subtle",
      },
      readOnly: {
        true: "border-border-subtle bg-surface-subtle",
        false: "",
      },
    },
    defaultVariants: {
      invalid: false,
      readOnly: false,
    },
  },
);

const textareaFieldVariants = cva([
  "block h-full w-full flex-1 resize-none border-0 bg-transparent px-4 py-4 outline-none",
  "font-roboto-flex text-xs font-normal leading-normal tracking-normal text-text-title placeholder:text-text-subtle-2 md:text-sm",
  "read-only:cursor-default read-only:text-text-subtle-2 read-only:placeholder:text-text-disabled",
  "disabled:cursor-not-allowed disabled:text-text-subtle-2 disabled:placeholder:text-text-disabled",
]);

function resolveAriaDescribedBy(
  ...ids: Array<React.AriaAttributes["aria-describedby"] | undefined>
) {
  const value = ids.filter(Boolean).join(" ").trim();
  return value.length > 0 ? value : undefined;
}

type TextareaControlProps = Omit<TextareaProps, "helperText" | "label">;

const TextareaControl = React.forwardRef<
  HTMLTextAreaElement,
  TextareaControlProps
>(
  (
    {
      controlClassName,
      disabled = false,
      id,
      invalid = false,
      maxLength,
      onBlur,
      onChange,
      readOnly = false,
      showCharacterCount = false,
      value,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      String(props.defaultValue ?? ""),
    );
    const characterCountValue = isControlled ? (value ?? "") : internalValue;
    const currentLength = String(characterCountValue).length;
    const characterCountId =
      showCharacterCount && id ? `${id}-character-count` : undefined;
    const characterLimitLabel = maxLength ?? "∞";
    const characterCountAnnouncement =
      maxLength !== undefined
        ? `${currentLength} de ${maxLength} caracteres`
        : `${currentLength} caracteres digitados`;

    return (
      <div
        className={cn(
          "min-h-32 md:min-h-41",
          textareaWrapperVariants({ invalid, readOnly }),
          controlClassName,
        )}
        data-slot="ds-textarea-root"
      >
        <textarea
          id={id}
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
          readOnly={readOnly}
          value={value}
          aria-describedby={resolveAriaDescribedBy(
            ariaDescribedBy,
            characterCountId,
          )}
          className={textareaFieldVariants()}
          data-slot="ds-textarea"
          onBlur={(event) => {
            onBlur?.(event);
          }}
          onChange={(event) => {
            if (!isControlled) {
              setInternalValue(event.target.value);
            }

            onChange?.(event);
          }}
          {...props}
        />

        {showCharacterCount ? (
          <div
            id={characterCountId}
            aria-atomic="true"
            aria-live="polite"
            className="px-4 pb-3 text-right font-roboto-flex text-[10px] leading-normal tracking-normal text-text-body"
          >
            <span aria-hidden="true" className="tabular-nums">
              {currentLength}/{characterLimitLabel}
            </span>
            <span className="sr-only">{characterCountAnnouncement}</span>
          </div>
        ) : null}
      </div>
    );
  },
);

TextareaControl.displayName = "TextareaControl";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      className,
      controlClassName,
      disabled = false,
      helperText,
      id,
      invalid = false,
      label,
      readOnly = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const helperId = helperText ? `${textareaId}-helper` : undefined;

    return (
      <Field className={className}>
        {label ? (
          <FieldLabel
            htmlFor={textareaId}
            readOnly={readOnly}
            required={props.required}
          >
            {label}
          </FieldLabel>
        ) : null}

        <TextareaControl
          ref={ref}
          id={textareaId}
          aria-invalid={invalid ? true : undefined}
          disabled={disabled}
          invalid={invalid}
          readOnly={readOnly}
          controlClassName={controlClassName}
          aria-describedby={resolveAriaDescribedBy(ariaDescribedBy, helperId)}
          {...props}
        />

        {helperText ? (
          <FieldDescription id={helperId} invalid={invalid} readOnly={readOnly}>
            {helperText}
          </FieldDescription>
        ) : null}
      </Field>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
