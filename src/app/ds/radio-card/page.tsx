"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RadioCard } from "@/components/ds/radio-card";

type Duration = "short" | "medium" | "long" | "extra-long";

type DurationFormValues = {
  duration: Duration;
};

type ShowcaseBlockProps = {
  children: ReactNode;
  description: string;
  title: string;
};

const durationOptions: { label: string; value: Duration }[] = [
  { label: "1 a 3 meses", value: "short" },
  { label: "3 a 6 meses", value: "medium" },
  { label: "6 a 12 meses", value: "long" },
  { label: "Mais de 12 meses", value: "extra-long" },
];

const scoreOptions = [0, 1, 2, 3];

function ShowcaseBlock({ children, description, title }: ShowcaseBlockProps) {
  return (
    <section className="grid gap-4 rounded-lg border border-border-default bg-surface-secondary p-5">
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

function CardRadioGrid({
  children,
  legend,
}: {
  children: ReactNode;
  legend: string;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm font-medium text-text-title">{legend}</legend>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{children}</div>
    </fieldset>
  );
}

function ControlledCardExample() {
  const [duration, setDuration] = useState<Duration>("short");

  return (
    <CardRadioGrid legend="Duracao do projeto">
      {durationOptions.map((option) => (
        <RadioCard
          checked={duration === option.value}
          key={option.value}
          label={option.label}
          name="duration-controlled"
          onChange={(nextValue) => setDuration(nextValue as Duration)}
          value={option.value}
          variant="card"
        />
      ))}
    </CardRadioGrid>
  );
}

function DefaultCardExample() {
  return (
    <CardRadioGrid legend="Duracao inicial">
      {durationOptions.map((option) => (
        <RadioCard
          defaultChecked={option.value === "medium"}
          key={option.value}
          label={option.label}
          name="duration-default"
          value={option.value}
          variant="card"
        />
      ))}
    </CardRadioGrid>
  );
}

function HookFormCardExample() {
  const { setValue, watch, register } = useForm<DurationFormValues>({
    defaultValues: {
      duration: "long",
    },
  });
  const selectedDuration = watch("duration");
  const durationField = register("duration");

  return (
    <form className="grid gap-3">
      <CardRadioGrid legend="React Hook Form">
        {durationOptions.map((option) => (
          <RadioCard
            checked={selectedDuration === option.value}
            key={option.value}
            label={option.label}
            inputProps={{
              onBlur: durationField.onBlur,
              ref: durationField.ref,
            }}
            name="duration"
            onChange={(nextValue) =>
              setValue("duration", nextValue as Duration)
            }
            value={option.value}
            variant="card"
          />
        ))}
      </CardRadioGrid>
      <p className="text-sm text-text-body">
        Valor selecionado: {selectedDuration}
      </p>
    </form>
  );
}

export default function RadioCardShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            RadioCard
          </h1>
          <p className="text-sm text-text-body">
            Radio customizado com o layout compacto existente e a variante card
            para formularios com opcoes horizontais.
          </p>
        </header>

        <div className="grid gap-4">
          <ShowcaseBlock
            description="Mantem o comportamento e o layout compacto ja usado em fluxos existentes."
            title="Default"
          >
            <fieldset className="grid gap-3">
              <legend className="text-sm font-medium text-text-title">
                Nota
              </legend>
              <div className="flex flex-wrap gap-8">
                {scoreOptions.map((score) => (
                  <RadioCard
                    defaultChecked={score === 2}
                    key={score}
                    label={
                      <span className="text-[19px] leading-7 text-text-title">
                        {score}
                      </span>
                    }
                    name="score"
                    value={score}
                  />
                ))}
              </div>
            </fieldset>
          </ShowcaseBlock>

          <ShowcaseBlock
            description="Layout do Figma, com label a esquerda e radio a direita."
            title="Variant card controlada"
          >
            <ControlledCardExample />
          </ShowcaseBlock>

          <ShowcaseBlock
            description="Uso nativo nao-controlado, preservando o estado no proprio input."
            title="Variant card default"
          >
            <DefaultCardExample />
          </ShowcaseBlock>

          <ShowcaseBlock
            description="Integracao usando onChange(value), mantendo o controle do campo no formulario."
            title="React Hook Form"
          >
            <HookFormCardExample />
          </ShowcaseBlock>

          <ShowcaseBlock
            description="Estado disabled aplica opacidade, cursor e disabled nativo no input."
            title="Disabled"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <RadioCard
                disabled
                label="3 a 6 meses"
                name="duration-disabled"
                value="medium"
                variant="card"
              />
              <RadioCard
                defaultChecked
                disabled
                label="6 a 12 meses"
                name="duration-disabled"
                value="long"
                variant="card"
              />
            </div>
          </ShowcaseBlock>
        </div>
      </div>
    </main>
  );
}
