import type { ReactNode } from "react";
import Link from "next/link";
import { CirclePlay, Search, Sparkles } from "lucide-react";
import { ButtonIcon, ButtonLabel, ButtonRoot } from "@/components/ds/button";

type UIState = "default" | "disabled";

const states: UIState[] = ["default", "disabled"];

function stateProps(state: UIState) {
  return {
    disabled: state === "disabled",
  } as const;
}

function Row({
  label,
  render,
}: {
  label: string;
  render: (state: UIState) => ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
        {label}
      </p>
      {states.map((state) => (
        <div
          key={`${label}-${state}`}
          className="flex items-center justify-center gap-2"
        >
          <span className="w-14 text-right text-[10px] text-text-body capitalize">
            {state}
          </span>
          {render(state)}
        </div>
      ))}
    </div>
  );
}

export default function ButtonShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Button
          </h1>
          <p className="text-sm text-text-body">
            Showcase centralizado dos estados e variantes do componente.
          </p>
        </header>

        <section className="grid w-full gap-6 md:grid-cols-2">
          <Row
            label="Primary"
            render={(state) => (
              <ButtonRoot variant="primary" {...stateProps(state)}>
                <ButtonIcon>
                  <CirclePlay strokeWidth={1.8} />
                </ButtonIcon>
                <ButtonLabel>Continuar de onde parou</ButtonLabel>
              </ButtonRoot>
            )}
          />

          <Row
            label="Secondary"
            render={(state) => (
              <ButtonRoot variant="secondary" {...stateProps(state)}>
                <ButtonIcon>
                  <CirclePlay strokeWidth={1.8} />
                </ButtonIcon>
                <ButtonLabel>Prefiro nao responder</ButtonLabel>
              </ButtonRoot>
            )}
          />

          <Row
            label="Mini"
            render={(state) => (
              <ButtonRoot variant="mini" {...stateProps(state)}>
                <ButtonIcon>
                  <CirclePlay strokeWidth={1.8} />
                </ButtonIcon>
                <ButtonLabel>Continuar de onde parou</ButtonLabel>
              </ButtonRoot>
            )}
          />

          <Row
            label="Tertiary"
            render={(state) => (
              <ButtonRoot variant="tertiary" {...stateProps(state)}>
                <ButtonIcon>
                  <CirclePlay strokeWidth={1.8} />
                </ButtonIcon>
                <ButtonLabel>Continuar de onde parou</ButtonLabel>
              </ButtonRoot>
            )}
          />

          <Row
            label="Luri"
            render={(state) => (
              <ButtonRoot variant="luri" {...stateProps(state)}>
                <ButtonIcon>
                  <Sparkles className="size-4" aria-hidden="true" />
                </ButtonIcon>
                <ButtonLabel>Continuar de onde parou</ButtonLabel>
              </ButtonRoot>
            )}
          />

          <Row
            label="Quaternary"
            render={(state) => (
              <ButtonRoot variant="quaternary" {...stateProps(state)}>
                <ButtonIcon>
                  <CirclePlay strokeWidth={1.8} />
                </ButtonIcon>
                <ButtonLabel>Continuar de onde parou</ButtonLabel>
              </ButtonRoot>
            )}
          />

          <Row
            label="Icon Only"
            render={(state) => (
              <ButtonRoot
                variant="iconOnly"
                ariaLabel="Pesquisar"
                {...stateProps(state)}
              >
                <ButtonIcon>
                  <Search strokeWidth={1.8} />
                </ButtonIcon>
              </ButtonRoot>
            )}
          />

          <Row
            label="Rounded"
            render={(state) => (
              <ButtonRoot variant="primary" rounded {...stateProps(state)}>
                <ButtonIcon>
                  <CirclePlay strokeWidth={1.8} />
                </ButtonIcon>
                <ButtonLabel>Acao arredondada</ButtonLabel>
              </ButtonRoot>
            )}
          />

          <Row
            label="Button Link"
            render={(state) => (
              <ButtonRoot asChild variant="quaternary" {...stateProps(state)}>
                <Link prefetch={false} href="https://www.alura.com.br">
                  Button Link
                </Link>
              </ButtonRoot>
            )}
          />

          <Row
            label="Link"
            render={(state) => (
              <ButtonRoot variant="link" {...stateProps(state)}>
                <ButtonLabel>Ver todos os cursos</ButtonLabel>
              </ButtonRoot>
            )}
          />
        </section>
      </div>
    </main>
  );
}
