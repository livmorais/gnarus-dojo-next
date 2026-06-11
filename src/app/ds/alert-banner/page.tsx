import { AlertBanner } from "@/components/ds/alert-banner";

export default function AlertBannerShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Alert Banner
          </h1>
          <p className="text-sm text-text-body">
            Wrapper para avisos em destaque com mensagem obrigatoria e CTA
            opcional de substituicao.
          </p>
        </header>

        <section className="grid gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
              Sem substituto
            </p>
            <AlertBanner message="Essa trilha foi descontinuada." />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
              Com substituto
            </p>
            <AlertBanner
              message={
                <>
                  Essa trilha foi descontinuada e ganhou uma{" "}
                  <strong className="underline">versao atualizada</strong>
                </>
              }
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
              Warning
            </p>
            <AlertBanner
              variant="warning"
              message="Essa trilha esta em pre-lancamento."
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
              Danger
            </p>
            <AlertBanner
              variant="danger"
              message="Essa trilha foi descontinuada e nao esta mais disponivel."
            />
          </div>
        </section>
      </div>
    </main>
  );
}
