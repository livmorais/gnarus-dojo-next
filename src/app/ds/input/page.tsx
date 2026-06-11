"use client";

import { useState } from "react";
import { Eye, EyeOff, Search } from "lucide-react";
import { Button } from "@/components/ds/button";
import { Input } from "@/components/ds/input";

type InputState = "default" | "filled" | "error" | "readOnly" | "disabled";

const states: InputState[] = [
  "default",
  "filled",
  "error",
  "readOnly",
  "disabled",
];

function getStateProps(state: InputState) {
  const isFilled = state === "filled";
  const isError = state === "error";
  const isReadOnly = state === "readOnly";
  const isDisabled = state === "disabled";

  return {
    helperText: isError ? "Campo obrigatorio." : "Texto de apoio do campo.",
    inputState: {
      defaultValue: isFilled ? "Valor preenchido" : undefined,
      disabled: isDisabled,
      invalid: isError,
      readOnly: isReadOnly,
    },
    isDisabled,
    isError,
    isReadOnly,
  } as const;
}

function InputRow({
  label,
  render,
}: {
  label: string;
  render: (state: InputState) => React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-xs font-semibold tracking-wide text-text-body uppercase">
        {label}
      </p>
      {states.map((state) => (
        <div
          key={`${label}-${state}`}
          className="grid items-start gap-3 md:grid-cols-[64px_minmax(0,1fr)]"
        >
          <span className="pt-3 text-[10px] text-text-body capitalize">
            {state}
          </span>
          {render(state)}
        </div>
      ))}
    </div>
  );
}

function InputExample({
  state,
  required = false,
}: {
  state: InputState;
  required?: boolean;
}) {
  const inputId = `input-text-${state}`;
  const { helperText, inputState } = getStateProps(state);

  return (
    <Input.Root id={inputId} required={required} {...inputState}>
      <Input.Label>Field Label</Input.Label>
      <Input.Control placeholder="Placeholder" />
      <Input.Message>{helperText}</Input.Message>
    </Input.Root>
  );
}

function InputValidationMessageExample({ state }: { state: InputState }) {
  const inputId = `input-validation-message-${state}`;
  const { inputState, isError } = getStateProps(state);

  return (
    <Input.Root id={inputId} {...inputState}>
      <div className="flex items-baseline justify-between gap-3">
        <Input.Label>Email</Input.Label>
        <Input.Message invalid={isError}>
          {isError
            ? "Informe um email valido."
            : "Usaremos esse email para confirmacoes e avisos."}
        </Input.Message>
      </div>
      <Input.Control placeholder="voce@exemplo.com" required type="email" />
    </Input.Root>
  );
}

function SearchActionExample({ state }: { state: InputState }) {
  const inputId = `input-search-${state}`;
  const { isDisabled, isError, isReadOnly, inputState } = getStateProps(state);

  return (
    <Input.Root id={inputId} {...inputState}>
      <Input.Label readOnly={isReadOnly}>Search</Input.Label>
      <Input.Group>
        <Input.Control placeholder="Type to search..." />
        <Button.Root variant="secondary" disabled={isReadOnly || isDisabled}>
          <Button.Label>Search</Button.Label>
        </Button.Root>
      </Input.Group>
      <Input.Message readOnly={isReadOnly} invalid={isError}>
        {isError
          ? "Use um termo valido para buscar."
          : "Agrupe input e botao quando a acao for imediata."}
      </Input.Message>
    </Input.Root>
  );
}

function PasswordExample({ state }: { state: InputState }) {
  const [visible, setVisible] = useState(false);
  const inputId = `input-password-${state}`;
  const { isDisabled, isError, isReadOnly, inputState } = getStateProps(state);

  return (
    <Input.Root id={inputId} required {...inputState}>
      <Input.Label>API Key</Input.Label>
      <Input.Group>
        <Input.Control
          placeholder="sk-..."
          type={visible ? "text" : "password"}
        />
        <Input.Action
          aria-label={visible ? "Ocultar chave" : "Mostrar chave"}
          disabled={isReadOnly || isDisabled}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff /> : <Eye />}
        </Input.Action>
      </Input.Group>
      <Input.Message>
        {isError
          ? "Sua chave precisa ser valida."
          : "Sua chave e armazenada de forma segura."}
      </Input.Message>
    </Input.Root>
  );
}

function IconActionExample({ state }: { state: InputState }) {
  const inputId = `input-icon-action-${state}`;
  const { isDisabled, isReadOnly, inputState } = getStateProps(state);

  return (
    <Input.Root id={inputId} {...inputState}>
      <Input.Label>Busca com acao inline</Input.Label>
      <Input.Group>
        <Input.Control placeholder="O que voce quer aprender?" />
        <Input.Action
          aria-label="Pesquisar"
          disabled={isReadOnly || isDisabled}
        >
          <Search />
        </Input.Action>
      </Input.Group>
      <Input.Message>
        Use Input.Action para icones ou acoes compactas dentro do controle.
      </Input.Message>
    </Input.Root>
  );
}

export default function InputShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Input
          </h1>
          <p className="text-sm text-text-body">
            Composicao de campos com primitives dedicados para label, message,
            agrupamento e acoes inline.
          </p>
        </header>

        <section className="grid w-full gap-6 lg:grid-cols-2">
          <InputRow
            label="Text"
            render={(state) => <InputExample state={state} />}
          />

          <InputRow
            label="Button Group"
            render={(state) => <SearchActionExample state={state} />}
          />

          <InputRow
            label="Password"
            render={(state) => <PasswordExample state={state} />}
          />

          <InputRow
            label="Validation Message"
            render={(state) => <InputValidationMessageExample state={state} />}
          />

          <InputRow
            label="Input Action"
            render={(state) => <IconActionExample state={state} />}
          />
        </section>
      </div>
    </main>
  );
}
