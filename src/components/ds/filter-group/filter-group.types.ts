import type * as React from "react";

type FilterGroupLabel =
  | string
  | {
      disabled?: boolean;
      id?: string;
      infoAriaLabel?: string;
      infoText?: string;
      label: string;
      value?: string;
    };

type FilterGroupRootProps = Omit<
  React.ComponentPropsWithoutRef<"fieldset">,
  "onChange"
> & {
  defaultSelectedValues?: string[];
  filterLabels: readonly FilterGroupLabel[];
  filterTitle: string;
  name?: string;
  onInfoClick?: (option: NormalizedFilterGroupLabel) => void;
  onItemCheckedChange?: (detail: FilterGroupCheckedChangeDetail) => void;
  onSelectedValuesChange?: (selectedValues: string[]) => void;
  selectedValues?: string[];
};

type FilterGroupListProps = React.ComponentPropsWithoutRef<"div">;

type FilterGroupItemProps = React.ComponentPropsWithoutRef<"label"> & {
  checked?: boolean;
  disabled?: boolean;
  infoAriaLabel?: string;
  infoText?: string;
  inputId: string;
  label: string;
  name?: string;
  onCheckedChange?: (checked: boolean) => void;
  onInfoClick?: () => void;
  value: string;
};

type FilterGroupCheckboxProps = React.ComponentPropsWithoutRef<"span"> & {
  checked?: boolean;
  disabled?: boolean;
};

type FilterGroupTitleProps = React.ComponentPropsWithoutRef<"legend">;

type NormalizedFilterGroupLabel = {
  disabled: boolean;
  id: string;
  infoAriaLabel?: string;
  infoText?: string;
  label: string;
  value: string;
};

type FilterGroupCheckedChangeDetail = {
  checked: boolean;
  option: NormalizedFilterGroupLabel;
  selectedValues: string[];
};

export type {
  FilterGroupCheckboxProps,
  FilterGroupCheckedChangeDetail,
  FilterGroupItemProps,
  FilterGroupLabel,
  FilterGroupListProps,
  FilterGroupRootProps,
  FilterGroupTitleProps,
  NormalizedFilterGroupLabel,
};
