"use client";

import { NumericAccondion } from "@/components/ds/numeric-accondion";

const faqItems = [
  {
    answer:
      "E uma jornada de aprendizado estruturada para quem busca profundidade e direcao clara. Organizamos a complexidade do mercado em trilhas progressivas, que levam voce dos fundamentos tecnicos ao avancado, com foco total na aplicacao pratica e nos desafios reais da area.",
    id: "faq-01",
    index: "01",
    title: "O que e uma Carreira Alura?",
  },
  {
    answer:
      "Cada carreira conecta cursos, projetos e checkpoints em uma sequencia pensada para acelerar evolucao profissional com menos dispersao.",
    id: "faq-02",
    index: "02",
    title: "Como a progressao da carreira funciona?",
  },
];

export default function NumericAccondionShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Numeric Accondion
          </h1>
          <p className="max-w-3xl text-sm text-text-body">
            Accordion com indice lateral, para cenários que precisam ser usados
            um estilo fixo com numeros.
          </p>
        </header>

        <section className="grid gap-3">
          <div className="space-y-1">
            <h2 className="font-encode-sans text-xl font-semibold leading-none text-text-title">
              Figma Match
            </h2>
            <p className="text-sm text-text-body">
              Estado aberto alinhado ao Figma.
            </p>
          </div>

          <NumericAccondion
            defaultOpen
            index="01"
            title="O que e uma Carreira Alura?"
          >
            <p className="max-w-5xl font-roboto-flex text-sm leading-6 text-text-main-card-body md:text-base">
              E uma jornada de aprendizado estruturada para quem busca
              profundidade e direcao clara. Organizamos a complexidade do
              mercado em trilhas progressivas, que levam voce dos fundamentos
              tecnicos ao avancado, com foco total na aplicacao pratica e nos
              desafios reais da area.
            </p>
          </NumericAccondion>
        </section>

        <section className="grid gap-3">
          <div className="space-y-1">
            <h2 className="font-encode-sans text-xl font-semibold leading-none text-text-title">
              States
            </h2>
            <p className="text-sm text-text-body">
              Variacoes minimas para validar abertura, fechamento e composição.
            </p>
          </div>

          <div className="grid gap-4">
            {faqItems.map((item, index) => (
              <NumericAccondion
                key={item.id}
                defaultOpen={index === 0}
                index={item.index}
                title={item.title}
              >
                <p className="font-roboto-flex text-sm leading-6 text-text-main-card-body md:text-base">
                  {item.answer}
                </p>
              </NumericAccondion>
            ))}

            <NumericAccondion disabled index="03" title="Accordion desativado">
              <p className="max-w-5xl font-roboto-flex text-sm leading-6 text-text-main-card-body md:text-base">
                E uma jornada de aprendizado estruturada para quem busca
                profundidade e direcao clara. Organizamos a complexidade do
                mercado em trilhas progressivas, que levam voce dos fundamentos
                tecnicos ao avancado, com foco total na aplicacao pratica e nos
                desafios reais da area.
              </p>
            </NumericAccondion>

            <NumericAccondion.Root>
              <NumericAccondion.Header>
                <NumericAccondion.Trigger>
                  <NumericAccondion.Index>04</NumericAccondion.Index>
                  <NumericAccondion.Title>Composição</NumericAccondion.Title>
                </NumericAccondion.Trigger>
              </NumericAccondion.Header>
              <NumericAccondion.Content>
                <p className="font-roboto-flex text-sm leading-6 text-text-main-card-body md:text-base">
                  A composicao e formada pelo Root, que pode ter como filho o
                  Header e o Content. Dentro do Header adicionamos o Trigger e
                  dentro do Trigger o Index e o Title.
                </p>
              </NumericAccondion.Content>
            </NumericAccondion.Root>
          </div>
        </section>
      </div>
    </main>
  );
}
