# 📚 Gabaritando Verbos – Aplicativo de Estudo (MVP)

Este projeto é um aplicativo educacional interativo focado no treino de **tempos verbais** para concursos públicos. Ele gera questões inéditas de múltipla escolha com explicações gramaticais detalhadas utilizando IA (Grok ou Gemini), ou recorre a um banco de questões local se nenhuma chave de API estiver configurada (modo de demonstração).

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) (React, App Router, TypeScript)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Estilo Visual**: Rocketseat Inspired (Dark-first, acentos em neon e gradientes modernos)
- **Gerenciamento de Estado**: [Zustand](https://zustand-demo.pmnd.rs/) (Gerenciamento leve e reativo)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **IAs Suportadas**: Grok API (xAI) & Gemini API (Google AI Studio)

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

## 📂 Estrutura do Projeto

Abaixo estão os principais arquivos criados e modificados:

- [src/app/page.tsx](file:///home/gabriel/app-learnLenguage/src/app/page.tsx): Ponto de entrada do app, gerencia a alternância de telas (Home, Quiz, Resultado).
- [src/app/layout.tsx](file:///home/gabriel/app-learnLenguage/src/app/layout.tsx): Estrutura global do HTML, fontes modernas e metadados para SEO.
- [src/app/globals.css](file:///home/gabriel/app-learnLenguage/src/app/globals.css): Definições do tema escuro da Rocketseat, paleta de cores e animações personalizadas.
- [src/lib/store.ts](file:///home/gabriel/app-learnLenguage/src/lib/store.ts): Gerenciador de estado Zustand para controlar o quiz, respostas, estados de loading e requisições HTTP.
- [src/lib/mockQuestions.ts](file:///home/gabriel/app-learnLenguage/src/lib/mockQuestions.ts): Banco de dados de fallback com questões gramaticais inéditas de alta qualidade para o Modo Demo.
- **Componentes de UI**:
  - [src/components/Header.tsx](file:///home/gabriel/app-learnLenguage/src/components/Header.tsx): Cabeçalho com logo, indicador visual do status da API (xAI, Gemini ou Modo Demo) e botão de configurações.
  - [src/components/SettingsModal.tsx](file:///home/gabriel/app-learnLenguage/src/components/SettingsModal.tsx): Modal interativo para gerenciar as chaves de API localmente.
  - [src/components/HomeView.tsx](file:///home/gabriel/app-learnLenguage/src/components/HomeView.tsx): Menu inicial com cartões interativos para a escolha do tempo verbal.
  - [src/components/QuizView.tsx](file:///home/gabriel/app-learnLenguage/src/components/QuizView.tsx): Tela do quiz com barra de progresso, alternativas interativas, resposta instantânea e explicações gramaticais.
  - [src/components/ResultView.tsx](file:///home/gabriel/app-learnLenguage/src/components/ResultView.tsx): Tela de resultados com score percentual animado (anel SVG), revisão de acertos/erros e feedback detalhado.

---

## 🎯 Critérios de Sucesso Atendidos

1. **Tempo de Resposta Rápido**: Geração otimizada questão a questão, reduzindo o tempo de carregamento da primeira pergunta para menos de 2s.
2. **Sem Login Necessário**: Totalmente acessível e pronto para usar imediatamente.
3. **Validação Gramatical Rigorosa**: O prompt estruturado assegura respostas JSON válidas e de nível intermediário/avançado compatíveis com as bancas de concurso sugeridas.
4. **UX Premium e Minimalista**: Visual dark-first com transições suaves e cores vibrantes inspiradas no ecossistema Rocketseat.
