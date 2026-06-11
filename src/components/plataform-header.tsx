import { Bell } from "lucide-react";
import Link from "next/link";
import AluraLogo from "@public/assets/alura/logo-alura.component.svg";
import { Avatar } from "./ds/avatar";
import {
  SearchInputActions,
  SearchInputClearButton,
  SearchInputField,
  SearchInputInput,
  SearchInputMobileCloseButton,
  SearchInputMobileTrigger,
  SearchInputRoot,
  SearchInputSearchButton,
  SearchInputAiButton,
} from "./ds/search-input";

export default function PlataformHeader() {
  return (
    <header className="border-b border-transparent bg-surface-tertiary">
      <div className="grid items-center gap-6 px-10 py-6 md:grid-cols-[1fr_auto_1fr]">
        <div className="shrink-0 md:justify-self-start">
          <AluraLogo className="h-8 w-auto shrink-0" />
        </div>

        <div className="min-w-0 md:justify-self-center w-130">
          <SearchInputRoot className="">
            <div className="flex w-full items-center gap-2">
              <SearchInputMobileTrigger ariaLabel="Abrir busca" />
              <SearchInputField className="max-w-none flex-1">
                <SearchInputInput
                  aria-label="Buscar cursos, carreiras e conteúdos"
                  placeholder="O que você quer aprender?"
                />
                <SearchInputClearButton ariaLabel="Limpar busca" />
                <SearchInputActions>
                  <SearchInputSearchButton ariaLabel="Pesquisar" />
                  <SearchInputAiButton ariaLabel="Pesquisar com IA" />
                </SearchInputActions>
              </SearchInputField>
              <SearchInputMobileCloseButton ariaLabel="Fechar busca" />
            </div>
          </SearchInputRoot>
        </div>

        <div className="flex items-center gap-4 md:justify-self-end">
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/dashboard"
              prefetch={false}
              className="text-sm font-medium text-text-title transition-colors hover:text-text-title/80"
            >
              Início
            </Link>
            <Link
              href="/ds"
              prefetch={false}
              className="text-sm font-medium text-text-title transition-colors hover:text-text-title/80"
            >
              Explorar catálogo
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="relative inline-flex size-10 items-center justify-center rounded-full bg-platform-header-notification-background text-icon-primary">
              <Bell className="size-5" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute right-2.5 top-2.5 size-2 rounded-full bg-[#fe002a]"
              />
            </div>

            <Avatar imageLink={""} initials="BT" size="md" />
          </div>
        </div>
      </div>
    </header>
  );
}
