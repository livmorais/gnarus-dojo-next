import type * as React from "react";
import type { Select as SelectPrimitive } from "radix-ui";
import type {
  FieldDescriptionProps,
  FieldLabelProps,
  FieldProps,
} from "@/components/ds/field";

type SelectRootProps = Omit<FieldProps, "defaultValue" | "dir" | "id"> &
  Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    "children"
  > & {
    children: React.ReactNode;
  };

type SelectLabelProps = Omit<FieldLabelProps, "readOnly">;

type SelectMessageProps = Omit<FieldDescriptionProps, "id" | "readOnly"> & {
  id: string;
};

type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> & {
  rounded?: boolean;
  variant?: "default" | "secondary";
};

type SelectValueProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Value
>;

type SelectIconProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Icon
>;

type SelectContentProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
>;

type SelectViewportProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Viewport
>;

type SelectGroupProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Group
>;

type SelectGroupLabelProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Label
>;

type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;

type SelectItemTextProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ItemText
>;

type SelectItemIndicatorProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ItemIndicator
>;

type SelectSeparatorProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Separator
>;

export type {
  SelectContentProps,
  SelectGroupLabelProps,
  SelectGroupProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectMessageProps,
  SelectRootProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectViewportProps,
};
