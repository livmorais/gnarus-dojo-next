"use client";

import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/cn";

type ProgressBarValue = number | `${number}`;
type ProgressBarSize = "sm" | "md";

type ProgressBarRootProps = React.ComponentPropsWithoutRef<"div"> & {
  value: ProgressBarValue;
  ariaLabel?: string;
  rounded?: boolean;
  size?: ProgressBarSize;
};

type ProgressBarTrackProps = React.ComponentPropsWithoutRef<"div">;
type ProgressBarIndicatorProps = React.ComponentPropsWithoutRef<"div">;
type ProgressBarValueProps = React.ComponentPropsWithoutRef<"span"> & {
  formatValue?: (value: number) => string;
};

type ProgressBarContextValue = {
  ariaLabel?: string;
  rounded: boolean;
  size: ProgressBarSize;
  value: number;
};

const ProgressBarContext = React.createContext<ProgressBarContextValue | null>(
  null,
);

const progressBarRootVariants = cva("flex w-full items-center gap-2.5");

const progressBarTrackVariants = cva(
  "relative w-full overflow-hidden bg-surface-default",
  {
    variants: {
      rounded: {
        true: "rounded-full",
        false: "rounded-none",
      },
      size: {
        sm: "h-0.5",
        md: "h-1",
      },
    },
    defaultVariants: {
      rounded: true,
      size: "sm",
    },
  },
);

const progressBarIndicatorVariants = cva("h-full bg-feedback-success-default", {
  variants: {
    rounded: {
      true: "rounded-full",
      false: "rounded-none",
    },
  },
  defaultVariants: {
    rounded: true,
  },
});

const progressBarValueVariants = cva(
  "shrink-0 whitespace-nowrap font-encode-sans font-medium text-text-body",
  {
    variants: {
      size: {
        sm: "text-base leading-normal",
        md: "text-lg leading-none",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

function normalizeProgressValue(value: ProgressBarValue) {
  const parsedValue =
    typeof value === "number" ? value : Number.parseFloat(value);
  if (!Number.isFinite(parsedValue)) {
    return 0;
  }
  return Math.min(100, Math.max(0, parsedValue));
}

function formatProgressLabel(value: number) {
  return `${Number.isInteger(value) ? value.toString() : value.toFixed(1).replace(/\.0$/, "")}%`;
}

function useProgressBarContext() {
  const context = React.useContext(ProgressBarContext);
  if (!context) {
    throw new Error(
      "ProgressBar components must be used within ProgressBar.Root.",
    );
  }
  return context;
}

function ProgressBarRoot({
  ariaLabel,
  children,
  className,
  rounded = true,
  size = "sm",
  value,
  ...props
}: ProgressBarRootProps) {
  const normalizedValue = normalizeProgressValue(value);

  return (
    <ProgressBarContext.Provider
      value={{
        ariaLabel: ariaLabel,
        rounded,
        size,
        value: normalizedValue,
      }}
    >
      <div
        data-rounded={rounded ? "true" : "false"}
        data-size={size}
        data-slot="ds-progress-bar-root"
        className={cn(progressBarRootVariants(), className)}
        {...props}
      >
        {children}
      </div>
    </ProgressBarContext.Provider>
  );
}

function ProgressBarTrack({
  children,
  className,
  ...props
}: ProgressBarTrackProps) {
  const { ariaLabel, rounded, size, value } = useProgressBarContext();

  return (
    <div
      aria-label={ariaLabel}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      data-slot="ds-progress-bar-track"
      role="progressbar"
      className={cn(progressBarTrackVariants({ rounded, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ProgressBarIndicator({
  className,
  style,
  ...props
}: ProgressBarIndicatorProps) {
  const { rounded, value } = useProgressBarContext();
  return (
    <div
      aria-hidden="true"
      data-slot="ds-progress-bar-indicator"
      className={cn(
        progressBarIndicatorVariants({ rounded }),
        "transition-[width] duration-300 ease-out",
        className,
      )}
      style={{ ...style, width: `${value}%` }}
      {...props}
    />
  );
}

function ProgressBarValue({
  className,
  formatValue,
  ...props
}: ProgressBarValueProps) {
  const { size, value } = useProgressBarContext();
  return (
    <span
      data-slot="ds-progress-bar-value"
      className={cn(progressBarValueVariants({ size }), className)}
      {...props}
    >
      {formatValue ? formatValue(value) : formatProgressLabel(value)}
    </span>
  );
}

ProgressBarRoot.displayName = "ProgressBar.Root";
ProgressBarTrack.displayName = "ProgressBar.Track";
ProgressBarIndicator.displayName = "ProgressBar.Indicator";
ProgressBarValue.displayName = "ProgressBar.Value";
const ProgressBar = {
  Root: ProgressBarRoot,
  Track: ProgressBarTrack,
  Indicator: ProgressBarIndicator,
  Value: ProgressBarValue,
};

export {
  ProgressBar,
  ProgressBarIndicator,
  ProgressBarRoot,
  ProgressBarTrack,
  formatProgressLabel,
  normalizeProgressValue,
  type ProgressBarRootProps,
  type ProgressBarSize,
  type ProgressBarValue,
};
