export default function FormContainerAccordionShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-7">
        <header className="space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Form Container Accordion
          </h1>
          <p className="max-w-2xl text-sm text-text-body">
            Container expansível para agrupar etapas e blocos de formulário. A
            implementação fica disponível no pacote de componentes, mas esta
            página foi reduzida para manter a base de imersão estável.
          </p>
        </header>

        <section className="grid gap-4 rounded-2xl border border-border-default bg-surface-secondary p-6">
          <h2 className="font-encode-sans text-xl font-semibold text-text-title">
            Uso esperado
          </h2>
          <p className="text-sm leading-6 text-text-body">
            O componente suporta header, trigger, title e content para compor
            áreas de formulário em etapas. Quando for evoluir o showcase, volte
            a mostrar os estados aberto, fechado e desabilitado aqui.
          </p>
        </section>
      </div>
    </main>
  );
}
