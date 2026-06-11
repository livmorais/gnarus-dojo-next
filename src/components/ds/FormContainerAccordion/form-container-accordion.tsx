"use client";

import {
  FormContainerAccordionContent,
  FormContainerAccordionHeader,
  FormContainerAccordionRoot,
  FormContainerAccordionTitle,
  FormContainerAccordionTrigger,
} from "./form-container-accordion-slots";
import type {
  FormContainerAccordionContentProps,
  FormContainerAccordionHeaderProps,
  FormContainerAccordionProps,
  FormContainerAccordionRootProps,
  FormContainerAccordionTitleProps,
  FormContainerAccordionTriggerProps,
} from "./form-container-accordion.types";

function FormContainerAccordionComponent({
  children,
  title,
  ...props
}: FormContainerAccordionProps) {
  return (
    <FormContainerAccordionRoot {...props}>
      <FormContainerAccordionHeader>
        <FormContainerAccordionTrigger>
          <FormContainerAccordionTitle>{title}</FormContainerAccordionTitle>
        </FormContainerAccordionTrigger>
      </FormContainerAccordionHeader>
      <FormContainerAccordionContent>{children}</FormContainerAccordionContent>
    </FormContainerAccordionRoot>
  );
}

FormContainerAccordionComponent.displayName = "FormContainerAccordion";

const FormContainerAccordion = Object.assign(FormContainerAccordionComponent, {
  Root: FormContainerAccordionRoot,
  Header: FormContainerAccordionHeader,
  Trigger: FormContainerAccordionTrigger,
  Title: FormContainerAccordionTitle,
  Content: FormContainerAccordionContent,
});

export {
  FormContainerAccordion,
  FormContainerAccordionContent,
  FormContainerAccordionHeader,
  FormContainerAccordionRoot,
  FormContainerAccordionTitle,
  FormContainerAccordionTrigger,
  type FormContainerAccordionContentProps,
  type FormContainerAccordionHeaderProps,
  type FormContainerAccordionProps,
  type FormContainerAccordionRootProps,
  type FormContainerAccordionTitleProps,
  type FormContainerAccordionTriggerProps,
};
