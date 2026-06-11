"use client";

import { useState } from "react";
import { Select } from "@/components/ds/select/select";

type TeamOption = {
  area: string;
  disabled?: boolean;
  id: number;
  name: string;
};

const teamOptions: TeamOption[] = [
  { id: 101, name: "Design System", area: "Produto" },
  { id: 102, name: "Conteudo", area: "Produto" },
  { id: 103, name: "Plataforma", area: "Engenharia" },
  { id: 104, name: "Dados", area: "Engenharia", disabled: true },
];

const groupedTeamOptions = [
  {
    label: "Produto",
    options: teamOptions.filter((option) => option.area === "Produto"),
  },
  {
    label: "Engenharia",
    options: teamOptions.filter((option) => option.area === "Engenharia"),
  },
];

const statusOptions = [
  { id: "all", name: "Todos" },
  { id: "active", name: "Ativos" },
  { id: "archived", name: "Arquivados" },
];

function SelectItems({ options }: { options: TeamOption[] }) {
  return options.map((option) => (
    <Select.Item
      key={option.id}
      disabled={option.disabled}
      textValue={option.name}
      value={String(option.id)}
    >
      <Select.ItemIndicator />
      <Select.ItemText>{option.name}</Select.ItemText>
    </Select.Item>
  ));
}

function DefaultSelectExample() {
  return (
    <Select.Root name="team">
      <Select.Label htmlFor="select-default" required={false}>
        Time
      </Select.Label>
      <Select.Trigger
        id="select-default"
        aria-describedby="select-default-message"
      >
        <Select.Value placeholder="Selecione uma opcao" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <SelectItems options={teamOptions} />
        </Select.Viewport>
      </Select.Content>
      <Select.Message id="select-default-message">
        Escolha o time responsavel pelo conteudo.
      </Select.Message>
    </Select.Root>
  );
}

function SecondarySelectExample() {
  return (
    <Select.Root name="status">
      <Select.Label htmlFor="select-secondary">Status</Select.Label>
      <Select.Trigger
        id="select-secondary"
        aria-describedby="select-secondary-message"
        variant="secondary"
      >
        <Select.Value placeholder="Todos" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          {statusOptions.map((option) => (
            <Select.Item
              key={option.id}
              textValue={option.name}
              value={option.id}
            >
              <Select.ItemIndicator />
              <Select.ItemText>{option.name}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
      <Select.Message id="select-secondary-message">
        Variacao com fundo secundario.
      </Select.Message>
    </Select.Root>
  );
}

function ControlledSelectExample() {
  const [selectedTeamId, setSelectedTeamId] = useState(
    String(teamOptions[0]?.id),
  );

  return (
    <Select.Root
      name="controlled-team"
      onValueChange={setSelectedTeamId}
      value={selectedTeamId}
    >
      <Select.Label htmlFor="select-controlled">Time selecionado</Select.Label>
      <Select.Trigger
        id="select-controlled"
        aria-describedby="select-controlled-message"
      >
        <Select.Value placeholder="Selecione uma opcao" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <SelectItems options={teamOptions} />
        </Select.Viewport>
      </Select.Content>
      <Select.Message id="select-controlled-message">
        Valor enviado: {selectedTeamId || "nenhum"}.
      </Select.Message>
    </Select.Root>
  );
}

function InvalidSelectExample() {
  return (
    <Select.Root name="required-team" required>
      <Select.Label htmlFor="select-invalid" required>
        Time
      </Select.Label>
      <Select.Trigger
        id="select-invalid"
        aria-describedby="select-invalid-message"
        aria-invalid
      >
        <Select.Value placeholder="Selecione uma opcao" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <SelectItems options={teamOptions} />
        </Select.Viewport>
      </Select.Content>
      <Select.Message id="select-invalid-message" invalid>
        Selecione um time para continuar.
      </Select.Message>
    </Select.Root>
  );
}

function DisabledSelectExample() {
  return (
    <Select.Root
      defaultValue={String(teamOptions[1]?.id)}
      disabled
      name="disabled-team"
    >
      <Select.Label htmlFor="select-disabled">Time</Select.Label>
      <Select.Trigger
        id="select-disabled"
        aria-describedby="select-disabled-message"
      >
        <Select.Value placeholder="Selecione uma opcao" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <SelectItems options={teamOptions} />
        </Select.Viewport>
      </Select.Content>
      <Select.Message id="select-disabled-message">
        Campo indisponivel no estado atual.
      </Select.Message>
    </Select.Root>
  );
}

function RoundedSelectExample() {
  return (
    <Select.Root name="rounded-team">
      <Select.Label htmlFor="select-rounded">Time</Select.Label>
      <Select.Trigger
        id="select-rounded"
        aria-describedby="select-rounded-message"
        rounded
      >
        <Select.Value placeholder="Selecione uma opcao" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <SelectItems options={teamOptions} />
        </Select.Viewport>
      </Select.Content>
      <Select.Message id="select-rounded-message">
        Variacao com trigger arredondado.
      </Select.Message>
    </Select.Root>
  );
}

function GroupedSelectExample() {
  return (
    <Select.Root name="grouped-team">
      <Select.Label htmlFor="select-grouped">Time por area</Select.Label>
      <Select.Trigger
        id="select-grouped"
        aria-describedby="select-grouped-message"
      >
        <Select.Value placeholder="Selecione uma opcao" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          {groupedTeamOptions.map((group, index) => (
            <Select.Group key={group.label}>
              <Select.GroupLabel>{group.label}</Select.GroupLabel>
              <SelectItems options={group.options} />
              {index < groupedTeamOptions.length - 1 ? (
                <Select.Separator />
              ) : null}
            </Select.Group>
          ))}
        </Select.Viewport>
      </Select.Content>
      <Select.Message id="select-grouped-message">
        Opcoes agrupadas por metadado do backend.
      </Select.Message>
    </Select.Root>
  );
}

function EmptySelectExample() {
  return (
    <Select.Root name="empty-team">
      <Select.Label htmlFor="select-empty">Time</Select.Label>
      <Select.Trigger id="select-empty" aria-describedby="select-empty-message">
        <Select.Value placeholder="Selecione uma opcao" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Item disabled value="empty">
            <Select.ItemText>Nenhuma opcao disponivel</Select.ItemText>
          </Select.Item>
        </Select.Viewport>
      </Select.Content>
      <Select.Message id="select-empty-message">
        Estado para listas retornadas sem registros.
      </Select.Message>
    </Select.Root>
  );
}

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
      <header className="space-y-1">
        <h2 className="font-encode-sans text-xl font-semibold leading-none text-text-title">
          {title}
        </h2>
        <p className="text-sm text-text-body">{description}</p>
      </header>
      {children}
    </section>
  );
}

export default function SelectShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Select
          </h1>
          <p className="text-sm text-text-body">
            Wrapper acessivel do Radix Select com label, mensagem, estados de
            formulario explicitos e composicao por slots.
          </p>
        </header>

        <section className="grid w-full gap-6 lg:grid-cols-2">
          <ShowcaseSection
            title="Default"
            description="Trigger simples com placeholder e opcoes dinamicas."
          >
            <DefaultSelectExample />
          </ShowcaseSection>

          <ShowcaseSection
            title="Secondary"
            description="Trigger com fundo secundario conforme a variante do Figma."
          >
            <SecondarySelectExample />
          </ShowcaseSection>

          <ShowcaseSection
            title="Controlled"
            description="Valor controlado pelo consumidor para formularios e filtros."
          >
            <ControlledSelectExample />
          </ShowcaseSection>

          <ShowcaseSection
            title="Invalid"
            description="Estado obrigatorio com mensagem associada ao trigger."
          >
            <InvalidSelectExample />
          </ShowcaseSection>

          <ShowcaseSection title="Disabled" description="Campo sem interacao.">
            <DisabledSelectExample />
          </ShowcaseSection>

          <ShowcaseSection
            title="Rounded"
            description="Variacao arredondada do trigger."
          >
            <RoundedSelectExample />
          </ShowcaseSection>

          <ShowcaseSection
            title="Grouped"
            description="Grupos e separadores para listas com metadados."
          >
            <GroupedSelectExample />
          </ShowcaseSection>

          <ShowcaseSection
            title="Empty"
            description="Retorno sem registros mantendo o menu acessivel."
          >
            <EmptySelectExample />
          </ShowcaseSection>
        </section>
      </div>
    </main>
  );
}
