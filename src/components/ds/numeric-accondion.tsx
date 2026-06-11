"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type NumericAccondionRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
  | "children"
  | "collapsible"
  | "defaultValue"
  | "onValueChange"
  | "type"
  | "value"
> & {
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type NumericAccondionHeaderProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Header
>;

type NumericAccondionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>;

type NumericAccondionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;

type NumericAccondionIndexProps = React.ComponentPropsWithoutRef<"span">;
type NumericAccondionTitleProps = React.ComponentPropsWithoutRef<"span">;

type NumericAccondionProps = Omit<NumericAccondionRootProps, "children"> & {
  children: React.ReactNode;
  index: React.ReactNode;
  title: React.ReactNode;
};

const NUMERIC_ACCONDION_ITEM_VALUE = "numeric-accondion-item";
const NUMERIC_ACCONDION_CLOSED_VALUE = "numeric-accondion-closed";

function resolveAccordionValue(open: boolean | undefined) {
  return open ? NUMERIC_ACCONDION_ITEM_VALUE : NUMERIC_ACCONDION_CLOSED_VALUE;
}

const NumericAccondionRoot = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  NumericAccondionRootProps
>(
  (
    {
      children,
      className,
      defaultOpen = false,
      disabled = false,
      open,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const isControlled = open !== undefined;
    const resolvedControlledValue = (() => {
      if (disabled) return NUMERIC_ACCONDION_CLOSED_VALUE;
      if (isControlled) return resolveAccordionValue(open);
      return undefined;
    })();

    return (
      <AccordionPrimitive.Root
        ref={ref}
        collapsible
        type="single"
        data-disabled={disabled ? "true" : undefined}
        data-slot="ds-numeric-accondion-root"
        className={cn("w-full overflow-hidden rounded-sm", className)}
        defaultValue={
          isControlled || disabled
            ? undefined
            : resolveAccordionValue(defaultOpen)
        }
        onValueChange={(value) => {
          onOpenChange?.(value === NUMERIC_ACCONDION_ITEM_VALUE);
        }}
        value={resolvedControlledValue}
        {...props}
      >
        <AccordionPrimitive.Item
          disabled={disabled}
          value={NUMERIC_ACCONDION_ITEM_VALUE}
          className="overflow-hidden rounded-sm"
        >
          {children}
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    );
  },
);

const NumericAccondionHeader = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Header>,
  NumericAccondionHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header
      ref={ref}
      data-slot="ds-numeric-accondion-header"
      className={cn("w-full", className)}
      {...props}
    />
  );
});

const NumericAccondionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  NumericAccondionTriggerProps
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="ds-numeric-accondion-trigger"
      className={cn(
        [
          "group grid w-full grid-cols-[4rem_1fr_4rem] items-stretch text-left md:grid-cols-[6.25rem_1fr_6.25rem] lg:grid-cols-[7.5rem_1fr_7.5rem]",
          "cursor-pointer transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus",
          "disabled:cursor-default disabled:opacity-60",
        ],
        className,
      )}
      {...props}
    >
      {children}
      <NumericAccondionTriggerStatus />
    </AccordionPrimitive.Trigger>
  );
});

const NumericAccondionIndex = React.forwardRef<
  HTMLSpanElement,
  NumericAccondionIndexProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="ds-numeric-accondion-index"
      className={cn(
        [
          "relative flex items-center justify-center overflow-hidden bg-accordion-index-block text-center",
          "before:absolute before:inset-y-0 before:left-0 before:w-1.75 before:bg-brand-default before:content-[''] md:before:w-1.75 lg:before:w-2",
          "font-encode-sans text-4xl leading-[1.4rem] font-light text-accordion-index-text md:leading-[2.0833125rem] lg:leading-10",
        ],
        className,
      )}
      {...props}
    />
  );
});

const NumericAccondionTitle = React.forwardRef<
  HTMLSpanElement,
  NumericAccondionTitleProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="ds-numeric-accondion-title"
      className={cn(
        "flex items-center text-accordion-title-text bg-accordion-title-block p-6 font-encode-sans text-xl leading-4 font-normal md:leading-[1.6rem]",
        className,
      )}
      {...props}
    />
  );
});

function NumericAccondionTriggerStatus() {
  return (
    <span
      aria-hidden="true"
      data-slot="ds-numeric-accondion-status"
      className={cn([
        "flex items-center justify-center bg-accordion-status-block text-accordion-status-icon",
        "**:data-[slot=ds-numeric-accondion-chevron]:transition-transform **:data-[slot=ds-numeric-accondion-chevron]:duration-200",
        "group-data-[state=open]:**:data-[slot=ds-numeric-accondion-chevron]:-rotate-180",
      ])}
    >
      <span
        data-slot="ds-numeric-accondion-chevron"
        className="inline-flex items-center justify-center"
      >
        <ChevronDown
          className="size-4 md:size-5 lg:size-6"
          strokeWidth={1.75}
        />
      </span>
    </span>
  );
}

const NumericAccondionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  NumericAccondionContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="ds-numeric-accondion-content"
      className={cn(
        "overflow-hidden bg-accordion-content-block text-accordion-content-text",
        className,
      )}
      {...props}
    >
      <div
        data-slot="ds-numeric-accondion-body"
        className="border-border-default px-8.75 py-10 pr-10 md:px-8.75 md:py-10 md:pr-10 lg:px-10 lg:py-10"
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});

function NumericAccondionComponent({
  children,
  index,
  title,
  ...props
}: NumericAccondionProps) {
  return (
    <NumericAccondionRoot {...props}>
      <NumericAccondionHeader>
        <NumericAccondionTrigger>
          <NumericAccondionIndex>{index}</NumericAccondionIndex>
          <NumericAccondionTitle>{title}</NumericAccondionTitle>
        </NumericAccondionTrigger>
      </NumericAccondionHeader>
      <NumericAccondionContent>{children}</NumericAccondionContent>
    </NumericAccondionRoot>
  );
}

NumericAccondionRoot.displayName = "NumericAccondion.Root";
NumericAccondionHeader.displayName = "NumericAccondion.Header";
NumericAccondionTrigger.displayName = "NumericAccondion.Trigger";
NumericAccondionIndex.displayName = "NumericAccondion.Index";
NumericAccondionTitle.displayName = "NumericAccondion.Title";
NumericAccondionContent.displayName = "NumericAccondion.Content";
NumericAccondionComponent.displayName = "NumericAccondion";

const NumericAccondion = Object.assign(NumericAccondionComponent, {
  Root: NumericAccondionRoot,
  Header: NumericAccondionHeader,
  Trigger: NumericAccondionTrigger,
  Index: NumericAccondionIndex,
  Title: NumericAccondionTitle,
  Content: NumericAccondionContent,
});

export {
  NumericAccondion,
  NumericAccondionContent,
  NumericAccondionHeader,
  NumericAccondionIndex,
  NumericAccondionRoot,
  NumericAccondionTitle,
  NumericAccondionTrigger,
  type NumericAccondionContentProps,
  type NumericAccondionHeaderProps,
  type NumericAccondionIndexProps,
  type NumericAccondionProps,
  type NumericAccondionRootProps,
  type NumericAccondionTitleProps,
  type NumericAccondionTriggerProps,
};
