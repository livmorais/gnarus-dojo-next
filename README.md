# Gnarus Immersion Next.js

Projeto em `Next.js` com `App Router`, `React`, `TypeScript`, `Tailwind CSS` e `Biome`, usado como base para telas de dashboard e evolução de um Design System interno.

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Biome`
- `json-server` para API mock

## Requisitos

- `Node.js >= 24`
- `npm >= 11.10.1`

## Como rodar

Instale as dependências:

```bash
npm install
```

Suba o projeto:

```bash
npm run dev
```

Aplicação web:

- `http://localhost:3000`

## Scripts

- `npm run dev`: sobe o app em modo desenvolvimento
- `npm run build`: gera o build de produção
- `npm run start`: sobe o build gerado
- `npm run lint`: roda o Biome
- `npm run format`: formata o código com Biome
- `npm run api`: sobe a API mock com `json-server` na porta `3001`

## Estrutura principal

```text
src/
  app/
    dashboard/        # rotas principais da aplicação
    ds/               # showcase do Design System
  components/
    ds/               # componentes reutilizáveis do Design System
  lib/
    cn.ts             # merge de classes Tailwind
    ds-navigation.ts  # source of truth da navegação do DS
db.json               # base da API mock
```

## Uso da API

O projeto possui uma API mock local via `json-server`.

Para subir a API:

```bash
npm run api
```

Base URL:

```text
http://localhost:3001
```

Recursos disponíveis hoje em `db.json`:

- `GET /tasks`
- `GET /courses`

Exemplos:

```bash
curl http://localhost:3001/tasks
curl http://localhost:3001/courses
```

Exemplo com `fetch`:

```ts
const response = await fetch("http://localhost:3001/tasks");
const tasks = await response.json();
```

### Quando usar a API mock

- Prototipar telas sem depender de backend real
- Validar estados de loading, vazio e sucesso
- Evoluir contratos de dados antes da integração final

### Como adicionar novos dados

Edite o arquivo [db.json](/home/tassinari/proj/gnarus-immersion-nextjs/db.json:1) e inclua novas coleções ou registros. O `json-server` expõe automaticamente os novos endpoints a partir das chaves raiz do arquivo.

Exemplo:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Finalizar layout",
      "status": "pending"
    }
  ]
}
```

Isso passa a expor `GET /tasks`, `GET /tasks/1`, `POST /tasks`, `PUT /tasks/1` e `DELETE /tasks/1`.

## Uso do Design System

Os componentes do Design System vivem em:

```text
src/components/ds
```

Os showcases ficam em:

```text
src/app/ds
```

Rota de navegação do DS no navegador:

```text
/ds
```

O índice de componentes é centralizado em [src/lib/ds-navigation.ts](/home/tassinari/proj/gnarus-immersion-nextjs/src/lib/ds-navigation.ts:1). Sempre que um componente novo for criado, ele deve ser listado ali para aparecer na sidebar do showcase.

### Como consumir componentes do DS

Exemplo de import:

```tsx
import { ButtonRoot, ButtonLabel } from "@/components/ds/button";
```

Exemplo de uso:

```tsx
<ButtonRoot>
  <ButtonLabel>Salvar</ButtonLabel>
</ButtonRoot>
```

Outro exemplo:

```tsx
import { Avatar } from "@/components/ds/avatar";

<Avatar imageLink="" initials="BT" size="md" />;
```

### Fluxo para criar ou alterar um componente DS

1. Criar ou atualizar o componente em `src/components/ds`
2. Adicionar o item em `src/lib/ds-navigation.ts`
3. Criar ou atualizar a página de showcase em `src/app/ds/<componente>/page.tsx`
4. Garantir estados principais, acessibilidade e exemplos de uso

### Regras importantes do DS

- Prefira composição por subcomponentes quando fizer sentido
- Use `cn` para merge de classes
- Use tokens e estilos já existentes antes de introduzir novos valores
- Componentes interativos devem ser acessíveis por teclado
- `Link` de `next/link` deve usar `prefetch={false}`

## Qualidade

Antes de commit:

```bash
npm run lint
```

Validações recomendadas:

```bash
npm run build
```

## Observações

- O projeto usa SVGs como componentes via `@svgr/webpack`
- Há uma rota dedicada para showcase e validação visual dos componentes do DS
- A API atual é local e voltada para desenvolvimento e prototipação
