import Link from "next/link";
import { BookOpenText, Clock3, Flag, Lock, SquareCheck } from "lucide-react";
import { Badge } from "@/components/ds/badge";
import {
  SearchResultCardContent,
  SearchResultCardDescription,
  SearchResultCardFooter,
  SearchResultCardHeader,
  SearchResultCardNumeral,
  SearchResultCardRoot,
  SearchResultCardTitle,
  type SearchResultCardRootProps,
} from "@/components/ds/search-result-card";

function ShowcaseSection({
  children,
  description,
  title,
}: Readonly<{
  children: React.ReactNode;
  description: string;
  title: string;
}>) {
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

type SearchResultCardExampleProps = Pick<
  SearchResultCardRootProps,
  "accentColor" | "accentColorAsGradient" | "rounded"
> & {
  asLink?: boolean;
  numeral?: string;
};

function SearchResultCardExample({
  accentColor,
  accentColorAsGradient,
  asLink = false,
  numeral,
  rounded = "default",
}: SearchResultCardExampleProps) {
  const rootProps: SearchResultCardRootProps = {
    accentColor,
    accentColorAsGradient,
    rounded,
  };

  const content = (
    <>
      {numeral && (
        <SearchResultCardNumeral>
          <span className="font-encode-sans text-xl leading-7 font-light text-text-body">
            {numeral}
          </span>
        </SearchResultCardNumeral>
      )}

      <SearchResultCardContent>
        <div className="flex flex-col items-start gap-2">
          <SearchResultCardHeader>
            <Badge.Root
              bordered={false}
              className="gap-1.5 bg-feedback-error-default px-1.5 text-text-title"
              variant="category"
            >
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center justify-center"
              >
                <Lock className="size-2.75" strokeWidth={2} />
              </span>
              <Badge.Label size="xs">Bloqueado</Badge.Label>
            </Badge.Root>
            <Badge.Root variant="category">
              <Badge.Label size="xs">Curso</Badge.Label>
            </Badge.Root>
            <Badge.Root
              bordered={false}
              className="gap-1.5 border-transparent bg-brand-logo text-border-subtle"
              variant="category"
            >
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center justify-center"
              >
                <Flag className="size-3" strokeWidth={2} />
              </span>
              <Badge.Label size="xs" className="block max-w-14 truncate">
                Para comecar
              </Badge.Label>
            </Badge.Root>
            <Badge.Root
              bordered={false}
              className="shrink-0 border-transparent bg-brand-logo text-border-subtle"
              variant="category"
            >
              <Badge.Label size="xs">+3</Badge.Label>
            </Badge.Root>
          </SearchResultCardHeader>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs leading-5 font-normal tracking-tight text-text-body">
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center justify-center"
              >
                <Clock3 className="size-3.5" strokeWidth={1.8} />
              </span>
              <span>15 h</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs leading-5 font-normal tracking-tight text-text-body">
              <span
                aria-hidden="true"
                className="inline-flex shrink-0 items-center justify-center"
              >
                <BookOpenText className="size-3.5" strokeWidth={1.8} />
              </span>
              <span>16 cursos</span>
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <p className="font-mono text-sm leading-6 font-normal uppercase tracking-tight text-(--search-result-card-accent)">
            Programacao
          </p>
          <SearchResultCardTitle>
            DevOps: trabalhando com repositorios no GitHub
          </SearchResultCardTitle>
          <SearchResultCardDescription>
            De aqui os primeiros passos em DevOps, voce vai aprender o que e
            DevOps e para o que serve, sobre automacao e colaboracao em fluxo
            real de times.
          </SearchResultCardDescription>
        </div>
      </SearchResultCardContent>

      <SearchResultCardFooter>
        <div className="inline-flex items-center gap-2 rounded-full bg-feedback-success-default/15 px-4 py-1 text-feedback-success-default">
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center text-feedback-success-default"
          >
            <SquareCheck className="size-3.5" />
          </span>
          <span className="font-mono text-xs leading-6 font-normal uppercase tracking-tight">
            Finalizado
          </span>
        </div>

        <p className="text-right font-mono text-xs leading-6 font-normal uppercase tracking-tight text-text-title">
          1 pre-requisito
        </p>
      </SearchResultCardFooter>
    </>
  );

  if (asLink) {
    return (
      <SearchResultCardRoot {...rootProps} asChild interactive>
        <Link
          href="/product/alura/ds/result-card"
          prefetch={false}
          className="block w-full"
        >
          {content}
        </Link>
      </SearchResultCardRoot>
    );
  }

  return <SearchResultCardRoot {...rootProps}>{content}</SearchResultCardRoot>;
}

export default function SearchResultCardShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Search Result Card
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Card de resultado de busca com composition reduzida em root, content
            e footer. O showcase abaixo usa tema dark para refletir o visual do
            Figma.
          </p>
        </header>

        <ShowcaseSection
          title="Exemplos"
          description="Estado padrao com header, composicao com link via asChild, variacao arredondada e exemplo com numeral destacado no topo."
        >
          <div className="grid gap-6 rounded-2xl p-6 md:grid-cols-2 xl:grid-cols-3">
            <SearchResultCardExample />
            <SearchResultCardExample asLink />
            <SearchResultCardExample
              accentColor="#8a63e6"
              accentColorAsGradient
              numeral="01"
            />
            <SearchResultCardExample accentColor="#66d9ef" />
            <SearchResultCardExample rounded="lg" />
          </div>
        </ShowcaseSection>
      </div>
    </main>
  );
}
