import { Check, Clock3, SquareCode, Code } from "lucide-react";
import {
  CheckpointCardButton,
  CheckpointCardContent,
  CheckpointCardFooter,
  CheckpointCardIndex,
  CheckpointCardMeta,
  CheckpointCardRail,
  CheckpointCardRoot,
  CheckpointCardTitle,
  CheckpointCardTrack,
  type CheckpointCardStatus,
} from "@/components/ds/checkpoint-card";

function StateCard({ status }: Readonly<{ status: CheckpointCardStatus }>) {
  const railIcon =
    status === "completed" ? (
      <Check aria-hidden="true" className="text-[#131416]" strokeWidth={2.2} />
    ) : (
      <SquareCode aria-hidden="true" strokeWidth={2} />
    );

  return (
    <CheckpointCardRoot status={status}>
      <CheckpointCardTrack>
        <CheckpointCardRail>{railIcon}</CheckpointCardRail>
        <CheckpointCardIndex>04</CheckpointCardIndex>
      </CheckpointCardTrack>

      <CheckpointCardContent>
        <CheckpointCardTitle>Checkpoint Back-end Java</CheckpointCardTitle>

        <CheckpointCardFooter>
          <CheckpointCardButton
            href="https://www.alura.com.br"
            aria-label="Abrir atividade interativa do checkpoint Back-end Java"
          >
            <Code aria-hidden="true" strokeWidth={2} />
            <span>Atividade Interativa</span>
          </CheckpointCardButton>

          <CheckpointCardMeta>
            <Clock3 aria-hidden="true" strokeWidth={1.8} />
            <span>15 horas</span>
          </CheckpointCardMeta>
        </CheckpointCardFooter>
      </CheckpointCardContent>
    </CheckpointCardRoot>
  );
}

export default function CheckpointCardShowcasePage() {
  return (
    <main className="min-h-screen bg-surface-tertiary px-4 py-8 text-text-title md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
        <header className="max-w-2xl space-y-2">
          <p className="text-sm text-text-body">Design System</p>
          <h1 className="font-encode-sans text-3xl font-semibold leading-none">
            Checkpoint Card
          </h1>
          <p className="text-sm text-text-body">
            Componente reultilizavel para cenarios de checkpoint.
          </p>
        </header>

        <div className="grid gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-text-body uppercase">
              Default
            </p>
            <StateCard status="default" />
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-text-body uppercase">
              Completed
            </p>
            <StateCard status="completed" />
          </div>
        </div>
      </div>
    </main>
  );
}
