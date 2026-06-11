"use client";

import Link from "next/link";
import {
  CardWrapperContent,
  CardWrapperMetadata,
  CardWrapperRoot,
} from "@/components/ds/card-wrapper";
import { ProgressCircle } from "@/components/ds/ProgressCircle/progress-circle";

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
        <p className="max-w-3xl text-sm text-text-body">{description}</p>
      </div>
      {children}
    </section>
  );
}

type CourseCardPreviewProps = {
  asLink?: boolean;
  borderPosition?: "top" | "left" | "right";
  context?: "default" | "info";
  current: number;
  rounded?: "default" | "lg";
  title: string;
  total: number;
};

function CourseCardPreview({
  asLink = false,
  borderPosition = "top",
  context = "default",
  current,
  rounded = "default",
  title,
  total,
}: CourseCardPreviewProps) {
  const content = (
    <>
      <CardWrapperContent>
        <p className="max-w-[14ch] font-encode-sans text-sm leading-tight font-normal text-text-title md:max-w-[18ch] md:text-lg">
          {title}
        </p>
      </CardWrapperContent>

      <CardWrapperMetadata>
        <ProgressCircle.Root
          ariaLabel={`Progresso do curso ${title}`}
          current={current}
          displayMode="fraction"
          size="mini"
          total={total}
        >
          <ProgressCircle.Track />
          <ProgressCircle.Indicator />
          <ProgressCircle.Value />
        </ProgressCircle.Root>
      </CardWrapperMetadata>
    </>
  );

  if (asLink) {
    return (
      <CardWrapperRoot
        asChild
        borderPosition={borderPosition}
        context={context}
        interactive
        rounded={rounded}
      >
        <Link
          href="/product/alura/ds/card-wrapper"
          prefetch={false}
          className="no-underline"
        >
          {content}
        </Link>
      </CardWrapperRoot>
    );
  }

  return (
    <CardWrapperRoot
      borderPosition={borderPosition}
      context={context}
      rounded={rounded}
    >
      {content}
    </CardWrapperRoot>
  );
}

type BackendMetadata = {
  id: string;
  label: string;
};

type BackendCard = {
  id: string;
  meta: BackendMetadata[];
  progress?: {
    current: number;
    total: number;
  };
  supportText?: string;
  title: string;
};

const backendCards: BackendCard[] = [
  {
    id: "curso-em-andamento",
    title: "Formacao de React com trilha e progresso numerico",
    progress: {
      current: 4,
      total: 6,
    },
    meta: [
      { id: "nivel", label: "Intermediario" },
      { id: "carga", label: "12h" },
    ],
    supportText: "Atualizado hoje",
  },
  {
    id: "curso-disponivel",
    title: "Curso curto com metadados vindos em lista dinamica",
    meta: [
      { id: "status", label: "Novo" },
      { id: "modulos", label: "8 modulos" },
      { id: "categoria", label: "Front-end" },
    ],
  },
];

function renderCourseMetadata(card: BackendCard) {
  return (
    <CardWrapperMetadata className="flex-wrap justify-end">
      {card.progress ? (
        <ProgressCircle.Root
          ariaLabel={`Progresso do curso ${card.title}`}
          current={card.progress.current}
          displayMode="fraction"
          size="mini"
          total={card.progress.total}
        >
          <ProgressCircle.Track />
          <ProgressCircle.Indicator />
          <ProgressCircle.Value />
        </ProgressCircle.Root>
      ) : null}

      <div className="flex min-w-0 flex-col items-end gap-2">
        <div className="flex flex-wrap justify-end gap-2">
          {card.meta.map((item) => (
            <span
              key={item.id}
              className="rounded-full bg-surface-default px-3 py-1 font-mono text-xs uppercase tracking-tight text-text-body"
            >
              {item.label}
            </span>
          ))}
        </div>

        {card.supportText ? (
          <span className="font-mono text-xs uppercase tracking-tight text-text-body">
            {card.supportText}
          </span>
        ) : null}
      </div>
    </CardWrapperMetadata>
  );
}

export default function CardWrapperShowcasePage() {
  return (
    <main className="min-h-screen px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Card Wrapper
          </h1>
          <p className="max-w-3xl text-sm text-text-body">
            Wrapper estrutural com composition pattern para cards que recebem
            conteudo livre e metadados dinamicos do backend. O componente cuida
            apenas de casca, espacamento, borda e distribuicao dos slots.
          </p>
        </header>

        <div className="grid gap-6">
          <ShowcaseSection
            title="Default"
            description="Replica a proporcao visual do Figma sem fixar largura ou altura. O texto cresce livremente e o metadado continua ancorado na lateral."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <CourseCardPreview
                current={4}
                title="Titulos do curso com duas linhas ou ate tres."
                total={6}
              />
              <CourseCardPreview
                current={4}
                rounded="lg"
                title="Variacao arredondada para contextos com cantos mais suaves."
                total={6}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Metadados dinamicos"
            description="Os metadados entram como children no slot de metadata, permitindo renderizar listas, status, apoio textual e indicadores sem acoplar a API do wrapper ao payload do backend."
          >
            <div className="grid gap-4">
              {backendCards.map((card) => (
                <CardWrapperRoot key={card.id}>
                  <CardWrapperContent>
                    <h3 className="font-encode-sans text-sm leading-tight font-normal text-text-title md:text-lg">
                      {card.title}
                    </h3>
                  </CardWrapperContent>
                  {renderCourseMetadata(card)}
                </CardWrapperRoot>
              ))}
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Context"
            description="A variant info troca a borda superior solida por um gradiente, mantendo o restante da estrutura e do preenchimento do card."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <CourseCardPreview
                context="info"
                current={2}
                title="Context info com borda em gradiente para destaque editorial."
                total={5}
              />
              <CourseCardPreview
                asLink
                context="info"
                current={3}
                rounded="lg"
                title="A mesma variant funciona com rounded e composicao via Link."
                total={5}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Border Position"
            description="A borda de destaque pode ser posicionada no topo, na lateral esquerda ou na lateral direita sem alterar a composicao interna do card."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <CourseCardPreview
                borderPosition="top"
                current={2}
                title="Borda no topo para o comportamento padrao."
                total={5}
              />
              <CourseCardPreview
                borderPosition="left"
                current={3}
                title="Borda na esquerda para agrupamentos ou listas editoriais."
                total={5}
              />
              <CourseCardPreview
                borderPosition="right"
                current={4}
                title="Borda na direita para variar o destaque visual."
                total={5}
              />
            </div>
          </ShowcaseSection>

          <ShowcaseSection
            title="Composition"
            description="Suporta composicao com elementos semanticos ou navegaveis via asChild. O hover especial entra apenas quando o wrapper recebe interactive."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <CourseCardPreview
                asLink
                current={3}
                title="Card clicavel com Link do Next preservando o layout base."
                total={5}
              />

              <CardWrapperRoot asChild>
                <article>
                  <CardWrapperContent className="gap-1">
                    <p className="font-mono text-xs uppercase tracking-tight text-text-body">
                      Destaque editorial
                    </p>
                    <h3 className="font-encode-sans text-sm leading-tight font-normal text-text-title md:text-lg">
                      O wrapper aceita qualquer hierarquia interna sem assumir
                      titulos, descricoes ou acoes fixas.
                    </h3>
                  </CardWrapperContent>

                  <CardWrapperMetadata className="items-end">
                    <span className="rounded-full bg-surface-default px-3 py-1 font-mono text-xs uppercase tracking-tight text-text-body">
                      Flexivel
                    </span>
                  </CardWrapperMetadata>
                </article>
              </CardWrapperRoot>
            </div>
          </ShowcaseSection>
        </div>
      </div>
    </main>
  );
}
