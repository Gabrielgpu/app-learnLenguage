# 📚 Gabaritando Verbos – Aplicativo de Estudo (MVP)

Este projeto é um aplicativo educacional interativo focado no treino de **tempos verbais** para concursos públicos. Ele gera questões inéditas de múltipla escolha com explicações gramaticais detalhadas utilizando IA (Grok ou Gemini), ou recorre a um banco de questões local se nenhuma chave de API estiver configurada (modo de demonstração).

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) (React, App Router, TypeScript)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Estilo Visual**: Rocketseat Inspired (Dark-first, acentos em neon e gradientes modernos)
- **Gerenciamento de Estado**: [Zustand](https://zustand-demo.pmnd.rs/) (Gerenciamento leve e reativo)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **IAs Suportadas**: Grok API (xAI), Gemini API (Google AI Studio) & OpenAI API

---

## 🚀 Como Iniciar o Projeto

### 1. Instalar as Dependências

No diretório raiz do projeto, execute:
```bash
npm install
```

### 2. Rodar em Ambiente de Desenvolvimento

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o aplicativo em execução.

### 3. Gerar Build de Produção

Para validar e gerar a build otimizada de produção:
```bash
npm run build
```

---

## 🔑 Configuração de Chaves de API

Você pode usar o aplicativo de duas formas:

### Opção A: Pela Interface do Usuário (Recomendado)
1. No cabeçalho da página, clique no botão **APIs**.
2. Digite sua chave da **Grok (xAI) API** ou da **Gemini API**.
3. Clique em **Salvar**. A chave será armazenada de forma segura e localmente no `localStorage` do seu navegador e enviada apenas para as requisições de backend da aplicação.

### Opção B: Por Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto e configure as chaves:
```env
# Chave da API Grok / xAI
GROK_API_KEY=sua_chave_grok_aqui
# OU
XAI_API_KEY=sua_chave_grok_aqui

# Chave da API Gemini
GEMINI_API_KEY=sua_chave_gemini_aqui
```

> [!NOTE]
> Se nenhuma chave for fornecida na interface ou no arquivo `.env.local`, o aplicativo entrará automaticamente no **Modo Demo (Local)**. Esse modo utiliza uma coleção de questões pré-definidas no estilo das bancas VUNESP, FGV e CEBRASPE, garantindo que o app funcione instantaneamente sem qualquer configuração!

---

## 🔀 Modos de Estudo e Uso de IA

O app tem 5 modos de estudo, cada um com sua própria rota:

- **Quiz** (`/quiz`), **Conjugação Prática** (`/conjugacao`) e **Complete a Frase** (`/complete-frase`) geram e corrigem exercícios via IA (Grok/Gemini/OpenAI, conforme a chave configurada), com fallback automático para um banco de questões local quando não há chave configurada ou a chamada falha.
- **Correlação Verbal** (`/correlacao-verbal`) usa exclusivamente um banco de questões local — não faz nenhuma chamada de IA, mesmo com chaves configuradas.
- **Revisão** (`/revisao`) é um painel de referência/consulta de conjugações, também 100% local.

Essa divergência entre modos é conhecida; unificar os demais modos para o mesmo modelo 100% local é uma decisão de produto em aberto para um ciclo futuro.

---

## 📂 Estrutura do Projeto

- [src/app/](file:///home/gabriel/app-learnLenguage/src/app/): rotas do App Router — uma pasta por modo de estudo (`quiz/`, `conjugacao/`, `complete-frase/`, `correlacao-verbal/`, `revisao/`), além das API routes em `api/`.
- [src/components/](file:///home/gabriel/app-learnLenguage/src/components/): componentes de UI, com uma subpasta por modo (`conjugation/`, `correlation/`, `fillblank/`, `review/`) e componentes compartilhados na raiz (`Header.tsx`, `SettingsModal.tsx`, `TenseSelector.tsx`, `ScoreRing.tsx`, `FeedbackPanel.tsx`, etc.).
- [src/lib/](file:///home/gabriel/app-learnLenguage/src/lib/): stores Zustand, tipos e bancos de questões por modo (ex. `conjugationStore.ts`/`conjugationTypes.ts`, `correlationQuestions.ts`).
- [src/data/](file:///home/gabriel/app-learnLenguage/src/data/): dados de referência de conjugação verbal por tempo, usados no painel de Revisão.

---

## 🎯 Critérios de Sucesso Atendidos

1. **Tempo de Resposta Rápido**: Geração otimizada questão a questão, reduzindo o tempo de carregamento da primeira pergunta para menos de 2s.
2. **Sem Login Necessário**: Totalmente acessível e pronto para usar imediatamente.
3. **Validação Gramatical Rigorosa**: O prompt estruturado assegura respostas JSON válidas e de nível intermediário/avançado compatíveis com as bancas de concurso sugeridas.
4. **UX Premium e Minimalista**: Visual dark-first com transições suaves e cores vibrantes inspiradas no ecossistema Rocketseat.
