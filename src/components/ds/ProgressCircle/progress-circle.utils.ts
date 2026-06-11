import type {
  ProgressCircleDisplayFormatterInput,
  ProgressCircleDisplayMode,
  ProgressCircleMetrics,
  ProgressCircleMetricsResolverInput,
  ProgressCircleSourceKey,
} from "./progress-circle.types";

const progressCircleDisplayFormatters: Record<
  ProgressCircleDisplayMode,
  (input: ProgressCircleDisplayFormatterInput) => string
> = {
  fraction: ({ current, total }) =>
    formatProgressCircleFraction(current, total),
  percentage: ({ normalizedValue }) =>
    formatProgressCircleValue(normalizedValue),
};

function clampProgressCircleValue(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

function formatProgressCircleValue(value: number) {
  const normalizedValue = clampProgressCircleValue(value);

  if (Number.isInteger(normalizedValue)) {
    return `${normalizedValue.toString()}%`;
  }

  return `${normalizedValue.toFixed(1).replace(/\.0$/, "")}%`;
}

function formatProgressCircleFraction(current: number, total: number) {
  return `${current}/${total}`;
}

function sanitizeProgressCircleFractionValue(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return value;
}
function resolveFractionProgressCircleMetrics({
  current = 0,
  displayMode,
  displayValue,
  total = 0,
}: ProgressCircleMetricsResolverInput): ProgressCircleMetrics {
  const sanitizedCurrent = sanitizeProgressCircleFractionValue(current);
  const sanitizedTotal = sanitizeProgressCircleFractionValue(total);
  const percentValue =
    sanitizedTotal > 0 ? (sanitizedCurrent * 100) / sanitizedTotal : 0;
  const normalizedValue = clampProgressCircleValue(percentValue);
  const formatDisplayValue = progressCircleDisplayFormatters[displayMode];

  return {
    displayValue:
      displayValue ??
      formatDisplayValue({
        current: sanitizedCurrent,
        normalizedValue,
        total: sanitizedTotal,
      }),
    value: normalizedValue,
  };
}

function resolveValueProgressCircleMetrics({
  displayValue,
  value = 0,
}: ProgressCircleMetricsResolverInput): ProgressCircleMetrics {
  const normalizedValue = clampProgressCircleValue(value);

  return {
    displayValue:
      displayValue ??
      progressCircleDisplayFormatters.percentage({
        current: normalizedValue,
        normalizedValue,
        total: 100,
      }),
    value: normalizedValue,
  };
}

const progressCircleMetricsResolvers: Record<
  ProgressCircleSourceKey,
  (input: ProgressCircleMetricsResolverInput) => ProgressCircleMetrics
> = {
  fraction: resolveFractionProgressCircleMetrics,
  value: resolveValueProgressCircleMetrics,
};

function resolveProgressCircleMetrics(
  value: number | undefined,
  current: number | undefined,
  total: number | undefined,
  displayMode: ProgressCircleDisplayMode,
  displayValue?: string,
) {
  const sourceKey =
    current !== undefined && total !== undefined ? "fraction" : "value";
  const resolveMetrics = progressCircleMetricsResolvers[sourceKey];

  return resolveMetrics({
    current,
    displayMode,
    displayValue,
    total,
    value,
  });
}

export {
  clampProgressCircleValue,
  formatProgressCircleValue,
  resolveProgressCircleMetrics,
};
