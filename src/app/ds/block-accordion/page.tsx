"use client";

import { Badge } from "@/components/ds/badge";
import { BlockAccordion } from "@/components/ds/block-accordion";
import { ProgressBar } from "@/components/ds/progress-bar";

const prerequisiteCards = [
  {
    id: "journey-a",
    completed: 4,
    title: "Título da trilha com duas linhas ou até três.",
    total: 6,
  },
  {
    id: "journey-b",
    completed: 0,
    title: "Título da trilha com duas linhas ou até três.",
    total: 6,
  },
  {
    id: "journey-c",
    completed: 0,
    title: "Título da trilha com duas linhas ou até três.",
    total: 6,
  },
];

function ShowcaseCard({
  completed,
  title,
  total,
}: {
  completed: number;
  title: string;
  total: number;
}) {
  const progress = total > 0 ? (completed * 100) / total : 0;

  return (
    <article className="grid gap-6 rounded-sm border-t-2 border-border-secondary bg-surface-brand p-6">
      <Badge.Root className="w-fit" variant="category">
        <Badge.Label size="xs">TRILHA ALURA</Badge.Label>
      </Badge.Root>

      <div className="min-h-20">
        <h2 className="font-encode-sans text-[32px] leading-[1.05] font-extralight text-text-title md:text-[36px]">
          {title}
        </h2>
      </div>

      <ProgressBar.Root
        ariaLabel={`Progresso da trilha ${title}`}
        rounded={false}
        size="md"
        value={progress}
      >
        <ProgressBar.Track>
          <ProgressBar.Indicator />
        </ProgressBar.Track>
        <ProgressBar.Value formatValue={() => `${completed}/${total}`} />
      </ProgressBar.Root>
    </article>
  );
}

export default function BlockAccordionShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Block Accordion
          </h1>
          <p className="max-w-3xl text-sm text-text-body">
            Wrapper genérico para seções expansíveis da aplicação com header
            blocado, body livre e API baseada em composição.
          </p>
        </header>

        <section className="grid gap-3">
          <div className="space-y-1">
            <h2 className="font-encode-sans text-xl font-semibold leading-none text-text-title">
              Figma Match
            </h2>
            <p className="text-sm text-text-body">
              Estado aberto com o header e o body no padrão visual pedido.
            </p>
          </div>

          <BlockAccordion defaultOpen title="Pré-requisitos">
            <div className="grid gap-6">
              <p className="max-w-3xl font-encode-sans text-base leading-normal text-text-body">
                Para aproveitar melhor essa trilha, sugerimos que você já tenha
                feito ou tenha conhecimentos equivalentes ao conteúdo destas
                trilhas:
              </p>

              <div className="grid gap-4 xl:grid-cols-3">
                {prerequisiteCards.map((card) => (
                  <ShowcaseCard
                    key={card.id}
                    completed={card.completed}
                    title={card.title}
                    total={card.total}
                  />
                ))}
              </div>
            </div>
          </BlockAccordion>
        </section>

        <section className="grid gap-3">
          <div className="space-y-1">
            <h2 className="font-encode-sans text-xl font-semibold leading-none text-text-title">
              States
            </h2>
            <p className="text-sm text-text-body">
              Variações mínimas para validar integração na aplicação.
            </p>
          </div>

          <div className="grid gap-4">
            <BlockAccordion title="Fechado por padrão">
              <p className="font-roboto-flex text-base leading-normal text-text-body">
                Conteúdo livre para listas, cards, tabelas e blocos
                informativos.
              </p>
            </BlockAccordion>

            <BlockAccordion disabled title="Indisponível">
              <p className="font-roboto-flex text-base leading-normal text-text-body">
                O trigger respeita o estado desabilitado e preserva o layout.
              </p>
            </BlockAccordion>

            <BlockAccordion.Root defaultOpen>
              <BlockAccordion.Header>
                <BlockAccordion.Trigger>
                  <div className="grid gap-1">
                    <BlockAccordion.Title>
                      Composição manual
                    </BlockAccordion.Title>
                    <p className="font-roboto-flex text-sm leading-normal text-text-body">
                      O header aceita subtítulo, badges e outros elementos sem
                      reimplementar a lógica do accordion.
                    </p>
                  </div>
                </BlockAccordion.Trigger>
              </BlockAccordion.Header>

              <BlockAccordion.Content>
                <p className="font-roboto-flex text-base leading-normal text-text-body">
                  Use os slots públicos quando o header precisar de mais
                  contexto visual.
                </p>
              </BlockAccordion.Content>
            </BlockAccordion.Root>
          </div>
        </section>
      </div>
    </main>
  );
}
