"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  dsNavigationItems,
  type DsNavigationItem,
} from "../../lib/ds-navigation";
import AluraLogo from "@public/assets/alura/logo-alura.component.svg";

function isItemActive(pathname: string, item: DsNavigationItem) {
  return pathname.startsWith(item.href);
}

export function DesignSystemSidebar() {
  const pathname = usePathname();

  return (
    <aside className=" bg-surface-brand md:sticky md:top-0 md:h-screen  md:shrink-0 ">
      <div className="flex h-full flex-col gap-8 px-4 py-5 md:px-5 md:py-8">
        <div className="space-y-2">
          <AluraLogo className="h-8 w-auto shrink-0" />
          <p className="text-xs font-semibold tracking-[0.24em] text-text-subtle-2 uppercase">
            Design System
          </p>
        </div>

        <nav
          aria-label="Componentes do Design System"
          className="min-h-0 flex-1"
        >
          <ul className="grid gap-1 md:max-h-full md:content-start md:overflow-y-auto">
            {dsNavigationItems.map((item) => {
              const active = isItemActive(pathname, item);

              return (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex h-full items-center justify-start rounded-md px-3 py-2 text-left transition-colors",
                      active
                        ? "bg-surface-secondary text-text-title"
                        : "text-text-body hover:bg-surface-secondary/70 hover:text-text-title",
                    )}
                  >
                    <span className="font-encode-sans text-sm font-medium leading-none">
                      {item.shortTitle}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
