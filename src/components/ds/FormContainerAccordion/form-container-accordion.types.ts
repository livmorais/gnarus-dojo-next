import type * as React from "react";
import type { Accordion as AccordionPrimitive } from "radix-ui";

export type FormContainerAccordionRootProps = Omit<
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

export type FormContainerAccordionHeaderProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Header
>;

export type FormContainerAccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>;

export type FormContainerAccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;

export type FormContainerAccordionTitleProps =
  React.ComponentPropsWithoutRef<"span">;

export type FormContainerAccordionProps = Omit<
  FormContainerAccordionRootProps,
  "children"
> & {
  children: React.ReactNode;
  title: React.ReactNode;
};
