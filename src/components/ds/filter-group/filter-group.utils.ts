import type {
  FilterGroupLabel,
  NormalizedFilterGroupLabel,
} from "./filter-group.types";

function slugifyFilterValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeFilterGroupLabel(
  option: FilterGroupLabel,
  index: number,
): NormalizedFilterGroupLabel {
  if (typeof option === "string") {
    const normalizedValue = slugifyFilterValue(option) || `filter-${index + 1}`;

    return {
      disabled: false,
      id: normalizedValue,
      label: option,
      value: normalizedValue,
    };
  }

  const baseValue = option.value ?? option.label;
  const normalizedValue =
    slugifyFilterValue(baseValue) || option.id || `filter-${index + 1}`;

  return {
    disabled: option.disabled ?? false,
    id: option.id ?? normalizedValue,
    infoAriaLabel: option.infoAriaLabel,
    infoText: option.infoText,
    label: option.label,
    value: option.value ?? normalizedValue,
  };
}

function resolveNextSelectedValues(
  checked: boolean,
  selectedValues: string[],
  value: string,
) {
  if (checked) {
    if (selectedValues.includes(value)) {
      return selectedValues;
    }

    return [...selectedValues, value];
  }

  return selectedValues.filter((selectedValue) => selectedValue !== value);
}

export {
  normalizeFilterGroupLabel,
  resolveNextSelectedValues,
  slugifyFilterValue,
};
