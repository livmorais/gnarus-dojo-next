import type * as React from "react";

type ProgressCircleSize = "default" | "mini";
type ProgressCircleDisplayMode = "percentage" | "fraction";

type ProgressCircleRootBaseProps = React.ComponentPropsWithoutRef<"div"> & {
  displayValue?: string;
  ariaLabel?: string;
  size?: ProgressCircleSize;
};

type ProgressCircleRootValueProps = ProgressCircleRootBaseProps & {
  value: number;
  current?: never;
  total?: never;
  displayMode?: never;
};

type ProgressCircleRootFractionProps = ProgressCircleRootBaseProps & {
  value?: never;
  current: number;
  total: number;
  displayMode?: ProgressCircleDisplayMode;
};

type ProgressCircleRootProps =
  | ProgressCircleRootValueProps
  | ProgressCircleRootFractionProps;

type ProgressCircleTrackProps = React.ComponentPropsWithoutRef<"svg">;
type ProgressCircleIndicatorProps = React.ComponentPropsWithoutRef<"svg">;
type ProgressCircleValueProps = React.ComponentPropsWithoutRef<"span"> & {
  formatValue?: (value: number, displayValue: string) => React.ReactNode;
};

type ProgressCircleContextValue = {
  displayMode: ProgressCircleDisplayMode;
  displayValue: string;
  size: ProgressCircleSize;
  value: number;
};

type ProgressCircleSourceKey = "fraction" | "value";

type ProgressCircleDisplayFormatterInput = {
  current: number;
  normalizedValue: number;
  total: number;
};

type ProgressCircleMetricsResolverInput = {
  current?: number;
  displayMode: ProgressCircleDisplayMode;
  displayValue?: string;
  total?: number;
  value?: number;
};

type ProgressCircleMetrics = {
  displayValue: string;
  value: number;
};

export type {
  ProgressCircleContextValue,
  ProgressCircleDisplayFormatterInput,
  ProgressCircleDisplayMode,
  ProgressCircleIndicatorProps,
  ProgressCircleMetrics,
  ProgressCircleMetricsResolverInput,
  ProgressCircleRootProps,
  ProgressCircleSize,
  ProgressCircleSourceKey,
  ProgressCircleTrackProps,
  ProgressCircleValueProps,
};
