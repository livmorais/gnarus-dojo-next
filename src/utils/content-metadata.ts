const CATEGORY_PRESENTATION = {
  "data-science": {
    color: "var(--color-search-category-data-science)",
    label: "DATA SCIENCE",
  },
  devops: {
    color: "var(--color-search-category-devops)",
    label: "DEVOPS",
  },
  "front-end": {
    color: "var(--color-search-category-front-end)",
    label: "FRONT-END",
  },
  "inovacao-gestao": {
    color: "var(--color-search-category-inovacao-gestao)",
    label: "INOVAÇÃO & GESTÃO",
  },
  "inteligencia-artificial": {
    color: "var(--color-search-category-inteligencia-artificial)",
    label: "INTELIGÊNCIA ARTIFICIAL",
  },
  mobile: {
    color: "var(--color-search-category-mobile)",
    label: "MOBILE",
  },
  programacao: {
    color: "var(--color-search-category-programacao)",
    label: "PROGRAMAÇÃO",
  },
  "design-ux": {
    color: "var(--color-search-category-ux-design)",
    label: "UX & DESIGN",
  },
} as const;

const DEFAULT_CATEGORY_PRESENTATION = {
  color: "var(--color-feedback-info-default)",
  label: "",
} as const;

const TYPE_LABEL = {
  career_path: "Carreira",
  course: "Curso",
  degree: "Trilha Alura",
  article: "Artigo",
  "extra_content-alura-mais": "Vídeos Extras",
} as const;

const PODCAST_TYPES = new Set([
  "hipsterstech",
  "likeaboss",
  "scubadev",
  "layerstech",
  "carreirasemfronteiras",
  "devsemfronteiras",
  "mesadeproduto",
  "bolhadev",
  "fiapcast",
  "decode",
  "iasobcontrole",
  "hipsterstalks",
]);

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function removeExtraContentPrefix(type: string) {
  return normalize(type).replace(/^extra_content-/, "");
}

function hasOwn<T extends object>(object: T, key: PropertyKey): key is keyof T {
  return Object.hasOwn(object, key);
}

export function getCategoryPresentation(category: string) {
  const key = normalize(category);

  return hasOwn(CATEGORY_PRESENTATION, key)
    ? CATEGORY_PRESENTATION[key]
    : DEFAULT_CATEGORY_PRESENTATION;
}

export function isPodcastType(type: string) {
  return PODCAST_TYPES.has(removeExtraContentPrefix(type));
}

export function getTypeLabel(type: string) {
  const key = normalize(type);

  if (hasOwn(TYPE_LABEL, key)) {
    return TYPE_LABEL[key];
  }

  if (isPodcastType(type)) {
    return "Podcast";
  }

  return type;
}
