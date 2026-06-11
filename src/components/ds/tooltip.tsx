import type * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
>;

type TooltipRootProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>;

type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
>;

function Provider({ delayDuration = 0, ...props }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

function Root({ delayDuration = 0, ...props }: TooltipRootProps) {
  return <TooltipPrimitive.Root delayDuration={delayDuration} {...props} />;
}

function Trigger(props: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger {...props} />;
}

function Content({
  align = "center",
  className,
  side = "right",
  sideOffset = 8,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        align={align}
        className={cn(
          "z-50 max-w-72 rounded-lg border border-card-surface bg-surface-default p-3",
          "font-jetbrains-mono text-xs font-normal text-text-body",
          "shadow-[0px_32px_91px_0px_rgba(0,0,0,0.6)]",
          "origin-(--radix-tooltip-content-transform-origin)",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
          className,
        )}
        side={side}
        sideOffset={sideOffset}
        {...props}
      >
        {props.children}
        <TooltipPrimitive.Arrow className="fill-surface-default" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export const Tooltip = {
  Provider,
  Root,
  Trigger,
  Content,
};
