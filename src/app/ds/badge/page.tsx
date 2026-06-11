import type { ReactNode } from "react";
import Link from "next/link";
import { Badge, BadgeDot, BadgeLabel, BadgeRoot } from "@/components/ds/badge";

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
    <section className="grid gap-4 rounded-3xl border border-border-default bg-surface-secondary p-6">
      <div className="space-y-1">
        <h2 className="font-encode-sans text-2xl font-semibold leading-none text-text-title">
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-text-body">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </section>
  );
}

export default function BadgeShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Badge
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Tag mono baseada no Figma para estados de andamento, vazio,
            categoria e destaque preenchido.
          </p>
        </header>

        <ShowcaseBlock
          title="Variants"
          description="Estados principais derivados do node do Figma e a variante adicional preenchida."
        >
          <BadgeRoot variant="active">
            <BadgeDot tone="success" />
            <BadgeLabel>Curso em andamento</BadgeLabel>
          </BadgeRoot>

          <BadgeRoot variant="empty">
            <BadgeDot tone="neutral" />
            <BadgeLabel>Sem cursos em andamento</BadgeLabel>
          </BadgeRoot>

          <BadgeRoot variant="category">
            <BadgeLabel>Curso</BadgeLabel>
          </BadgeRoot>

          <BadgeRoot variant="category">
            <BadgeLabel size="xs">Trilha da empresa</BadgeLabel>
          </BadgeRoot>

          <BadgeRoot variant="inverted">
            <BadgeLabel>Destaque</BadgeLabel>
          </BadgeRoot>
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Dot Tones"
          description="Tones semanticos para feedback de sucesso, neutro, atencao, erro e informacao."
        >
          <BadgeRoot variant="active">
            <BadgeDot tone="success" />
            <BadgeLabel>Success</BadgeLabel>
          </BadgeRoot>

          <BadgeRoot variant="active">
            <BadgeDot tone="neutral" />
            <BadgeLabel>Neutral</BadgeLabel>
          </BadgeRoot>

          <BadgeRoot variant="active">
            <BadgeDot tone="warning" />
            <BadgeLabel>Warning</BadgeLabel>
          </BadgeRoot>

          <BadgeRoot variant="active">
            <BadgeDot tone="error" />
            <BadgeLabel>Error</BadgeLabel>
          </BadgeRoot>

          <BadgeRoot variant="active">
            <BadgeDot tone="info" />
            <BadgeLabel>Info</BadgeLabel>
          </BadgeRoot>
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Border"
          description="A borda e aplicada por padrao, mas pode ser removida quando o badge deve exibir apenas dot e texto."
        >
          <BadgeRoot variant="active">
            <BadgeDot tone="success" />
            <BadgeLabel>Com borda</BadgeLabel>
          </BadgeRoot>

          <BadgeRoot variant="active" bordered={false}>
            <BadgeDot tone="success" />
            <BadgeLabel>Sem borda</BadgeLabel>
          </BadgeRoot>
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Composition"
          description="Composicao com API de slots e suporte a asChild para links."
        >
          <BadgeRoot asChild variant="active">
            <Link
              prefetch={false}
              href="https://www.alura.com.br/empresas"
              className="no-underline"
            >
              <BadgeDot tone="success" />
              <BadgeLabel>Trilha liberada</BadgeLabel>
            </Link>
          </BadgeRoot>

          <Badge.Root variant="inverted">
            <Badge.Label>Novo badge preenchido</Badge.Label>
          </Badge.Root>
        </ShowcaseBlock>
      </div>
    </main>
  );
}
