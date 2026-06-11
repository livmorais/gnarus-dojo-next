"use client";

import { useState } from "react";
import { SearchInput } from "@/components/ds/search-input";

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

function DesktopExamples() {
  const [filledValue, setFilledValue] = useState("React");

  return (
    <div className="grid gap-4">
      <SearchInput.Root>
        <SearchInput.MobileTrigger ariaLabel="Abrir busca" />
        <div className="flex items-center gap-2">
          <SearchInput.Field>
            <SearchInput.Input />
            <SearchInput.Actions>
              <SearchInput.SearchButton ariaLabel="Pesquisar" />
              <SearchInput.AiButton ariaLabel="Pesquisar com IA" />
            </SearchInput.Actions>
          </SearchInput.Field>
          <SearchInput.MobileCloseButton ariaLabel="Fechar busca" />
        </div>
      </SearchInput.Root>

      <SearchInput.Root
        value={filledValue}
        onValueChange={(nextValue) => setFilledValue(nextValue)}
      >
        <SearchInput.MobileTrigger ariaLabel="Abrir busca" />
        <div className="flex items-center gap-2">
          <SearchInput.Field>
            <SearchInput.Input />
            <SearchInput.ClearButton ariaLabel="Limpar busca" />
            <SearchInput.Actions>
              <SearchInput.SearchButton ariaLabel="Pesquisar" />
              <SearchInput.AiButton ariaLabel="Pesquisar com IA" />
            </SearchInput.Actions>
          </SearchInput.Field>
          <SearchInput.MobileCloseButton ariaLabel="Fechar busca" />
        </div>
      </SearchInput.Root>

      <SearchInput.Root defaultValue="Next.js App Router">
        <SearchInput.MobileTrigger ariaLabel="Abrir busca" />
        <div className="flex items-center gap-2">
          <SearchInput.Field>
            <SearchInput.Input />
            <SearchInput.ClearButton ariaLabel="Limpar busca" />
            <SearchInput.Actions>
              <SearchInput.SearchButton ariaLabel="Pesquisar" />
            </SearchInput.Actions>
          </SearchInput.Field>
          <SearchInput.MobileCloseButton ariaLabel="Fechar busca" />
        </div>
      </SearchInput.Root>

      <SearchInput.Root defaultValue="Busca indisponivel" disabled>
        <SearchInput.MobileTrigger ariaLabel="Abrir busca" />
        <div className="flex items-center gap-2">
          <SearchInput.Field>
            <SearchInput.Input />
            <SearchInput.ClearButton ariaLabel="Limpar busca" />
            <SearchInput.Actions>
              <SearchInput.SearchButton ariaLabel="Pesquisar" />
              <SearchInput.AiButton ariaLabel="Pesquisar com IA" />
            </SearchInput.Actions>
          </SearchInput.Field>
          <SearchInput.MobileCloseButton ariaLabel="Fechar busca" />
        </div>
      </SearchInput.Root>
    </div>
  );
}

export default function SearchInputShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Search Input
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Campo de busca dedicado com CTA, acao de limpar e variacao compacta
            para mobile.
          </p>
        </header>

        <ShowcaseSection
          title="Exemplos"
          description="Estados padrao, preenchido, sem CTA textual e desabilitado."
        >
          <DesktopExamples />
        </ShowcaseSection>
      </div>
    </main>
  );
}
