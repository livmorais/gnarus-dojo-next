"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

type PaginationMetadata = {
  currentPage: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  itemsOnPage?: number;
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
};

type PaginationItem = {
  key: string;
} & (
  | {
      current: boolean;
      page: number;
      type: "page";
    }
  | {
      type: "ellipsis";
    }
);

type PaginationResolvedState = {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemsOnPage?: number;
  pageItems: PaginationItem[];
  pageSize?: number;
  totalItems?: number;
  totalPages: number;
};

type PaginationLabels = {
  ellipsis: string;
  navigation: string;
  next: string;
  page: (page: number) => string;
  previous: string;
};

type PaginationProps = React.ComponentPropsWithoutRef<"nav"> & {
  getHref?: (page: number) => string;
  labels?: Partial<PaginationLabels>;
  metadata: PaginationMetadata;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  summary?:
    | boolean
    | React.ReactNode
    | ((state: PaginationResolvedState) => React.ReactNode);
};

const paginationControlVariants = cva(
  [
    "inline-flex size-8 shrink-0 items-center justify-center rounded-full",
    "text-icon-primary transition-[background-color,color,opacity] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  ],
  {
    variants: {
      disabled: {
        true: "cursor-default bg-button-secondary-default opacity-50",
        false: "cursor-pointer bg-border-default hover:bg-surface-interactive",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

const paginationPageVariants = cva(
  [
    "inline-flex h-8 min-w-8 items-center justify-center px-3 py-2.5",
    "font-roboto-flex text-xs leading-none transition-[background-color,color,opacity] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  ],
  {
    variants: {
      current: {
        true: "rounded-sm bg-brand-default font-bold text-pagination-current-text",
        false: "font-light text-text-body",
      },
      disabled: {
        true: "cursor-default opacity-60",
        false: "",
      },
      interactive: {
        true: "cursor-pointer hover:text-text-title",
        false: "",
      },
    },
    defaultVariants: {
      current: false,
      disabled: false,
      interactive: true,
    },
  },
);

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), totalPages);
}

function createPageRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function buildPaginationItems(
  totalPages: number,
  currentPage: number,
  siblingCount: number,
): PaginationItem[] {
  if (totalPages <= 5) {
    return createPageRange(1, totalPages).map(
      (page): PaginationItem => ({
        current: page === currentPage,
        key: `page-${page}`,
        page,
        type: "page",
      }),
    );
  }

  const nearStartThreshold = 2 + siblingCount;
  const nearEndThreshold = totalPages - (1 + siblingCount);

  if (currentPage <= nearStartThreshold) {
    return [
      ...createPageRange(1, nearStartThreshold + siblingCount).map(
        (page): PaginationItem => ({
          current: page === currentPage,
          key: `page-${page}`,
          page,
          type: "page",
        }),
      ),
      { key: "ellipsis-end", type: "ellipsis" },
      {
        current: false,
        key: `page-${totalPages}`,
        page: totalPages,
        type: "page",
      },
    ];
  }

  if (currentPage >= nearEndThreshold) {
    return [
      {
        current: false,
        key: "page-1",
        page: 1,
        type: "page",
      },
      { key: "ellipsis-start", type: "ellipsis" },
      ...createPageRange(nearEndThreshold - siblingCount, totalPages).map(
        (page): PaginationItem => ({
          current: page === currentPage,
          key: `page-${page}`,
          page,
          type: "page",
        }),
      ),
    ];
  }

  return [
    {
      current: false,
      key: "page-1",
      page: 1,
      type: "page",
    },
    { key: "ellipsis-start", type: "ellipsis" },
    ...createPageRange(
      currentPage - siblingCount,
      currentPage + siblingCount,
    ).map(
      (page): PaginationItem => ({
        current: page === currentPage,
        key: `page-${page}`,
        page,
        type: "page",
      }),
    ),
    { key: "ellipsis-end", type: "ellipsis" },
    {
      current: false,
      key: `page-${totalPages}`,
      page: totalPages,
      type: "page",
    },
  ];
}

function resolveTotalPages(metadata: PaginationMetadata) {
  if (metadata.totalPages && metadata.totalPages > 0) {
    return metadata.totalPages;
  }

  if (metadata.pageSize && metadata.totalItems !== undefined) {
    return Math.max(1, Math.ceil(metadata.totalItems / metadata.pageSize));
  }

  return Math.max(1, metadata.currentPage);
}

function resolveItemsOnPage(
  metadata: PaginationMetadata,
  currentPage: number,
  totalPages: number,
) {
  const { itemsOnPage, pageSize, totalItems } = metadata;

  if (itemsOnPage !== undefined) {
    return itemsOnPage;
  }

  if (totalItems === undefined || pageSize === undefined) {
    return pageSize;
  }

  if (totalItems === 0) {
    return 0;
  }

  if (currentPage < totalPages) {
    return pageSize;
  }

  const consumedItems = pageSize * (currentPage - 1);

  return Math.max(totalItems - consumedItems, 0);
}

function resolvePaginationState(
  metadata: PaginationMetadata,
  siblingCount: number,
): PaginationResolvedState {
  const totalPages = resolveTotalPages(metadata);
  const currentPage = clampPage(metadata.currentPage, totalPages);
  const itemsOnPage = resolveItemsOnPage(metadata, currentPage, totalPages);

  return {
    currentPage,
    hasNextPage: metadata.hasNextPage ?? currentPage < totalPages,
    hasPreviousPage: metadata.hasPreviousPage ?? currentPage > 1,
    itemsOnPage,
    pageItems: buildPaginationItems(totalPages, currentPage, siblingCount),
    pageSize: metadata.pageSize,
    totalItems: metadata.totalItems,
    totalPages,
  };
}

function resolveSummary(state: PaginationResolvedState) {
  if (state.totalItems === undefined || state.itemsOnPage === undefined) {
    return null;
  }

  return `Mostrando ${state.itemsOnPage} de ${state.totalItems} itens`;
}

function renderSummary(
  summary: PaginationProps["summary"],
  state: PaginationResolvedState,
) {
  if (summary === false) {
    return null;
  }

  if (typeof summary === "function") {
    return summary(state);
  }

  if (summary && summary !== true) {
    return summary;
  }

  return resolveSummary(state);
}

function renderPaginationItem(
  item: PaginationItem,
  resolvedLabels: PaginationLabels,
  getHref: PaginationProps["getHref"],
  onPageChange: PaginationProps["onPageChange"],
) {
  if (item.type === "ellipsis") {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-8 min-w-8 items-center justify-center px-3 py-2.5 font-roboto-flex text-xs leading-none text-text-body"
        data-slot="ds-pagination-ellipsis"
      >
        {resolvedLabels.ellipsis}
      </span>
    );
  }

  return (
    <PaginationAction
      ariaCurrent={item.current ? "page" : undefined}
      ariaLabel={item.current ? undefined : resolvedLabels.page(item.page)}
      className={cn(
        paginationPageVariants({
          current: item.current,
          interactive: !item.current,
        }),
      )}
      dataSlot="ds-pagination-page"
      href={item.current ? undefined : getHref?.(item.page)}
      onClick={(event) => {
        if (item.current) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onPageChange?.(item.page);
      }}
    >
      {item.page}
    </PaginationAction>
  );
}

function PaginationAction({
  ariaCurrent,
  ariaLabel,
  children,
  className,
  dataSlot,
  disabled = false,
  href,
  onClick,
}: {
  ariaCurrent?: React.AriaAttributes["aria-current"];
  ariaLabel?: string;
  children: React.ReactNode;
  className: string;
  dataSlot: string;
  disabled?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}) {
  const sharedProps = {
    "aria-current": ariaCurrent,
    "aria-label": ariaLabel,
    className,
    "data-slot": dataSlot,
    onClick,
  };

  if (ariaCurrent === "page") {
    return <span {...sharedProps}>{children}</span>;
  }

  if (href && !disabled) {
    return (
      <Link {...sharedProps} href={href} prefetch={false}>
        {children}
      </Link>
    );
  }

  return (
    <button
      {...sharedProps}
      type="button"
      aria-disabled={disabled ? "true" : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Pagination({
  className,
  getHref,
  labels,
  metadata,
  onPageChange,
  siblingCount = 1,
  summary = true,
  ...props
}: PaginationProps) {
  const state = React.useMemo(
    () => resolvePaginationState(metadata, siblingCount),
    [metadata, siblingCount],
  );

  const resolvedLabels = React.useMemo<PaginationLabels>(
    () => ({
      ellipsis: "...",
      navigation: "Paginacao",
      next: "Proxima pagina",
      page: (page) => `Ir para pagina ${page}`,
      previous: "Pagina anterior",
      ...labels,
    }),
    [labels],
  );

  const summaryContent = renderSummary(summary, state);

  return (
    <nav
      aria-label={resolvedLabels.navigation}
      className={cn(
        "flex w-full max-w-full flex-col items-center gap-3",
        className,
      )}
      data-slot="ds-pagination-root"
      {...props}
    >
      {summaryContent && (
        <p
          aria-live="polite"
          className="text-center font-roboto-flex text-sm font-light leading-6 text-text-subtle-2"
          data-slot="ds-pagination-summary"
        >
          {summaryContent}
        </p>
      )}

      <div
        className="flex w-full max-w-full items-start justify-center gap-3"
        data-slot="ds-pagination-content"
      >
        <PaginationAction
          ariaLabel={resolvedLabels.previous}
          className={cn(
            paginationControlVariants({ disabled: !state.hasPreviousPage }),
          )}
          dataSlot="ds-pagination-previous"
          disabled={!state.hasPreviousPage}
          href={
            state.hasPreviousPage ? getHref?.(state.currentPage - 1) : undefined
          }
          onClick={(event) => {
            if (!state.hasPreviousPage) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }

            onPageChange?.(state.currentPage - 1);
          }}
        >
          <ChevronLeft
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.8}
          />
        </PaginationAction>

        <ul
          className="m-0 flex list-none items-center overflow-hidden rounded-sm bg-surface-subtle p-0"
          data-slot="ds-pagination-list"
        >
          {state.pageItems.map((item) => (
            <li key={item.key} className="list-none">
              {renderPaginationItem(
                item,
                resolvedLabels,
                getHref,
                onPageChange,
              )}
            </li>
          ))}
        </ul>

        <PaginationAction
          ariaLabel={resolvedLabels.next}
          className={cn(
            paginationControlVariants({ disabled: !state.hasNextPage }),
          )}
          dataSlot="ds-pagination-next"
          disabled={!state.hasNextPage}
          href={
            state.hasNextPage ? getHref?.(state.currentPage + 1) : undefined
          }
          onClick={(event) => {
            if (!state.hasNextPage) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }

            onPageChange?.(state.currentPage + 1);
          }}
        >
          <ChevronRight
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.8}
          />
        </PaginationAction>
      </div>
    </nav>
  );
}

Pagination.displayName = "Pagination";

export {
  Pagination,
  type PaginationItem,
  type PaginationLabels,
  type PaginationMetadata,
  type PaginationProps,
  type PaginationResolvedState,
};
