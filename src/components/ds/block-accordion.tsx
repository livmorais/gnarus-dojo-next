"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

type BlockAccordionRootProps = Omit<
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

type BlockAccordionHeaderProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Header
>;

type BlockAccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>;

type BlockAccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;

type BlockAccordionTitleProps = React.ComponentPropsWithoutRef<"span">;

type BlockAccordionProps = Omit<BlockAccordionRootProps, "children"> & {
  children: React.ReactNode;
  title: React.ReactNode;
};

const BLOCK_ACCORDION_ITEM_VALUE = "block-accordion-item";
const BLOCK_ACCORDION_CLOSED_VALUE = "";

const blockAccordionRootVariants = cva(
  "w-full overflow-hidden rounded-sm bg-surface-brand ",
);

const blockAccordionHeaderVariants = cva(
  "w-full bg-linear-to-r from-block-accordion-header-gradient-start to-block-accordion-header-gradient-end",
);

const blockAccordionTriggerVariants = cva([
  "group flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8",
  "cursor-pointer transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus focus-visible:bg-surface-subtle",
  "disabled:cursor-default disabled:opacity-60",
]);

const blockAccordionTitleVariants = cva(
  "font-encode-sans text-2xl leading-[1.15] font-light text-block-accordion-text",
);

const blockAccordionContentVariants = cva(
  "overflow-hidden bg-block-accordion-body-bg text-block-accordion-text ",
);

function resolveAccordionValue(open: boolean | undefined) {
  return open ? BLOCK_ACCORDION_ITEM_VALUE : BLOCK_ACCORDION_CLOSED_VALUE;
}

const BlockAccordionRoot = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  BlockAccordionRootProps
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

    return (
      <AccordionPrimitive.Root
        ref={ref}
        collapsible
        type="single"
        data-disabled={disabled ? "true" : undefined}
        data-slot="ds-block-accordion-root"
        className={cn(blockAccordionRootVariants(), className)}
        defaultValue={
          isControlled ? undefined : resolveAccordionValue(defaultOpen)
        }
        onValueChange={(value) => {
          onOpenChange?.(value === BLOCK_ACCORDION_ITEM_VALUE);
        }}
        value={isControlled ? resolveAccordionValue(open) : undefined}
        {...props}
      >
        <AccordionPrimitive.Item
          disabled={disabled}
          value={BLOCK_ACCORDION_ITEM_VALUE}
        >
          {children}
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    );
  },
);

const BlockAccordionHeader = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Header>,
  BlockAccordionHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header
      ref={ref}
      data-slot="ds-block-accordion-header"
      className={cn(blockAccordionHeaderVariants(), className)}
      {...props}
    />
  );
});

const BlockAccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  BlockAccordionTriggerProps
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="ds-block-accordion-trigger"
      className={cn(blockAccordionTriggerVariants(), className)}
      {...props}
    >
      <span className="min-w-0 flex-1">{children}</span>
      <span
        aria-hidden="true"
        data-slot="ds-block-accordion-icon"
        className="inline-flex size-6 shrink-0 items-center justify-center text-icon-secondary transition-transform duration-200 group-data-[state=open]:rotate-180"
      >
        <ChevronDown className="size-5" strokeWidth={1.75} />
      </span>
    </AccordionPrimitive.Trigger>
  );
});

const BlockAccordionTitle = React.forwardRef<
  HTMLSpanElement,
  BlockAccordionTitleProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="ds-block-accordion-title"
      className={cn(blockAccordionTitleVariants(), className)}
      {...props}
    />
  );
});

const BlockAccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  BlockAccordionContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="ds-block-accordion-content"
      className={cn(blockAccordionContentVariants(), className)}
      {...props}
    >
      <div
        data-slot="ds-block-accordion-body"
        className="w-full px-6 py-6 md:px-8 md:py-8"
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});

function BlockAccordionComponent({
  children,
  title,
  ...props
}: BlockAccordionProps) {
  return (
    <BlockAccordionRoot {...props}>
      <BlockAccordionHeader>
        <BlockAccordionTrigger>
          <BlockAccordionTitle>{title}</BlockAccordionTitle>
        </BlockAccordionTrigger>
      </BlockAccordionHeader>
      <BlockAccordionContent>{children}</BlockAccordionContent>
    </BlockAccordionRoot>
  );
}

BlockAccordionRoot.displayName = "BlockAccordion.Root";
BlockAccordionHeader.displayName = "BlockAccordion.Header";
BlockAccordionTrigger.displayName = "BlockAccordion.Trigger";
BlockAccordionTitle.displayName = "BlockAccordion.Title";
BlockAccordionContent.displayName = "BlockAccordion.Content";
BlockAccordionComponent.displayName = "BlockAccordion";

const BlockAccordion = Object.assign(BlockAccordionComponent, {
  Root: BlockAccordionRoot,
  Header: BlockAccordionHeader,
  Trigger: BlockAccordionTrigger,
  Title: BlockAccordionTitle,
  Content: BlockAccordionContent,
});

export {
  BlockAccordion,
  BlockAccordionContent,
  BlockAccordionHeader,
  BlockAccordionRoot,
  BlockAccordionTitle,
  BlockAccordionTrigger,
  type BlockAccordionContentProps,
  type BlockAccordionHeaderProps,
  type BlockAccordionProps,
  type BlockAccordionRootProps,
  type BlockAccordionTitleProps,
  type BlockAccordionTriggerProps,
};
