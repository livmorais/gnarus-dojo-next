"use client";

import type { ComponentType } from "react";
import {
  CalendarDays,
  CheckCheck,
  FileBadge2,
  GraduationCap,
  Home,
  Layers3,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type SidebarItem = {
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
};

const primaryItems: SidebarItem[] = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Início",
  },
  {
    href: "#",
    icon: CalendarDays,
    label: "Eventos",
  },
  {
    href: "#",
    icon: FileBadge2,
    label: "Cursos e Certificados",
  },
  {
    href: "#",
    icon: GraduationCap,
    label: "Minhas Trilhas",
  },
  {
    href: "#",
    icon: Layers3,
    label: "Carreira",
  },
  {
    href: "/dashboard/tasks",
    icon: CheckCheck,
    label: "Minhas Tarefas",
  },
] as const;

export function PlatformSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-full max-w-62 bg-surface-tertiary px-4 text-text-title">
      <div className="flex h-full min-h-[calc(100vh-176px)] flex-col">
        <div className="mt-5">
          <nav aria-label="Menu principal">
            <ul className="grid gap-1.5">
              {primaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-4 py-3 text-left transition-colors",
                        isActive
                          ? "bg-[#2a2b2f] text-[#f5f5f7]"
                          : "text-[#a0a4ad] hover:bg-white/5 hover:text-[#f5f5f7]",
                      )}
                    >
                      <Icon className="size-5 shrink-0" strokeWidth={1.8} />
                      <span className="text-sm font-medium leading-none">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
