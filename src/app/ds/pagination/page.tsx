"use client";

import { useState } from "react";
import { Pagination } from "@/components/ds/pagination";

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

function ControlledExamples() {
  const [page, setPage] = useState(1);
  const [middlePage, setMiddlePage] = useState(4);

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-3">
          <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
            Estado padrao
          </p>
          <Pagination
            metadata={{
              currentPage: page,
              pageSize: 15,
              totalItems: 129,
              totalPages: 9,
            }}
            onPageChange={setPage}
          />
        </div>

        <div className="grid gap-3">
          <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
            Pagina unica
          </p>
          <Pagination
            metadata={{
              currentPage: 1,
              itemsOnPage: 8,
              pageSize: 15,
              totalItems: 8,
              totalPages: 1,
            }}
          />
        </div>
      </div>

      <div className="grid gap-3">
        <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
          Pagina intermediaria
        </p>
        <Pagination
          metadata={{
            currentPage: middlePage,
            pageSize: 15,
            totalItems: 180,
            totalPages: 12,
          }}
          onPageChange={setMiddlePage}
        />
      </div>
    </div>
  );
}

function LinkCompositionExample() {
  return (
    <div className="grid gap-5">
      <Pagination
        getHref={(page) => `/product/alura/ds/pagination?page=${page}`}
        metadata={{
          currentPage: 2,
          pageSize: 15,
          totalItems: 90,
          totalPages: 6,
        }}
      />

      <div className="grid gap-3">
        <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
          Resumo customizado
        </p>

        <Pagination
          metadata={{
            currentPage: 2,
            pageSize: 15,
            totalItems: 45,
            totalPages: 3,
          }}
          summary={({ currentPage, totalPages }) =>
            `Pagina ${currentPage} de ${totalPages}`
          }
        />
      </div>
    </div>
  );
}

export default function PaginationShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Pagination
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Paginacao compacta com resumo, elipses e suporte a callback ou href
            dinamico vindo do backend.
          </p>
        </header>

        <ShowcaseSection
          title="Estados"
          description="Fluxos controlados para primeira pagina, pagina unica e navegacao intermediaria."
        >
          <ControlledExamples />
        </ShowcaseSection>

        <ShowcaseSection
          title="Composicao"
          description="Uso direto com href dinamico e resumo customizado, sem precisar montar subcomponentes."
        >
          <LinkCompositionExample />
        </ShowcaseSection>
      </div>
    </main>
  );
}
