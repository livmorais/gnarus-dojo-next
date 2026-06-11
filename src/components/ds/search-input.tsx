"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cva } from "class-variance-authority";
import { Button } from "@/components/ds/button";
import { cn } from "@/lib/cn";

type SearchInputRootProps = React.ComponentPropsWithoutRef<"div"> & {
  defaultValue?: string;
  defaultMobileOpen?: boolean;
  disabled?: boolean;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  value?: string;
};

type SearchInputFieldProps = React.ComponentPropsWithoutRef<"div">;
type SearchInputInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "defaultValue" | "disabled" | "size" | "type" | "value"
>;
type SearchInputActionsProps = React.ComponentPropsWithoutRef<"div">;
type SearchInputButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button.Root>,
  "ariaLabel" | "children" | "rounded" | "variant"
> & {
  ariaLabel: string;
};

type SearchInputContextValue = {
  disabled: boolean;
  hasValue: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  mobileOpen: boolean;
  onSearch?: (value: string) => void;
  setMobileOpen: (open: boolean) => void;
  setValue: (value: string) => void;
  value: string;
};

const SearchInputContext = React.createContext<SearchInputContextValue | null>(
  null,
);

const fieldVariants = cva([
  "group flex items-center rounded-full bg-search-input-field-background text-text-title",
  "h-10 w-full max-w-[320px] gap-1 pl-2 pr-1 py-1 md:h-14 md:max-w-134.5 md:gap-2 md:pl-6",
  "transition-[border-color,box-shadow,background-color] duration-200",
  "border border-transparent hover:border-border-default focus-within:border-border-default",
  "focus-within:ring-2 focus-within:ring-border-focus/30",
  "has-disabled:cursor-not-allowed has-disabled:opacity-70",
]);

const inputVariants = cva([
  "w-full min-w-0 border-0 bg-transparent p-0 outline-none",
  "font-roboto-flex text-xs font-normal leading-normal tracking-normal text-text-body md:text-sm",
  "placeholder:text-text-disabled disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
]);

function useSearchInputContext(componentName: string) {
  const context = React.useContext(SearchInputContext);

  if (!context) {
    throw new Error(`${componentName} must be used within SearchInput.Root.`);
  }

  return context;
}

function useControllableValue(
  value: string | undefined,
  defaultValue = "",
  onValueChange?: (value: string) => void,
) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const isControlled = value !== undefined;

  return {
    setValue: React.useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }

        onValueChange?.(nextValue);
      },
      [isControlled, onValueChange],
    ),
    value: isControlled ? value : uncontrolledValue,
  };
}

function useControllableOpen(
  controlledOpen: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange?: (open: boolean) => void,
) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;

  return {
    open: isControlled ? controlledOpen : uncontrolledOpen,
    setOpen: React.useCallback(
      (nextOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(nextOpen);
        }

        onOpenChange?.(nextOpen);
      },
      [isControlled, onOpenChange],
    ),
  };
}

function SearchInputRoot({
  children,
  className,
  defaultValue = "",
  defaultMobileOpen = false,
  disabled = false,
  mobileOpen,
  onMobileOpenChange,
  onSearch,
  onValueChange,
  value,
  ...props
}: SearchInputRootProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const controllableState = useControllableValue(
    value,
    defaultValue,
    onValueChange,
  );
  const mobileState = useControllableOpen(
    mobileOpen,
    defaultMobileOpen,
    onMobileOpenChange,
  );

  const contextValue = React.useMemo(
    () => ({
      disabled,
      hasValue: controllableState.value.length > 0,
      inputRef,
      mobileOpen: mobileState.open,
      onSearch,
      setMobileOpen: mobileState.setOpen,
      setValue: controllableState.setValue,
      value: controllableState.value,
    }),
    [
      controllableState.setValue,
      controllableState.value,
      disabled,
      mobileState.open,
      mobileState.setOpen,
      onSearch,
    ],
  );

  return (
    <SearchInputContext.Provider value={contextValue}>
      <div
        className={cn("w-full", className)}
        data-slot="ds-search-input"
        {...props}
      >
        {children}
      </div>
    </SearchInputContext.Provider>
  );
}

function SearchInputField({ className, ...props }: SearchInputFieldProps) {
  const { mobileOpen } = useSearchInputContext("SearchInput.Field");

  return (
    <div
      className={cn(
        fieldVariants(),
        mobileOpen ? "flex" : "hidden md:flex",
        className,
      )}
      data-slot="ds-search-input-field-wrapper"
      {...props}
    />
  );
}

const SearchInputInput = React.forwardRef<
  HTMLInputElement,
  SearchInputInputProps
>(
  (
    {
      className,
      onChange,
      onKeyDown,
      placeholder = "O que voce quer aprender?",
      ...props
    },
    forwardedRef,
  ) => {
    const { disabled, inputRef, onSearch, setValue, value } =
      useSearchInputContext("SearchInput.Input");

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChange?.(event);
      },
      [onChange, setValue],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && onSearch) {
          event.preventDefault();
          onSearch(value);
        }

        onKeyDown?.(event);
      },
      [onKeyDown, onSearch, value],
    );

    return (
      <input
        {...props}
        ref={(node) => {
          inputRef.current = node;

          if (typeof forwardedRef === "function") {
            forwardedRef(node);
            return;
          }

          if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={cn(inputVariants(), className)}
        data-slot="ds-search-input-field"
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    );
  },
);

function SearchInputActions({ className, ...props }: SearchInputActionsProps) {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-1 md:gap-2", className)}
      data-slot="ds-search-input-actions"
      {...props}
    />
  );
}

function SearchInputMobileTrigger({
  ariaLabel,
  className,
  onClick,
  ...props
}: SearchInputButtonProps) {
  const { disabled, mobileOpen, setMobileOpen } = useSearchInputContext(
    "SearchInput.MobileTrigger",
  );

  if (mobileOpen) {
    return null;
  }

  return (
    <Button.Root
      {...props}
      ariaLabel={ariaLabel}
      className={cn("size-8 px-2 py-2 md:hidden", className)}
      disabled={disabled}
      onClick={(event) => {
        setMobileOpen(true);
        onClick?.(event);
      }}
      rounded
      variant="secondary"
    >
      <Button.Icon>
        <Search aria-hidden="true" />
      </Button.Icon>
    </Button.Root>
  );
}

function SearchInputMobileCloseButton({
  ariaLabel,
  className,
  onClick,
  ...props
}: SearchInputButtonProps) {
  const { disabled, inputRef, mobileOpen, setMobileOpen, setValue } =
    useSearchInputContext("SearchInput.MobileCloseButton");

  if (!mobileOpen) {
    return null;
  }

  return (
    <Button.Root
      {...props}
      ariaLabel={ariaLabel}
      className={cn(
        "size-6 bg-transparent p-0 text-text-body hover:bg-transparent hover:text-text-title md:hidden",
        className,
      )}
      disabled={disabled}
      onClick={(event) => {
        setValue("");
        setMobileOpen(false);
        inputRef.current?.blur();
        onClick?.(event);
      }}
      variant="iconOnly"
    >
      <Button.Icon>
        <X aria-hidden="true" />
      </Button.Icon>
    </Button.Root>
  );
}

function SearchInputSearchButton({
  ariaLabel,
  className,
  onClick,
  ...props
}: SearchInputButtonProps) {
  const { disabled, onSearch, value } = useSearchInputContext(
    "SearchInput.SearchButton",
  );

  return (
    <Button.Root
      {...props}
      ariaLabel={ariaLabel}
      className={cn("size-8 px-2 py-2 md:size-12 md:px-4 md:py-4", className)}
      disabled={disabled}
      onClick={(event) => {
        onSearch?.(value);
        onClick?.(event);
      }}
      rounded
      variant="secondary"
    >
      <Button.Icon>
        <Search aria-hidden="true" />
      </Button.Icon>
    </Button.Root>
  );
}

function SearchInputAiButton({
  ariaLabel,
  className,
  onClick,
  ...props
}: SearchInputButtonProps) {
  const { disabled, value } = useSearchInputContext("SearchInput.AiButton");

  return (
    <Button.Root
      {...props}
      ariaLabel={ariaLabel}
      className={cn(
        "h-8 px-2 text-[10px] leading-4 md:h-12 md:px-6 md:text-[14px]",
        className,
      )}
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault();

        const query = value.trim();
        const searchParams = new URLSearchParams();

        if (query) {
          searchParams.set("query", query);
        }

        const queryString = searchParams.toString();
        const nextHref = queryString
          ? `/chatbot/search?${queryString}`
          : "/chatbot/search";

        window.location.assign(nextHref);
        onClick?.(event);
      }}
      rounded
      variant="secondary"
    >
      <Button.Label>{ariaLabel}</Button.Label>
    </Button.Root>
  );
}

function SearchInputClearButton({
  ariaLabel,
  className,
  onClick,
  ...props
}: SearchInputButtonProps) {
  const { disabled, hasValue, inputRef, setValue } = useSearchInputContext(
    "SearchInput.ClearButton",
  );

  if (!hasValue) {
    return null;
  }

  return (
    <Button.Root
      {...props}
      ariaLabel={ariaLabel}
      className={cn(
        "hidden size-6 bg-transparent p-0 text-text-body hover:bg-transparent hover:text-text-title md:inline-flex",
        className,
      )}
      disabled={disabled}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onClick={(event) => {
        setValue("");
        inputRef.current?.focus();
        onClick?.(event);
      }}
      variant="iconOnly"
    >
      <Button.Icon>
        <X aria-hidden="true" />
      </Button.Icon>
    </Button.Root>
  );
}

SearchInputRoot.displayName = "SearchInput.Root";
SearchInputField.displayName = "SearchInput.Field";
SearchInputInput.displayName = "SearchInput.Input";
SearchInputActions.displayName = "SearchInput.Actions";
SearchInputSearchButton.displayName = "SearchInput.SearchButton";
SearchInputAiButton.displayName = "SearchInput.AiButton";
SearchInputClearButton.displayName = "SearchInput.ClearButton";
SearchInputMobileTrigger.displayName = "SearchInput.MobileTrigger";
SearchInputMobileCloseButton.displayName = "SearchInput.MobileCloseButton";

const SearchInput = {
  Actions: SearchInputActions,
  AiButton: SearchInputAiButton,
  ClearButton: SearchInputClearButton,
  Field: SearchInputField,
  Input: SearchInputInput,
  MobileCloseButton: SearchInputMobileCloseButton,
  MobileTrigger: SearchInputMobileTrigger,
  Root: SearchInputRoot,
  SearchButton: SearchInputSearchButton,
};

export {
  SearchInput,
  SearchInputActions,
  SearchInputAiButton,
  SearchInputClearButton,
  SearchInputField,
  SearchInputInput,
  SearchInputMobileCloseButton,
  SearchInputMobileTrigger,
  SearchInputRoot,
  SearchInputSearchButton,
  type SearchInputActionsProps,
  type SearchInputButtonProps,
  type SearchInputFieldProps,
  type SearchInputInputProps,
  type SearchInputRootProps,
};
