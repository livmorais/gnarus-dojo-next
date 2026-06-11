import type { ReactNode } from "react";
import { Avatar } from "@/components/ds/avatar";

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
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </section>
  );
}

export default function AvatarShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Avatar
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Avatar reutilizavel com imagem opcional e fallback por iniciais em
            fundo escuro com destaque azul.
          </p>
        </header>

        <ShowcaseBlock
          title="Fallback"
          description="Quando a imagem nao existe, o componente renderiza as iniciais com contraste consistente."
        >
          <Avatar imageLink={null} initials="BT" />
          <Avatar imageLink={null} initials="al" size="lg" />
        </ShowcaseBlock>

        <ShowcaseBlock
          title="With Image"
          description="Quando imageLink existe, o avatar exibe a foto mantendo o corte circular."
        >
          <Avatar
            imageLink="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
            initials="AM"
            alt="Pessoa de exemplo"
            unoptimized
          />
          <Avatar
            imageLink="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
            initials="JS"
            alt="Pessoa de exemplo"
            size="lg"
            unoptimized
          />
        </ShowcaseBlock>

        <ShowcaseBlock
          title="Responsive Composition"
          description="O className permite adaptar o avatar a contextos responsivos sem duplicar logica."
        >
          <Avatar
            imageLink={null}
            initials="PH"
            className="size-8 md:size-10"
          />
          <Avatar
            imageLink={null}
            initials="IN"
            size="lg"
            className="shadow-[inset_0px_0px_10px_0px_rgba(1,12,83,0.4)]"
          />
        </ShowcaseBlock>
      </div>
    </main>
  );
}
