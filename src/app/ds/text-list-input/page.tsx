"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { TextListInput } from "@/components/ds/text-list-input";

function ShowcaseSection({
  children,
  description,
  title,
}: {
  children: ReactNode;
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

function EmptyExample() {
  const [items, setItems] = useState<string[]>([]);

  return (
    <TextListInput
      id="text-list-empty"
      label="Resultados-chave"
      optionalLabel="(opcional)"
      helperText="Metas quantitativas, mensuraveis e temporais que indicam progresso."
      placeholder="Defina um resultado"
      value={items}
      onValueChange={setItems}
      getRemoveAriaLabel={(_, index) => `Remover resultado ${index + 1}`}
    />
  );
}

function FilledExample() {
  const [items, setItems] = useState([
    "Aumentar conclusao do onboarding para 80%",
    "Reduzir tempo medio de entrega para 3 dias",
  ]);

  return (
    <TextListInput
      id="text-list-filled"
      label="Indicadores"
      helperText="Adicione indicadores objetivos para acompanhar a iniciativa."
      placeholder="Novo indicador"
      value={items}
      onValueChange={setItems}
      getRemoveAriaLabel={(_, index) => `Remover indicador ${index + 1}`}
    />
  );
}

function CustomCopyExample() {
  const [items, setItems] = useState(["React", "Next.js"]);

  return (
    <TextListInput
      id="text-list-custom"
      label="Tags"
      helperText="Use labels curtas para agrupar o conteudo."
      placeholder="Digite uma tag"
      addLabel="Incluir"
      value={items}
      onValueChange={setItems}
      getRemoveAriaLabel={(item) => `Remover tag ${item}`}
    />
  );
}

export default function TextListInputShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Text List Input
          </h1>
          <p className="text-sm text-text-body">
            Campo controlado para montar listas de textos com entrada
            temporaria, adicao por botao ou Enter e remocao acessivel por item.
          </p>
        </header>

        <ShowcaseSection
          title="Estados"
          description="Estado vazio, preenchido e desabilitado usando a mesma API controlada."
        >
          <div className="grid gap-8">
            <EmptyExample />
            <FilledExample />
            <TextListInput
              id="text-list-disabled"
              label="Itens bloqueados"
              helperText="O campo fica indisponivel quando disabled esta ativo."
              placeholder="Adicionar item"
              value={["Item cadastrado"]}
              onValueChange={() => {}}
              disabled
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Customizacao"
          description="Labels, helper text, placeholder, CTA e aria-label de remocao podem ser ajustados por contexto."
        >
          <CustomCopyExample />
        </ShowcaseSection>
      </div>
    </main>
  );
}
