import { cva } from "class-variance-authority";

export const formContainerAccordionRootVariants = cva(
  "w-full rounded-md bg-surface-secondary",
);

export const formContainerAccordionHeaderVariants = cva(
  "w-full rounded-md bg-surface-secondary",
);

export const formContainerAccordionTriggerVariants = cva([
  "group flex w-full items-center justify-between gap-4 rounded-sm p-6 text-left",
  "text-text-title transition-colors duration-200",
  "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "disabled:cursor-default disabled:opacity-60",
]);

export const formContainerAccordionTitleVariants = cva(
  "font-encode-sans text-xl leading-none font-light text-text-title md:text-2xl",
);

export const formContainerAccordionContentVariants = cva(
  "w-full overflow-hidden rounded-md bg-surface-secondary",
);
