"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  FilterGroupItem,
  FilterGroupRoot,
} from "@/components/ds/filter-group/filter-group";

function ShowcaseBlock({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-3 rounded-lg border border-border-default bg-surface-secondary p-5">
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

const contentFilters = [
  {
    infoAriaLabel: "Saiba mais sobre Carreiras",
    label: "Carreiras",
    value: "careers",
  },
  {
    infoAriaLabel: "Saiba mais sobre Trilhas",
    label: "Trilhas",
    value: "tracks",
  },
  "Cursos",
  "Artigos",
  "Podcasts",
  "Vídeos Extras",
] as const;

export default function FilterGroupShowcasePage() {
  const [selectedContentFilters, setSelectedContentFilters] = useState([
    "careers",
    "cursos",
    "artigos",
    "podcasts",
  ]);

  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Filter Group
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Grupo de filtros com checkbox customizado, suporte a payload
            dinâmico do backend e composição opcional por slots.
          </p>
          <Link
            prefetch={false}
            href="/product/alura/ds"
            className="inline-flex text-sm text-link-default underline-offset-2 hover:underline"
          >
            Voltar para o índice DS
          </Link>
        </header>

        <div className="grid gap-4">
          <ShowcaseBlock
            title="Default"
            description="Uso direto com callback no grupo e estado controlado por selectedValues."
          >
            <div className="max-w-45.25">
              <FilterGroupRoot
                filterLabels={contentFilters}
                filterTitle="Conteúdos"
                onSelectedValuesChange={setSelectedContentFilters}
                selectedValues={selectedContentFilters}
              />
            </div>
          </ShowcaseBlock>

          <ShowcaseBlock
            title="Composition"
            description="Quando o layout pede composição manual, os subcomponentes ficam disponíveis sem sacrificar semântica."
          >
            <div className="max-w-45.25">
              <FilterGroupRoot filterLabels={[]} filterTitle="Categorias">
                <FilterGroupItem
                  checked
                  inputId="filter-programacao"
                  label="Programação"
                  onCheckedChange={() => {}}
                  value="programacao"
                />
                <FilterGroupItem
                  inputId="filter-mobile"
                  label="Mobile"
                  onCheckedChange={() => {}}
                  value="mobile"
                />
                <FilterGroupItem
                  disabled
                  inputId="filter-ux"
                  label="UX & Design"
                  onCheckedChange={() => {}}
                  value="ux-design"
                />
              </FilterGroupRoot>
            </div>
          </ShowcaseBlock>
        </div>
      </div>
    </main>
  );
}
