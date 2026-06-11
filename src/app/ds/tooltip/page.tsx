"use client";

import type * as React from "react";
import { CircleHelp } from "lucide-react";
import { Tooltip } from "@/components/ds/tooltip";

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
    <section className="grid gap-4 rounded-3xl border border-border-default bg-surface-secondary p-6">
      <div className="space-y-1">
        <h2 className="font-encode-sans text-2xl font-semibold leading-none text-text-title">
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-text-body">{description}</p>
      </div>
      {children}
    </section>
  );
}

function TooltipTriggerButton({
  ariaLabel,
  disabled = false,
}: {
  ariaLabel: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-feedback-info-default transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:opacity-40"
    >
      <CircleHelp className="size-4" />
    </button>
  );
}

function Examples() {
  return (
    <Tooltip.Provider>
      <div className="flex flex-wrap items-center gap-8">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <TooltipTriggerButton ariaLabel="Sobre trilhas da comunidade" />
          </Tooltip.Trigger>
          <Tooltip.Content>
            Trilhas da Comunidade sao sequencias de cursos e outros conteudos
            criados por alunos e alunas da Alura para organizar os estudos.
          </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <TooltipTriggerButton ariaLabel="Sobre trilhas da empresa" />
          </Tooltip.Trigger>
          <Tooltip.Content side="top">
            Trilhas da Empresa organizam o estudo por contexto e prioridade do
            time.
          </Tooltip.Content>
        </Tooltip.Root>

        <TooltipTriggerButton
          ariaLabel="Tooltip desabilitado"
          disabled={true}
        />
      </div>
    </Tooltip.Provider>
  );
}

export default function TooltipShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Tooltip
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Wrapper de Radix para hints curtos com foco visivel, arrow e
            variantes simples de posicionamento.
          </p>
        </header>

        <ShowcaseSection
          title="Exemplos"
          description="Estado padrao com side right, variacao com side top e trigger desabilitado."
        >
          <Examples />
        </ShowcaseSection>
      </div>
    </main>
  );
}
