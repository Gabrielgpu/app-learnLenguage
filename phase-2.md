Painel de Revisão das Conjugações
Objetivo

Disponibilizar uma área de consulta rápida contendo o resumo das conjugações dos tempos verbais estudados.

O objetivo é permitir que o usuário relembre a estrutura de conjugação antes ou durante a realização dos exercícios, sem precisar sair da aplicação.
Localização

O painel deverá estar disponível em dois pontos da aplicação:
Home

Ao selecionar um tempo verbal, o usuário poderá visualizar a conjugação correspondente.
Durante o Simulado

O usuário poderá abrir um painel lateral (Drawer) ou modal para consultar a conjugação sem perder a questão atual.
Conteúdo

Cada tempo verbal possuirá sua própria ficha de estudo.

Exemplo:
Pretérito Perfeito do Indicativo

Descrição

    Utilizado para indicar ações concluídas em um momento específico do passado.

1ª Conjugação (-AR)
Pessoa | Terminação -- | -- Eu | radical + ei Tu | radical + aste Ele/Ela | radical + ou Nós | radical + amos Vós | radical + astes Eles/Elas | radical + aram
Conteúdo Adicional

Cada painel poderá apresentar também:

    Definição do tempo verbal.

    Quando utilizar.

    Principais pegadinhas de concursos.

    Exemplos de frases.

    Observações sobre verbos irregulares.

Arquitetura

As conjugações não serão geradas pela IA.

Elas serão armazenadas localmente no projeto.

Exemplo:

/frontend

src/

├── data/
│      presente.ts
│      preterito-perfeito.ts
│      preterito-imperfeito.ts
│
├── components/
│      VerbReferenceCard.tsx
│      VerbReferenceDrawer.tsx

Cada arquivo exportará um objeto contendo:

    título;

    descrição;

    tabelas de conjugação;

    exemplos;

    observações.

Exemplo de Estrutura

{
"id": "preterito-perfeito",
"title": "Pretérito Perfeito do Indicativo",
"description": "Expressa ações concluídas no passado.",
"groups": [
{
"conjugation": "-AR",
"endings": [
{ "person": "Eu", "ending": "-ei" },
{ "person": "Tu", "ending": "-aste" },
{ "person": "Ele/Ela", "ending": "-ou" }
]
}
]
}

Experiência do Usuário

Durante o simulado haverá um botão fixo:

📖 Revisar Conjugação

Ao clicar:

    abre um painel lateral;

    exibe apenas os tempos verbais selecionados para o simulado;

    o usuário pode fechar o painel e continuar respondendo normalmente.

Critérios de Aceitação

    O painel pode ser acessado sem interromper o simulado.

    O conteúdo é carregado localmente, sem chamadas à IA.

    Cada tempo verbal possui sua própria ficha de revisão.

    O layout é responsivo para desktop e dispositivos móveis.

    O painel exibe tabelas, exemplos e observações de forma organizada.

Evoluções Futuras

    Pesquisa por verbo específico (ex.: "dispor", "prover", "intervir").

    Destaque para verbos irregulares e defectivos.

    Reprodução de áudio com explicação.

    Animações mostrando a formação das conjugações.

    Favoritar conteúdos para revisão rápida.

    Modo "Estudo", permitindo navegar entre todas as fichas de conjugação sem iniciar um simulado.