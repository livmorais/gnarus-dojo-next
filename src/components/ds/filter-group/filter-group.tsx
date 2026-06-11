"use client";

import * as React from "react";
import { Check, Info } from "lucide-react";
import { cva } from "class-variance-authority";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import {
  normalizeFilterGroupLabel,
  resolveNextSelectedValues,
} from "./filter-group.utils";
import type {
  FilterGroupCheckboxProps,
  FilterGroupItemProps,
  FilterGroupListProps,
  FilterGroupRootProps,
  FilterGroupTitleProps,
  NormalizedFilterGroupLabel,
  FilterGroupCheckedChangeDetail,
  FilterGroupLabel,
} from "./filter-group.types";

const filterGroupRootVariants = cva("w-full min-w-0 border-0 p-0");

const filterGroupListVariants = cva("flex flex-col items-start gap-2");

const filterGroupTitleVariants = cva(
  "mb-4 font-encode-sans text-[20px] leading-normal  tracking-[0.02em] text-text-body",
);

const filterGroupItemVariants = cva(
  [
    "group flex w-full items-start gap-4 font-roboto-flex text-base leading-[1.3] font-light",
    "transition-colors",
  ],
  {
    variants: {
      checked: {
        true: "text-feedback-info-default",
        false: "text-text-title",
      },
      disabled: {
        true: "cursor-not-allowed text-text-disabled opacity-60",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  },
);

const filterGroupCheckboxVariants = cva(
  [
    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border-2",
    "bg-surface-secondary transition-[background-color,border-color,box-shadow] duration-200",
  ],
  {
    variants: {
      checked: {
        true: "border-feedback-info-default bg-feedback-info-default",
        false: "border-border-checkbox bg-surface-secondary",
      },
      disabled: {
        true: "",
        false:
          "group-hover:border-brand-hover peer-focus-visible:ring-2 peer-focus-visible:ring-border-focus peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-transparent",
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  },
);

function FilterGroupRoot({
  children,
  className,
  defaultSelectedValues,
  filterLabels,
  filterTitle,
  name,
  onInfoClick,
  onItemCheckedChange,
  onSelectedValuesChange,
  selectedValues,
  ...props
}: FilterGroupRootProps) {
  const reactId = React.useId();
  const normalizedLabels = React.useMemo(
    () =>
      filterLabels.map((option, index) =>
        normalizeFilterGroupLabel(option, index),
      ),
    [filterLabels],
  );
  const [internalSelectedValues, setInternalSelectedValues] = React.useState(
    defaultSelectedValues ?? [],
  );

  const isControlled = selectedValues !== undefined;
  const resolvedSelectedValues = isControlled
    ? selectedValues
    : internalSelectedValues;
  const resolvedName = name ?? `${reactId}-filter-group`;
  const hasChildren = children !== undefined;

  function handleCheckedChange(
    option: NormalizedFilterGroupLabel,
    checked: boolean,
  ) {
    const nextSelectedValues = resolveNextSelectedValues(
      checked,
      resolvedSelectedValues,
      option.value,
    );

    if (!isControlled) {
      setInternalSelectedValues(nextSelectedValues);
    }

    onItemCheckedChange?.({
      checked,
      option,
      selectedValues: nextSelectedValues,
    });
    onSelectedValuesChange?.(nextSelectedValues);
  }

  function renderItems() {
    return normalizedLabels.map((option) => {
      const inputId = `${reactId}-${option.id}`;

      return (
        <FilterGroupItem
          key={option.value}
          checked={resolvedSelectedValues.includes(option.value)}
          disabled={option.disabled}
          infoAriaLabel={option.infoAriaLabel}
          infoText={option.infoText}
          inputId={inputId}
          label={option.label}
          name={resolvedName}
          onCheckedChange={(checked) => handleCheckedChange(option, checked)}
          onInfoClick={onInfoClick ? () => onInfoClick(option) : undefined}
          value={option.value}
        />
      );
    });
  }

  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <fieldset
        className={cn(filterGroupRootVariants(), className)}
        data-slot="ds-filter-group-root"
        {...props}
      >
        <FilterGroupTitle>{filterTitle}</FilterGroupTitle>
        {hasChildren ? <FilterGroupList>{children}</FilterGroupList> : null}
        {hasChildren ? null : (
          <FilterGroupList>{renderItems()}</FilterGroupList>
        )}
      </fieldset>
    </TooltipPrimitive.Provider>
  );
}

function FilterGroupList({ className, ...props }: FilterGroupListProps) {
  return (
    <div
      className={cn(filterGroupListVariants(), className)}
      data-slot="ds-filter-group-list"
      {...props}
    />
  );
}

function FilterGroupTitle({ className, ...props }: FilterGroupTitleProps) {
  return (
    <legend
      className={cn(filterGroupTitleVariants(), className)}
      data-slot="ds-filter-group-title"
      {...props}
    />
  );
}

function FilterGroupItem({
  checked = false,
  className,
  disabled = false,
  infoAriaLabel,
  infoText,
  inputId,
  label,
  name,
  onCheckedChange,
  onInfoClick,
  value,
  ...props
}: FilterGroupItemProps) {
  const hasInfo = Boolean(infoAriaLabel || infoText);
  const infoLabel = infoAriaLabel ?? infoText ?? `${label} info`;
  const infoHoverText = infoText ?? infoAriaLabel;

  function renderInfoIcon() {
    return (
      <Info
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0",
          "[&_circle]:fill-feedback-info-default",
          "[&_circle]:stroke-feedback-info-default",
          "[&_path]:stroke-(--color-surface-default)",
        )}
        strokeWidth={2.25}
      />
    );
  }

  function renderInfo() {
    if (!hasInfo) {
      return null;
    }

    return (
      <TooltipPrimitive.Root delayDuration={0}>
        <TooltipPrimitive.Trigger asChild>
          <button
            type="button"
            aria-label={infoLabel}
            className="inline-flex size-4 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onInfoClick?.();
            }}
          >
            {renderInfoIcon()}
          </button>
        </TooltipPrimitive.Trigger>

        {infoHoverText ? (
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              align="center"
              className={cn(
                "z-50 max-w-62 rounded-lg border border-card-surface  bg-surface-default p-3",
                "font-jetbrains-mono text-xs font-normal text-text-body",
                "shadow-[0px_32px_91px_0px_rgba(0,0,0,0.6)]",
                "origin-(--radix-tooltip-content-transform-origin)",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
              )}
              side="right"
              sideOffset={8}
            >
              {infoHoverText}
              <TooltipPrimitive.Arrow className="fill-surface-default" />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        ) : null}
      </TooltipPrimitive.Root>
    );
  }

  return (
    <label
      className={cn(filterGroupItemVariants({ checked, disabled }), className)}
      data-slot="ds-filter-group-item"
      htmlFor={inputId}
      {...props}
    >
      <span className="relative flex shrink-0">
        <input
          checked={checked}
          className="peer sr-only"
          disabled={disabled}
          id={inputId}
          name={name}
          onChange={(event) => onCheckedChange?.(event.target.checked)}
          type="checkbox"
          value={value}
        />
        <FilterGroupCheckbox checked={checked} disabled={disabled} />
      </span>

      <span className="flex min-w-0 items-center gap-1.5 pt-px">
        <span className="truncate">{label}</span>
        {renderInfo()}
      </span>
    </label>
  );
}

function FilterGroupCheckbox({
  checked = false,
  className,
  disabled = false,
  ...props
}: FilterGroupCheckboxProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        filterGroupCheckboxVariants({
          checked,
          disabled,
        }),
        className,
      )}
      data-slot="ds-filter-group-checkbox"
      {...props}
    >
      {checked ? (
        <Check className="size-3 text-surface-secondary" strokeWidth={3} />
      ) : null}
    </span>
  );
}

FilterGroupRoot.displayName = "FilterGroup.Root";
FilterGroupList.displayName = "FilterGroup.List";
FilterGroupTitle.displayName = "FilterGroup.Title";
FilterGroupItem.displayName = "FilterGroup.Item";
FilterGroupCheckbox.displayName = "FilterGroup.Checkbox";

const FilterGroup = {
  Root: FilterGroupRoot,
  List: FilterGroupList,
  Title: FilterGroupTitle,
  Item: FilterGroupItem,
  Checkbox: FilterGroupCheckbox,
};

export {
  FilterGroup,
  FilterGroupCheckbox,
  FilterGroupItem,
  FilterGroupList,
  FilterGroupRoot,
  FilterGroupTitle,
  normalizeFilterGroupLabel,
  resolveNextSelectedValues,
  type FilterGroupCheckedChangeDetail,
  type FilterGroupLabel,
  type FilterGroupRootProps,
  type NormalizedFilterGroupLabel,
};
