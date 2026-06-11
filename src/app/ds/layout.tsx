import type { ReactNode } from "react";
import { DesignSystemSidebar } from "../../components/ds/design-system-sidebar";

export default function DesignSystemLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-secondary text-text-title md:flex">
      <DesignSystemSidebar />
      <div className="min-w-0 flex-1 bg-surface-tertiary">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </div>
    </div>
  );
}
