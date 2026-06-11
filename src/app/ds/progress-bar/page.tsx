"use client";

import type * as React from "react";
import { ProgressBar } from "@/components/ds/progress-bar";

function ShowcaseSection({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section className="grid gap-4 rounded-lg border border-border-default bg-surface-secondary p-5">
      <div className="space-y-1">
        <h2 className="font-encode-sans text-xl font-semibold leading-none text-text-title">
          {title}
        </h2>
        <p className="text-sm text-text-body">{description}</p>
      </div>
      {children}
    </section>
  );
}

function ProgressBarExample({
  ariaLabel,
  formatValue,
  rounded = true,
  size = "sm",
  value,
}: {
  ariaLabel?: string;
  formatValue?: (value: number) => string;
  rounded?: boolean;
  size?: "sm" | "md";
  value: number | `${number}`;
}) {
  return (
    <ProgressBar.Root
      ariaLabel={ariaLabel}
      rounded={rounded}
      size={size}
      value={value}
    >
      <ProgressBar.Track>
        <ProgressBar.Indicator />
      </ProgressBar.Track>
      <ProgressBar.Value formatValue={formatValue} />
    </ProgressBar.Root>
  );
}

export default function ProgressBarShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Progress Bar
          </h1>
          <p className="text-sm text-text-body">
            Barra de progresso composta por primitives para trilho, indicador e
            rótulo textual, preparada para receber porcentagem dinâmica do
            backend.
          </p>
        </header>

        <div className="grid w-full gap-6">
          <ShowcaseSection
            title="Default"
            description="Replica o padrão do Figma usando valor percentual simples vindo do backend."
          >
            <ProgressBarExample value={64.0} />
          </ShowcaseSection>

          <ShowcaseSection
            title="Rounded Off"
            description="Permite cantos retos quando a composição do layout exigir alinhamento mais rígido."
          >
            <ProgressBarExample rounded={false} value={64.0} />
          </ShowcaseSection>

          <ShowcaseSection
            title="API Variations"
            description="Aceita número ou string numérica, faz clamp entre 0 e 100 e permite formatação customizada do rótulo."
          >
            <div className="grid gap-4">
              <ProgressBarExample value={"64.0"} />

              <ProgressBarExample
                ariaLabel="Progresso de conclusão do módulo"
                value={100}
              />

              <ProgressBarExample
                formatValue={(value) =>
                  `${value.toFixed(1).replace(/\.0$/, "")}% concluído`
                }
                size="md"
                value={48.5}
              />
            </div>
          </ShowcaseSection>
        </div>
      </div>
    </main>
  );
}
