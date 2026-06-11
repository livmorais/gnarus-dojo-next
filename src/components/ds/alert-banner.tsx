"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Info, ShieldAlert, TriangleAlert } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ds/button";
import { cn } from "@/lib/cn";

type AlertBannerCallToAction = {
  href: string;
  label: string;
};

type AlertBannerProps = {
  className?: string;
  message: ReactNode;
  callToAction?: AlertBannerCallToAction;
} & VariantProps<typeof alertBannerVariants>;

const alertBannerVariants = cva(
  "flex items-center gap-4 px-6 text-text-title",
  {
    variants: {
      variant: {
        info: "bg-feedback-info-brand",
        warning: "bg-feedback-attention-default",
        danger: "bg-feedback-error-default",
      },
      withCallToAction: {
        true: "justify-between py-2",
        false: "justify-center py-5",
      },
    },
    defaultVariants: {
      variant: "info",
      withCallToAction: false,
    },
  },
);

const iconByVariant = {
  info: Info,
  warning: TriangleAlert,
  danger: ShieldAlert,
} as const;

export function AlertBanner({
  callToAction,
  className,
  message,
  variant = "info",
}: AlertBannerProps) {
  const Icon = iconByVariant[variant ?? "info"];

  return (
    <section
      className={cn(
        alertBannerVariants({
          variant,
          withCallToAction: Boolean(callToAction),
        }),
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex min-w-0 items-center gap-2">
        <Icon aria-hidden="true" className="size-5 shrink-0" />
        <p className="font-roboto-flex text-sm font-medium ">{message}</p>
      </div>

      {callToAction && (
        <Button.Root asChild variant="secondary">
          <Link href={callToAction.href} prefetch={false}>
            <Button.Label>{callToAction.label}</Button.Label>
          </Link>
        </Button.Root>
      )}
    </section>
  );
}
