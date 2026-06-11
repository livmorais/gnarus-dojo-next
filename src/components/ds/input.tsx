"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { Button, type ButtonRootProps } from "@/components/ds/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
  type FieldDescriptionProps,
  type FieldLabelProps,
  type FieldProps,
} from "@/components/ds/field";
import { cn } from "@/lib/cn";

type InputRootProps = Omit<FieldProps, "id"> & {
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
};

type InputControlProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "size"
> & {
  inputClassName?: string;
};

type InputLabelProps = Omit<
  FieldLabelProps,
  "htmlFor" | "readOnly" | "required"
> & {
  htmlFor?: string;
  readOnly?: boolean;
  required?: boolean;
};

type InputMessageProps = Omit<
  FieldDescriptionProps,
  "id" | "invalid" | "readOnly"
> & {
  id?: string;
  invalid?: boolean;
  readOnly?: boolean;
};

type InputActionProps = Omit<ButtonRootProps, "rounded" | "variant">;
type InputGroupProps = React.ComponentPropsWithoutRef<"div">;

type InputContextValue = {
  inputId: string;
  invalid: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  describedBy?: string;
  setDescribedBy: (id?: string) => void;
};

const InputContext = React.createContext<InputContextValue | null>(null);

function useInputContext() {
  const context = React.useContext(InputContext);

  if (!context) {
    throw new Error("Input components must be used inside Input.Root");
  }

  return context;
}

const inputControlVariants = cva(
  [
    "flex h-10 w-full items-center gap-3 rounded-sm border bg-surface-subtle px-4 md:h-12",
    "transition-[border-color,box-shadow,background-color,color] duration-100",
    "focus-within:border-border-focus focus-within:ring-2 focus-within:ring-border-focus/30",
  ],
  {
    variants: {
      invalid: {
        true: "border-feedback-error-default focus-within:border-feedback-error-default focus-within:ring-feedback-error-default/25",
        false: "border-border-default",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  },
);

const inputElementVariants = cva([
  "w-full min-w-0 border-0 bg-transparent p-0 outline-none",
  "font-roboto-flex text-xs font-normal leading-normal tracking-normal text-text-title md:text-sm",
  "placeholder:text-text-subtle-2",
  "read-only:cursor-default read-only:text-text-subtle-2 read-only:placeholder:text-text-disabled",
  "disabled:cursor-not-allowed disabled:text-text-subtle-2 disabled:placeholder:text-text-disabled",
]);

const inputGroupVariants = cva(
  [
    "relative flex h-10 w-full items-stretch overflow-hidden rounded-sm border bg-surface-subtle md:h-12",
    "transition-[border-color] duration-200",
    "*:data-[slot=ds-input-control-root]:relative *:data-[slot=ds-input-control-root]:z-0 *:data-[slot=ds-input-control-root]:h-full *:data-[slot=ds-input-control-root]:flex-1",
    "*:data-[slot=ds-input-control-root]:rounded-none *:data-[slot=ds-input-control-root]:border-0",
    "*:data-[slot=ds-input-control-root]:focus-within:z-10 *:data-[slot=ds-input-control-root]:focus-within:ring-1 *:data-[slot=ds-input-control-root]:focus-within:ring-inset",
    "*:data-[slot=ds-button-root]:relative *:data-[slot=ds-button-root]:z-0 *:data-[slot=ds-button-root]:h-full",
    "*:data-[slot=ds-button-root]:rounded-none *:data-[slot=ds-button-root]:border-y-0 *:data-[slot=ds-button-root]:border-r-0  *:data-[slot=ds-button-root]:border-border-default",
    "*:data-[slot=ds-button-root]:focus-visible:z-10 *:data-[slot=ds-button-root]:focus-visible:ring-1 *:data-[slot=ds-button-root]:focus-visible:ring-border-focus *:data-[slot=ds-button-root]:focus-visible:ring-inset *:data-[slot=ds-button-root]:focus-visible:ring-offset-0",
  ],
  {
    variants: {
      invalid: {
        true: "border-feedback-error-default *:data-[slot=ds-input-control-root]:focus-within:ring-feedback-error-default",
        false:
          "border-border-default *:data-[slot=ds-input-control-root]:focus-within:ring-border-focus",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  },
);

function isAriaInvalid(value: React.AriaAttributes["aria-invalid"]) {
  return value === true || value === "true";
}

const InputRoot = React.forwardRef<HTMLDivElement, InputRootProps>(
  (
    {
      children,
      className,
      disabled = false,
      id,
      invalid = false,
      readOnly = false,
      required = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const [describedBy, setDescribedBy] = React.useState<string | undefined>();
    const inputId = id ?? generatedId;

    return (
      <InputContext.Provider
        value={{
          inputId,
          invalid,
          disabled,
          readOnly,
          required,
          describedBy,
          setDescribedBy,
        }}
      >
        <Field
          ref={ref}
          className={className}
          data-slot="ds-input-field"
          {...props}
        >
          {children}
        </Field>
      </InputContext.Provider>
    );
  },
);

InputRoot.displayName = "Input.Root";

const InputControl = React.forwardRef<HTMLInputElement, InputControlProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      className,
      disabled,
      id,
      inputClassName,
      readOnly,
      required,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const context = useInputContext();

    const resolvedId = id ?? context.inputId;
    const resolvedInvalid = context.invalid || isAriaInvalid(ariaInvalid);
    const resolvedDisabled = disabled ?? context.disabled;
    const resolvedReadOnly = readOnly ?? context.readOnly;
    const resolvedRequired = required ?? context.required;
    const resolvedDescribedBy =
      [ariaDescribedBy, context.describedBy].filter(Boolean).join(" ") ||
      undefined;

    return (
      <div
        className={cn(
          inputControlVariants({ invalid: resolvedInvalid }),
          className,
        )}
        data-slot="ds-input-control-root"
      >
        <input
          ref={ref}
          id={resolvedId}
          type={type}
          aria-describedby={resolvedDescribedBy}
          aria-invalid={resolvedInvalid ? true : undefined}
          className={cn(inputElementVariants(), inputClassName)}
          data-slot="ds-input-control"
          disabled={resolvedDisabled}
          readOnly={resolvedReadOnly}
          required={resolvedRequired}
          {...props}
        />
      </div>
    );
  },
);

InputControl.displayName = "Input.Control";

function InputLabel({
  className,
  htmlFor,
  readOnly,
  required,
  ...props
}: InputLabelProps) {
  const context = useInputContext();

  return (
    <FieldLabel
      className={className}
      htmlFor={htmlFor ?? context.inputId}
      readOnly={readOnly ?? context.readOnly}
      required={required ?? context.required}
      {...props}
    />
  );
}

InputLabel.displayName = "Input.Label";

function InputMessage({
  className,
  id,
  invalid,
  readOnly,
  ...props
}: InputMessageProps) {
  const context = useInputContext();
  const generatedId = React.useId();
  const resolvedId = id ?? `${context.inputId}-${generatedId}-message`;

  React.useEffect(() => {
    context.setDescribedBy(resolvedId);
    return () => context.setDescribedBy(undefined);
  }, [context, resolvedId]);

  return (
    <FieldDescription
      id={resolvedId}
      className={className}
      invalid={invalid ?? context.invalid}
      readOnly={readOnly ?? context.readOnly}
      {...props}
    />
  );
}

InputMessage.displayName = "Input.Message";

function InputAction({
  children,
  className,
  disabled,
  type = "button",
  ...props
}: InputActionProps) {
  const context = useInputContext();

  return (
    <Button.Root
      variant="iconOnly"
      rounded={false}
      type={type}
      className={cn(
        "h-full shrink-0 rounded-none bg-surface-subtle px-2 text-icon-primary hover:bg-surface-subtle hover:text-text-title focus-visible:ring-1 focus-visible:ring-border-focus focus-visible:ring-inset focus-visible:ring-offset-0 disabled:bg-surface-subtle disabled:text-text-disabled [&_[data-slot=ds-button-icon]>svg]:size-4 md:px-3",
        className,
      )}
      data-slot="ds-input-action"
      disabled={disabled ?? context.disabled}
      {...props}
    >
      <Button.Icon>{children}</Button.Icon>
    </Button.Root>
  );
}

InputAction.displayName = "Input.Action";

function InputGroup({ className, ...props }: InputGroupProps) {
  const context = useInputContext();

  return (
    <div
      className={cn(
        inputGroupVariants({ invalid: context.invalid }),
        className,
      )}
      data-slot="ds-input-group"
      {...props}
    />
  );
}

InputGroup.displayName = "Input.Group";

const Input = {
  Root: InputRoot,
  Control: InputControl,
  Label: InputLabel,
  Message: InputMessage,
  Action: InputAction,
  Group: InputGroup,
};

export {
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  isAriaInvalid,
  type FieldDescriptionProps,
  type FieldLabelProps,
  type FieldProps,
  type InputActionProps,
  type InputControlProps,
  type InputGroupProps,
  type InputLabelProps,
  type InputMessageProps,
  type InputRootProps,
};
