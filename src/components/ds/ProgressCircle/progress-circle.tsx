"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";
import {
  clampProgressCircleValue,
  formatProgressCircleValue,
  resolveProgressCircleMetrics,
} from "./progress-circle.utils";
import type {
  ProgressCircleContextValue,
  ProgressCircleDisplayMode,
  ProgressCircleIndicatorProps,
  ProgressCircleRootProps,
  ProgressCircleSize,
  ProgressCircleTrackProps,
  ProgressCircleValueProps,
} from "./progress-circle.types";

const PROGRESS_CIRCLE_RADIUS = 45;
const PROGRESS_CIRCLE_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_CIRCLE_RADIUS;

const ProgressCircleContext =
  React.createContext<ProgressCircleContextValue | null>(null);

const progressCircleRootVariants = cva(
  "relative inline-grid shrink-0 place-items-center",
  {
    variants: {
      size: {
        default: "size-30 md:size-36",
        mini: "size-15",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const progressCircleValueVariants = cva(
  [
    "absolute inset-0 flex items-center justify-center text-center tabular-nums",
    "font-encode-sans tracking-normal",
  ],
  {
    variants: {
      displayMode: {
        fraction: "",
        percentage: "",
      },
      size: {
        default:
          "text-4xl leading-none font-thin text-text-title md:text-[40px]",
        mini: "text-base leading-none font-medium text-text-body",
      },
    },
    compoundVariants: [
      {
        className: "text-[36px] md:text-[36px]",
        displayMode: "fraction",
        size: "default",
      },
    ],
    defaultVariants: {
      displayMode: "percentage",
      size: "default",
    },
  },
);

function useProgressCircleContext() {
  const context = React.useContext(ProgressCircleContext);

  if (!context) {
    throw new Error(
      "ProgressCircle components must be used within ProgressCircle.Root.",
    );
  }

  return context;
}

function ProgressCircleRoot({
  "aria-label": nativeAriaLabel,
  "aria-valuetext": nativeAriaValueText,
  ariaLabel,
  value,
  current,
  children,
  className,
  displayMode = "percentage",
  displayValue,
  size = "default",
  total,
  ...props
}: ProgressCircleRootProps) {
  const resolvedMetrics = resolveProgressCircleMetrics(
    value,
    current,
    total,
    displayMode,
    displayValue,
  );

  return (
    <ProgressCircleContext.Provider
      value={{
        displayMode,
        displayValue: resolvedMetrics.displayValue,
        size,
        value: resolvedMetrics.value,
      }}
    >
      <div
        aria-label={nativeAriaLabel ?? ariaLabel}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={resolvedMetrics.value}
        aria-valuetext={nativeAriaValueText ?? resolvedMetrics.displayValue}
        data-size={size}
        data-slot="ds-progress-circle-root"
        role="progressbar"
        className={cn(progressCircleRootVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </ProgressCircleContext.Provider>
  );
}

function ProgressCircleTrack({
  className,
  ...props
}: ProgressCircleTrackProps) {
  return (
    <svg
      aria-hidden="true"
      data-slot="ds-progress-circle-track"
      viewBox="0 0 100 100"
      className={cn("absolute inset-0 size-full -rotate-90", className)}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r={PROGRESS_CIRCLE_RADIUS}
        className="fill-none stroke-card-surface"
        strokeWidth="4"
      />
    </svg>
  );
}

function ProgressCircleIndicator({
  className,
  style,
  ...props
}: ProgressCircleIndicatorProps) {
  const { value } = useProgressCircleContext();
  const strokeDashoffset = PROGRESS_CIRCLE_CIRCUMFERENCE * (1 - value / 100);

  return (
    <svg
      aria-hidden="true"
      data-slot="ds-progress-circle-indicator"
      viewBox="0 0 100 100"
      className={cn("absolute inset-0 size-full -rotate-90", className)}
      style={style}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r={PROGRESS_CIRCLE_RADIUS}
        className="fill-none stroke-feedback-success-default transition-[stroke-dashoffset] duration-300 ease-out"
        strokeDasharray={PROGRESS_CIRCLE_CIRCUMFERENCE}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function ProgressCircleValue({
  children,
  className,
  formatValue,
  ...props
}: ProgressCircleValueProps) {
  const { displayMode, displayValue, size, value } = useProgressCircleContext();
  const resolvedContent =
    children ?? formatValue?.(value, displayValue) ?? displayValue;

  return (
    <span
      data-slot="ds-progress-circle-value"
      className={cn(
        progressCircleValueVariants({ displayMode, size }),
        className,
      )}
      {...props}
    >
      {resolvedContent}
    </span>
  );
}

ProgressCircleRoot.displayName = "ProgressCircle.Root";
ProgressCircleTrack.displayName = "ProgressCircle.Track";
ProgressCircleIndicator.displayName = "ProgressCircle.Indicator";
ProgressCircleValue.displayName = "ProgressCircle.Value";

const ProgressCircle = {
  Root: ProgressCircleRoot,
  Track: ProgressCircleTrack,
  Indicator: ProgressCircleIndicator,
  Value: ProgressCircleValue,
};

export {
  ProgressCircle,
  ProgressCircleIndicator,
  ProgressCircleRoot,
  ProgressCircleTrack,
  ProgressCircleValue,
  clampProgressCircleValue,
  formatProgressCircleValue,
  resolveProgressCircleMetrics,
  type ProgressCircleDisplayMode,
  type ProgressCircleRootProps,
  type ProgressCircleSize,
};
