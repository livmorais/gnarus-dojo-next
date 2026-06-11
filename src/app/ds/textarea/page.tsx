import type { ReactNode } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ds/textarea";

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

export default function TextareaShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Textarea
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Estados, acessibilidade e formas de compor altura e layout do
            componente.
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
            description="Estado padrão com label e helper text, sem resize manual por padrão."
          >
            <Textarea
              label="Comentário"
              helperText="Descreva seu contexto com o máximo de detalhes necessário."
              placeholder="Escreva sua mensagem"
            />
          </ShowcaseBlock>

          <ShowcaseBlock
            title="Character Count"
            description="O contador é associado ao campo e atualizado para tecnologias assistivas."
          >
            <Textarea
              label="Resumo"
              helperText="Use até 120 caracteres."
              maxLength={120}
              placeholder="Escreva um resumo curto"
              showCharacterCount
            />
          </ShowcaseBlock>

          <ShowcaseBlock
            title="Custom Height"
            description="A altura inicial pode ser definida no uso do componente via classes do wrapper, sem acoplar essa decisão ao core do DS."
          >
            <Textarea
              label="Descrição detalhada"
              helperText="Neste caso o layout pede uma altura inicial maior."
              placeholder="Digite uma descrição longa"
              controlClassName="min-h-40"
            />
          </ShowcaseBlock>

          <ShowcaseBlock
            title="Invalid"
            description="Estado visual e semântico compartilhando a mesma origem de verdade."
          >
            <Textarea
              invalid
              label="Motivo"
              helperText="Este campo precisa ser preenchido."
              placeholder="Explique o motivo"
            />
          </ShowcaseBlock>

          <ShowcaseBlock
            title="Disabled And Read Only"
            description="Exemplos dos estados não interativos do componente."
          >
            <Textarea
              disabled
              label="Observação"
              placeholder="Campo desabilitado"
            />
            <Textarea
              id="treste"
              readOnly
              label="Observação"
              defaultValue="Conteúdo somente leitura"
              helperText="Este texto não pode ser alterado."
            />
          </ShowcaseBlock>
        </div>
      </div>
    </main>
  );
}
