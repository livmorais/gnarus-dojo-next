"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ds/button";
import { Input } from "@/components/ds/input";
import { Select } from "@/components/ds/select/select";
import { Textarea } from "@/components/ds/textarea";

const schema = z.object({
  name: z.string().trim().min(3, "Mínimo de 3 caracteres"),
  description: z.string().trim().min(10, "Mínimo de 10 caracteres"),
  priority: z.enum(["low", "medium", "high"]),
  finalDate: z.string(),
});

type FormValues = z.infer<typeof schema> & {
  id: string;
};

const priorities = [
  { label: "Baixa", value: "low" },
  { label: "Média", value: "medium" },
  { label: "Alta", value: "high" },
] as const;

export default function TaskPage() {
  const [tasks, setTasks] = useState<FormValues[]>([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Omit<FormValues, "id">>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      priority: "medium",
      finalDate: new Date().toISOString().split("T")[0],
    },
  });

  const priorityId = "task-priority";
  const priorityMessageId = `${priorityId}-message`;

  return (
    <main className="min-h-screen px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto w-full space-y-6">
        <header className="space-y-1">
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Nova tarefa
          </h1>

          <p className="text-sm text-text-body">
            Preencha os campos abaixo para cadastrar uma nova tarefa
          </p>
        </header>

        <form
          className="grid gap-6"
          onSubmit={handleSubmit(async (values) => {
            await new Promise((r) => setTimeout(r, 500));

            setTasks((prev) => [
              { ...values, id: crypto.randomUUID() },
              ...prev,
            ]);

            reset({
              name: "",
              description: "",
              priority: "medium",
              finalDate: new Date().toISOString().split("T")[0],
            });
          })}
        >
          <Input.Root id="task-name" invalid={Boolean(errors.name)} required>
            <Input.Label>Nome</Input.Label>

            <Input.Control
              placeholder="Ex: Revisar o board do ClickUp"
              {...register("name")}
            />

            <Input.Message invalid={Boolean(errors.name)}>
              {errors.name?.message ?? "Mínimo de 3 caracteres"}
            </Input.Message>
          </Input.Root>

          <Textarea
            label="Descrição"
            placeholder="Descreva a tarefa"
            invalid={Boolean(errors.description)}
            helperText={
              errors.description?.message ?? "Mínimo de 10 caracteres"
            }
            {...register("description")}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="priority"
              render={({ field, fieldState }) => (
                <Select.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Select.Label htmlFor={priorityId} required>
                    Prioridade
                  </Select.Label>

                  <Select.Trigger
                    id={priorityId}
                    aria-describedby={priorityMessageId}
                    aria-invalid={Boolean(fieldState.error)}
                  >
                    <Select.Value placeholder="Selecione a prioridade" />
                    <Select.Icon />
                  </Select.Trigger>

                  <Select.Content>
                    <Select.Viewport>
                      {priorities.map((item) => (
                        <Select.Item key={item.value} value={item.value}>
                          <Select.ItemIndicator />
                          <Select.ItemText>{item.label}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>

                  <Select.Message
                    id={priorityMessageId}
                    invalid={Boolean(fieldState.error)}
                  >
                    {fieldState.error?.message ??
                      "Selecione o nivel de urgência da tarefa"}
                  </Select.Message>
                </Select.Root>
              )}
            />

            <Input.Root
              id="task-final-date"
              invalid={Boolean(errors.finalDate)}
              required
            >
              <Input.Label>Data final</Input.Label>

              <Input.Control
                type="date"
                inputClassName="[color-scheme:dark]"
                {...register("finalDate")}
              />

              <Input.Message invalid={Boolean(errors.finalDate)}>
                {errors.finalDate?.message ??
                  "Selecione a data limite da tarefa"}
              </Input.Message>
            </Input.Root>
          </div>

          <Button.Root type="submit" variant="primary" disabled={isSubmitting}>
            <Button.Label>
              {isSubmitting ? "Salvando..." : "Criar tarefa"}
            </Button.Label>
          </Button.Root>
        </form>

        <div className="space-y-2">
          {tasks.map((task) => (
            <pre
              key={task.id}
              className="overflow-x-auto text-xs text-text-body"
            >
              {JSON.stringify(task, null, 2)}
            </pre>
          ))}
        </div>
      </div>
    </main>
  );
}
