"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import { Field, FieldDescription, FieldLabel } from "@/components/ds/field";
import { cn } from "@/lib/cn";
import type {
  SelectContentProps,
  SelectGroupLabelProps,
  SelectGroupProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectMessageProps,
  SelectRootProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectViewportProps,
} from "./select.types";

function isAriaInvalid(value: React.AriaAttributes["aria-invalid"]) {
  return value === true || value === "true";
}

const selectTriggerVariants = cva(
  [
    "group flex h-14 w-full items-center justify-between gap-3 border px-4 py-3 text-left",
    "font-roboto-flex text-sm font-normal leading-normal tracking-normal text-text-title",
    "transition-[border-color,box-shadow,background-color,color] duration-100",
    "cursor-pointer data-placeholder:text-text-body",
    "focus:outline-none focus:ring-2 focus:ring-border-focus/30",
    "disabled:cursor-not-allowed disabled:text-text-disabled disabled:opacity-60",
  ],
  {
    variants: {
      invalid: {
        true: "border-feedback-error-default focus:border-feedback-error-default focus:ring-feedback-error-default/25",
        false: "border-transparent focus:border-border-focus",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-sm",
      },
      variant: {
        default: "bg-surface-subtle",
        secondary: "bg-surface-default",
      },
    },
    defaultVariants: {
      invalid: false,
      rounded: false,
      variant: "default",
    },
  },
);

const selectContentVariants = cva([
  "z-50 max-h-80 min-w-(--radix-select-trigger-width) overflow-hidden rounded-sm border border-border-secondary bg-select-options text-text-title shadow-lg",
  "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
]);

const selectItemVariants = cva([
  "relative flex min-h-11 w-full cursor-pointer select-none items-center gap-3 rounded-xs border-b border-border-secondary p-3",
  "font-roboto-flex text-sm font-normal leading-normal tracking-normal text-text-title outline-none",
  "transition-[background-color,color] duration-100",
  "focus:bg-surface-interactive focus:text-text-title",
  "data-highlighted:bg-surface-interactive data-highlighted:text-text-title",
  "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:text-text-disabled data-disabled:opacity-60",
]);

const selectGroupLabelVariants = cva(
  "px-3 py-2 font-encode-sans text-xs font-medium leading-none tracking-normal text-text-subtle-2",
);

const selectSeparatorVariants = cva("my-0.5 h-px bg-border-secondary");

const SelectRoot = React.forwardRef<HTMLDivElement, SelectRootProps>(
  (
    {
      autoComplete,
      children,
      className,
      defaultOpen,
      defaultValue,
      disabled,
      dir,
      form,
      name,
      onOpenChange,
      onValueChange,
      open,
      required,
      value,
      ...props
    },
    ref,
  ) => {
    return (
      <Field
        ref={ref}
        className={className}
        data-slot="ds-select-field"
        {...props}
      >
        <SelectPrimitive.Root
          autoComplete={autoComplete}
          defaultOpen={defaultOpen}
          defaultValue={defaultValue}
          dir={dir}
          disabled={disabled}
          form={form}
          name={name}
          onOpenChange={onOpenChange}
          onValueChange={onValueChange}
          open={open}
          required={required}
          value={value}
        >
          {children}
        </SelectPrimitive.Root>
      </Field>
    );
  },
);

SelectRoot.displayName = "Select.Root";

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return <FieldLabel className={className} {...props} />;
}

SelectLabel.displayName = "Select.Label";

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      children,
      className,
      rounded,
      variant,
      ...props
    },
    ref,
  ) => {
    const invalid = isAriaInvalid(ariaInvalid);

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        className={cn(
          selectTriggerVariants({ invalid, rounded, variant }),
          className,
        )}
        data-slot="ds-select-trigger"
        {...props}
      >
        {children}
      </SelectPrimitive.Trigger>
    );
  },
);

SelectTrigger.displayName = "Select.Trigger";

const SelectValue = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Value>,
  SelectValueProps
>(({ className, style, ...props }, ref) => {
  return (
    <span
      className={cn("min-w-0 flex-1 truncate", className)}
      data-slot="ds-select-value"
      style={style}
    >
      <SelectPrimitive.Value ref={ref} {...props} />
    </span>
  );
});

SelectValue.displayName = "Select.Value";

const SelectIcon = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Icon>,
  SelectIconProps
>(({ children, className, ...props }, ref) => {
  return (
    <SelectPrimitive.Icon
      ref={ref}
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center text-icon-primary transition-transform duration-100 group-data-[state=open]:rotate-180",
        className,
      )}
      data-slot="ds-select-icon"
      {...props}
    >
      {children ?? <ChevronDown className="size-5" strokeWidth={1.75} />}
    </SelectPrimitive.Icon>
  );
});

SelectIcon.displayName = "Select.Icon";

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ children, className, position = "popper", ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(selectContentVariants(), className)}
        data-slot="ds-select-content"
        position={position}
        {...props}
      >
        {children}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

SelectContent.displayName = "Select.Content";

const SelectViewport = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Viewport>,
  SelectViewportProps
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Viewport
      ref={ref}
      className={cn("w-full", className)}
      data-slot="ds-select-viewport"
      {...props}
    />
  );
});

SelectViewport.displayName = "Select.Viewport";

const SelectGroup = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Group>,
  SelectGroupProps
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Group
      ref={ref}
      className={className}
      data-slot="ds-select-group"
      {...props}
    />
  );
});

SelectGroup.displayName = "Select.Group";

const SelectGroupLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  SelectGroupLabelProps
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(selectGroupLabelVariants(), className)}
      data-slot="ds-select-group-label"
      {...props}
    />
  );
});

SelectGroupLabel.displayName = "Select.GroupLabel";

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ children, className, ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(selectItemVariants(), className)}
      data-slot="ds-select-item"
      {...props}
    >
      {children}
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = "Select.Item";

const SelectItemText = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ItemText>,
  SelectItemTextProps
>(({ className, style, ...props }, ref) => {
  return (
    <span
      className={cn("min-w-0 flex-1 truncate", className)}
      data-slot="ds-select-item-text"
      style={style}
    >
      <SelectPrimitive.ItemText ref={ref} {...props} />
    </span>
  );
});

SelectItemText.displayName = "Select.ItemText";

const SelectItemIndicator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ItemIndicator>,
  SelectItemIndicatorProps
>(({ children, className, ...props }, ref) => {
  return (
    <SelectPrimitive.ItemIndicator
      ref={ref}
      className={cn(
        "absolute right-2 inline-flex size-4 items-center justify-center text-icon-primary",
        className,
      )}
      data-slot="ds-select-item-indicator"
      {...props}
    >
      {children ?? <Check className="size-4" strokeWidth={1.75} />}
    </SelectPrimitive.ItemIndicator>
  );
});

SelectItemIndicator.displayName = "Select.ItemIndicator";

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn(selectSeparatorVariants(), className)}
      data-slot="ds-select-separator"
      {...props}
    />
  );
});

SelectSeparator.displayName = "Select.Separator";

function SelectMessage({
  className,
  id,
  invalid,
  ...props
}: SelectMessageProps) {
  return (
    <FieldDescription
      id={id}
      className={className}
      invalid={invalid}
      {...props}
    />
  );
}

SelectMessage.displayName = "Select.Message";

const Select = {
  Root: SelectRoot,
  Label: SelectLabel,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Content: SelectContent,
  Viewport: SelectViewport,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
  Separator: SelectSeparator,
  Message: SelectMessage,
};

export { Select };
