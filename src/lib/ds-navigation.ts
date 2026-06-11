export type DsNavigationItem = {
  description: string;
  href: string;
  shortTitle: string;
  title: string;
};

export const dsNavigationItems: DsNavigationItem[] = [
  {
    href: "/ds/badge-card",
    title: "Badge Card",
    shortTitle: "Badge Card",
    description:
      "Wrapper de destaque com trilho lateral para icone e composicao de conteudo.",
  },
  {
    href: "/ds/alert-banner",
    title: "Alert Banner",
    shortTitle: "Alert Banner",
    description:
      "Faixa de alerta com mensagem em destaque e CTA opcional para redirecionamento.",
  },
  {
    href: "/ds/block-accordion",
    title: "Block Accordion",
    shortTitle: "Block Accordion",
    description:
      "Accordion generico para a aplicacao com header blocado, body livre e composicao por slots.",
  },
  {
    href: "/ds/avatar",
    title: "Avatar",
    shortTitle: "Avatar",
    description:
      "Avatar com imagem opcional e fallback por iniciais para perfis e autores.",
  },
  {
    href: "/ds/badge",
    title: "Badge",
    shortTitle: "Badge",
    description:
      "Badge com variantes, dot tones semanticos e composicao para labels compactas.",
  },
  {
    href: "/ds/button",
    title: "Button",
    shortTitle: "Button",
    description: "Componente de acao com variantes, estados e acessibilidade.",
  },
  {
    href: "/ds/empty-state",
    title: "Empty State",
    shortTitle: "Empty State",
    description:
      "Componente para estados sem conteudo, busca vazia e acoes contextuais.",
  },
  {
    href: "/ds/textarea",
    title: "Textarea",
    shortTitle: "Textarea",
    description:
      "Campo multilinha com label, helper text, contador acessivel e resize configuravel.",
  },
  {
    href: "/ds/form-container-accordion",
    title: "Form Container Accordion",
    shortTitle: "Form Accordion",
    description:
      "Container expansivel para agrupar campos de formulario com composition pattern e body livre.",
  },
  {
    href: "/ds/numeric-accondion",
    title: "Numeric Accondion",
    shortTitle: "Numeric Accondion",
    description:
      "Accordion numerado com indice lateral, header claro e area de status para secoes explicativas.",
  },
  {
    href: "/ds/input",
    title: "Input",
    shortTitle: "Input",
    description:
      "Campos de texto com estados, helper text, composicao e acoes inline.",
  },
  {
    href: "/ds/text-list-input",
    title: "Text List Input",
    shortTitle: "Text List",
    description:
      "Campo controlado para criar e remover listas de textos em formularios.",
  },
  {
    href: "/ds/radio-card",
    title: "RadioCard",
    shortTitle: "RadioCard",
    description:
      "Radio customizado com variantes compacta e card para formularios.",
  },
  {
    href: "/ds/search-input",
    title: "Search Input",
    shortTitle: "Search Input",
    description:
      "Campo de busca com CTA, acao de limpar e comportamento responsivo para mobile.",
  },
  {
    href: "/ds/select",
    title: "Select",
    shortTitle: "Select",
    description:
      "Select acessivel baseado em Radix com composicao, estados de formulario e dados dinamicos.",
  },
  {
    href: "/ds/result-card",
    title: "Search Result Card",
    shortTitle: "Result Card",
    description:
      "Card de resultado de busca com composition pattern, metadados, categoria e rodape contextual.",
  },
  {
    href: "/ds/card-wrapper",
    title: "Card Wrapper",
    shortTitle: "Card Wrapper",
    description:
      "Wrapper estrutural para cards com slots de conteudo e metadados dinamicos do backend.",
  },
  {
    href: "/ds/checkpoint-card",
    title: "Checkpoint Card",
    shortTitle: "Checkpoint Card",
    description:
      "Card composto com trilho lateral, numeracao, metadados e painel de descricao.",
  },
  {
    href: "/ds/progress-bar",
    title: "Progress Bar",
    shortTitle: "Progress Bar",
    description:
      "Barra de progresso composta por track, indicator e value para dados percentuais dinamicos.",
  },
  {
    href: "/ds/tooltip",
    title: "Tooltip",
    shortTitle: "Tooltip",
    description:
      "Wrapper de tooltip baseado em Radix para hints curtos com foco visivel e arrow.",
  },
  {
    href: "/ds/pagination",
    title: "Pagination",
    shortTitle: "Pagination",
    description:
      "Paginacao compacta com resumo de itens, elipses e navegacao por callback ou href.",
  },
  {
    href: "/ds/progress-circle",
    title: "Progress Circle",
    shortTitle: "Progress Circle",
    description:
      "Indicador circular com composition pattern e parsing interno para payloads dinamicos do backend.",
  },
  {
    href: "/ds/filter-group",
    title: "Filter Group",
    shortTitle: "Filter Group",
    description:
      "Grupo de filtros com checkbox customizado, dados dinamicos e composition pattern simplificado.",
  },
];
