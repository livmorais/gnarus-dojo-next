import { ButtonIcon, ButtonLabel, ButtonRoot } from "@/components/ds/button";
import {
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateDescription,
  EmptyStateHighlight,
  EmptyStateRoot,
  EmptyStateTitle,
} from "@/components/ds/empty-state";
import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

function SearchEmptyState() {
  return (
    <EmptyStateRoot aria-labelledby="search-empty-state-title">
      <EmptyStateBody>
        <EmptyStateTitle id="search-empty-state-title">
          Nenhum resultado encontrado para{" "}
          <EmptyStateHighlight>&ldquo;DevOps&rdquo;</EmptyStateHighlight>
        </EmptyStateTitle>
        <EmptyStateDescription>
          Tente novamente com outros termos.
        </EmptyStateDescription>
      </EmptyStateBody>
    </EmptyStateRoot>
  );
}

function WithActionsEmptyState() {
  return (
    <EmptyStateRoot
      aria-labelledby="actions-empty-state-title"
      aria-describedby="actions-empty-state-description"
    >
      <EmptyStateBody>
        <EmptyStateTitle id="actions-empty-state-title">
          Sua trilha ainda nao tem cursos salvos
        </EmptyStateTitle>
        <EmptyStateDescription id="actions-empty-state-description">
          Explore novas recomendacoes ou refaça sua busca para montar uma lista.
        </EmptyStateDescription>
        <EmptyStateActions>
          <ButtonRoot variant="primary">
            <ButtonIcon>
              <Sparkles strokeWidth={1.8} />
            </ButtonIcon>
            <ButtonLabel>Ver recomendacoes</ButtonLabel>
          </ButtonRoot>
          <ButtonRoot asChild variant="link">
            <Link prefetch={false} href="/product/alura/ds/button">
              <ButtonLabel>Abrir showcase de botoes</ButtonLabel>
            </Link>
          </ButtonRoot>
        </EmptyStateActions>
      </EmptyStateBody>
    </EmptyStateRoot>
  );
}

function LeftAlignedEmptyState() {
  return (
    <div className="w-full max-w-3xl">
      <EmptyStateRoot align="left" aria-labelledby="left-empty-state-title">
        <EmptyStateBody className="max-w-xl">
          <EmptyStateTitle id="left-empty-state-title">
            Nenhuma atividade encontrada para este filtro
          </EmptyStateTitle>
          <EmptyStateDescription>
            Ajuste os criterios para combinar status, prazo ou responsavel e
            tente novamente.
          </EmptyStateDescription>
          <EmptyStateActions align="left">
            <ButtonRoot variant="secondary">
              <ButtonIcon>
                <Search strokeWidth={1.8} />
              </ButtonIcon>
              <ButtonLabel>Refinar busca</ButtonLabel>
            </ButtonRoot>
            <ButtonRoot variant="secondary" disabled>
              <ButtonLabel>Exportar vazio</ButtonLabel>
            </ButtonRoot>
          </EmptyStateActions>
        </EmptyStateBody>
      </EmptyStateRoot>
    </div>
  );
}

function WithoutTopBorderEmptyState() {
  return (
    <EmptyStateRoot
      topBorder={false}
      aria-labelledby="without-top-border-empty-state-title"
    >
      <EmptyStateBody>
        <EmptyStateTitle id="without-top-border-empty-state-title">
          Nada por aqui ainda
        </EmptyStateTitle>
        <EmptyStateDescription>
          Use este layout quando o empty state estiver encaixado em uma area que
          ja tenha separacao visual propria.
        </EmptyStateDescription>
      </EmptyStateBody>
    </EmptyStateRoot>
  );
}

export default function EmptyStateShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Empty State
          </h1>
          <p className="text-sm text-text-body">
            Componente reutilizavel para cenarios sem conteudo, busca vazia ou
            estados iniciais.
          </p>
        </header>

        <section className="grid w-full gap-6">
          <div className="grid gap-3">
            <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
              Default
            </p>
            <SearchEmptyState />
          </div>

          <div className="grid gap-3">
            <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
              Com acoes
            </p>
            <WithActionsEmptyState />
          </div>

          <div className="grid gap-3">
            <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
              Alinhado a esquerda
            </p>
            <LeftAlignedEmptyState />
          </div>

          <div className="grid gap-3">
            <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
              Sem borda superior
            </p>
            <WithoutTopBorderEmptyState />
          </div>
        </section>
      </div>
    </main>
  );
}
