"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDownCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { FORM_CONTAINER_ACCORDION_ITEM_VALUE } from "./form-container-accordion.constants";
import {
  formContainerAccordionContentVariants,
  formContainerAccordionHeaderVariants,
  formContainerAccordionRootVariants,
  formContainerAccordionTitleVariants,
  formContainerAccordionTriggerVariants,
} from "./form-container-accordion.styles";
import type {
  FormContainerAccordionContentProps,
  FormContainerAccordionHeaderProps,
  FormContainerAccordionRootProps,
  FormContainerAccordionTitleProps,
  FormContainerAccordionTriggerProps,
} from "./form-container-accordion.types";
import { resolveAccordionValue } from "./form-container-accordion.utils";

const FormContainerAccordionRoot = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  FormContainerAccordionRootProps
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
        data-slot="ds-form-container-accordion-root"
        className={cn(formContainerAccordionRootVariants(), className)}
        defaultValue={
          isControlled ? undefined : resolveAccordionValue(defaultOpen)
        }
        onValueChange={(value) => {
          onOpenChange?.(value === FORM_CONTAINER_ACCORDION_ITEM_VALUE);
        }}
        value={isControlled ? resolveAccordionValue(open) : undefined}
        {...props}
      >
        <AccordionPrimitive.Item
          disabled={disabled}
          value={FORM_CONTAINER_ACCORDION_ITEM_VALUE}
          className="flex flex-col gap-2"
        >
          {children}
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    );
  },
);

const FormContainerAccordionHeader = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Header>,
  FormContainerAccordionHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header
      ref={ref}
      data-slot="ds-form-container-accordion-header"
      className={cn(formContainerAccordionHeaderVariants(), className)}
      {...props}
    />
  );
});

const FormContainerAccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  FormContainerAccordionTriggerProps
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="ds-form-container-accordion-trigger"
      className={cn(formContainerAccordionTriggerVariants(), className)}
      {...props}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <span
        aria-hidden="true"
        data-slot="ds-form-container-accordion-icon"
        className="inline-flex size-6 shrink-0 items-center justify-center text-icon-secondary transition-transform duration-200 group-data-[state=open]:rotate-180"
      >
        <ChevronDownCircle className="size-5" strokeWidth={1.75} />
      </span>
    </AccordionPrimitive.Trigger>
  );
});

const FormContainerAccordionTitle = React.forwardRef<
  HTMLSpanElement,
  FormContainerAccordionTitleProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="ds-form-container-accordion-title"
      className={cn(formContainerAccordionTitleVariants(), className)}
      {...props}
    />
  );
});

const FormContainerAccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  FormContainerAccordionContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="ds-form-container-accordion-content"
      className={cn(formContainerAccordionContentVariants(), className)}
      {...props}
    >
      <div
        data-slot="ds-form-container-accordion-body"
        className="w-full px-6 pb-6"
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});

FormContainerAccordionRoot.displayName = "FormContainerAccordion.Root";
FormContainerAccordionHeader.displayName = "FormContainerAccordion.Header";
FormContainerAccordionTrigger.displayName = "FormContainerAccordion.Trigger";
FormContainerAccordionTitle.displayName = "FormContainerAccordion.Title";
FormContainerAccordionContent.displayName = "FormContainerAccordion.Content";

export {
  FormContainerAccordionContent,
  FormContainerAccordionHeader,
  FormContainerAccordionRoot,
  FormContainerAccordionTitle,
  FormContainerAccordionTrigger,
};
