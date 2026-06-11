"use client";

import type * as React from "react";
import { ProgressCircle } from "@/components/ds/ProgressCircle/progress-circle";

type ProgressCircleExampleProps = {
  ariaLabel?: string;
  current?: number;
  displayValue?: string;
  displayMode?: "percentage" | "fraction";
  formatValue?: (value: number, displayValue: string) => React.ReactNode;
  size?: "default" | "mini";
  total?: number;
  value?: number;
};

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

function ProgressCircleExample({
  ariaLabel,
  current,
  displayValue,
  displayMode,
  formatValue,
  size = "default",
  total,
  value,
}: ProgressCircleExampleProps) {
  const commonProps = {
    ariaLabel,
    displayValue,
    size,
  };

  const sourceKey =
    current !== undefined && total !== undefined ? "fraction" : "value";
  const renderRoot = progressCircleExampleRenderers[sourceKey];

  return renderRoot({
    commonProps,
    current,
    displayMode,
    formatValue,
    total,
    value,
  });
}

const progressCircleExampleContent = (
  formatValue?: ProgressCircleExampleProps["formatValue"],
) => (
  <>
    <ProgressCircle.Track />
    <ProgressCircle.Indicator />
    <ProgressCircle.Value formatValue={formatValue} />
  </>
);

const progressCircleExampleRenderers: Record<
  "fraction" | "value",
  (props: {
    commonProps: Pick<
      ProgressCircleExampleProps,
      "ariaLabel" | "displayValue" | "size"
    >;
    current?: number;
    displayMode?: ProgressCircleExampleProps["displayMode"];
    formatValue?: ProgressCircleExampleProps["formatValue"];
    total?: number;
    value?: number;
  }) => React.ReactElement
> = {
  fraction: ({
    commonProps,
    current = 0,
    displayMode,
    formatValue,
    total = 0,
  }) => (
    <ProgressCircle.Root
      current={current}
      displayMode={displayMode}
      total={total}
      {...commonProps}
    >
      {progressCircleExampleContent(formatValue)}
    </ProgressCircle.Root>
  ),
  value: ({ commonProps, formatValue, value = 0 }) => (
    <ProgressCircle.Root value={value} {...commonProps}>
      {progressCircleExampleContent(formatValue)}
    </ProgressCircle.Root>
  ),
};

function formatPercentageLabel(value: number) {
  if (Number.isInteger(value)) {
    return `${value.toString()}%`;
  }

  return `${value.toFixed(1).replace(/\.0$/, "")}%`;
}

const formatProgressCircleValueLabel = (value: number, _displayValue: string) =>
  formatPercentageLabel(value);

const backendExamples = [
  {
    label: "Value numérico",
    helper:
      "Aceita apenas um percentual numérico entre 0 e 100 como fonte de verdade do progresso.",
    value: 64,
  },
  {
    label: "Current/Total em fração",
    helper:
      "Recebe current e total como números, calcula o percentual internamente e mostra a fração no centro.",
    current: 16,
    total: 25,
    displayMode: "fraction" as const,
  },
  {
    label: "Current/Total em porcentagem",
    helper:
      "Usa o mesmo payload current/total, mas renderiza o texto final como porcentagem.",
    current: 16,
    total: 25,
    displayMode: "percentage" as const,
  },
  {
    label: "Texto customizado",
    helper:
      "Permite sobrescrever apenas o texto exibido sem criar outra fonte de verdade para o progresso.",
    value: 64,
    displayValue: "16/25",
  },
] satisfies ReadonlyArray<{
  label: string;
  helper: string;
  current?: number;
  value?: number;
  displayValue?: string;
  displayMode?: "percentage" | "fraction";
  total?: number;
}>;

export default function ProgressCircleShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7">
        <header className="space-y-2 text-center">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Progress Circle
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Indicador circular com composition pattern, responsividade via
            Tailwind e API numérica previsível: `value` ou `current` + `total`.
          </p>
        </header>

        <div className="grid w-full gap-6">
          <ShowcaseSection
            title="Default"
            description="Replica o comportamento do Figma e alterna automaticamente entre os tamanhos desktop e mobile por breakpoint."
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
              <ProgressCircleExample
                ariaLabel="Progresso do curso"
                value={64}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Mini"
            description="Mantém o layout compacto com tipografia e proporção menores para contextos mais densos."
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
              <ProgressCircleExample
                ariaLabel="Progresso resumido do curso"
                size="mini"
                value={64}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="API Numérica"
            description="Demonstra as entradas válidas do componente sem parsing de string nem múltiplas fontes de verdade para o progresso."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {backendExamples.map((example) => (
                <article
                  key={example.label}
                  className="flex min-h-52 flex-col items-center justify-center gap-4 rounded-lg border border-border-default bg-surface-default p-5 text-center"
                >
                  <ProgressCircleExample
                    ariaLabel={example.label}
                    current={example.current}
                    displayMode={example.displayMode}
                    displayValue={example.displayValue}
                    total={example.total}
                    value={example.value}
                  />
                  <div className="space-y-1">
                    <h3 className="font-encode-sans text-lg font-medium text-text-title">
                      {example.label}
                    </h3>
                    <p className="text-sm text-text-body">{example.helper}</p>
                  </div>
                </article>
              ))}
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Accessible Label"
            description="Permite formatar o valor visível sem perder semântica de progressbar para leitores de tela."
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
              <ProgressCircleExample
                ariaLabel="Progresso de conclusão do módulo"
                formatValue={formatProgressCircleValueLabel}
                value={48.5}
              />
            </div>
          </ShowcaseSection>
        </div>
      </div>
    </main>
  );
}
