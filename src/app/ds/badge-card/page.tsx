import { Construction, Sparkles, Star } from "lucide-react";
import { BadgeCard } from "@/components/ds/badge-card";

export default function BadgeCardShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Badge Card
          </h1>
          <p className="text-sm text-text-body">
            Wrapper de destaque com area lateral para icone e conteudo livre.
          </p>
        </header>

        <section className="grid gap-4">
          <BadgeCard.Root>
            <BadgeCard.Icon>
              <Construction aria-hidden="true" className="size-10 text-white" />
            </BadgeCard.Icon>
            <BadgeCard.Content>
              <p className="font-roboto-flex text-base font-medium leading-6 text-text-title">
                Trilha em construcao. Em breve novos cursos!
              </p>
            </BadgeCard.Content>
          </BadgeCard.Root>

          <BadgeCard.Root>
            <BadgeCard.Icon>
              <Sparkles aria-hidden="true" className="size-8 text-white" />
            </BadgeCard.Icon>
            <BadgeCard.Content>
              <div className="space-y-3">
                <p className="font-roboto-flex text-base leading-6 text-text-title">
                  <strong className="font-medium">Parabens!</strong> Voce
                  completou a trilha.
                </p>
                <button
                  type="button"
                  className="font-jetbrains-mono text-xs leading-5 text-white uppercase underline underline-offset-2"
                >
                  Ver certificado da trilha
                </button>
              </div>
            </BadgeCard.Content>
          </BadgeCard.Root>

          <BadgeCard.Root className="bg-surface-brand">
            <BadgeCard.Icon>
              <Star aria-hidden="true" className="size-8 text-white" />
            </BadgeCard.Icon>
            <BadgeCard.Content>
              <p className="font-roboto-flex text-sm leading-5 text-text-body">
                Texto de conclusao complementar da trilha.
              </p>
            </BadgeCard.Content>
          </BadgeCard.Root>

          <BadgeCard.Root variant="sm">
            <BadgeCard.Icon variant="sm">
              <Star aria-hidden="true" className="size-6 text-white" />
            </BadgeCard.Icon>
            <BadgeCard.Content variant="sm">
              <p className="font-roboto-flex text-base leading-6 text-text-title">
                Que tal fazer um <span className="underline">challenge?</span>
              </p>
            </BadgeCard.Content>
          </BadgeCard.Root>
        </section>
      </div>
    </main>
  );
}
