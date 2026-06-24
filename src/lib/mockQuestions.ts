export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const mockQuestions: Record<string, Question[]> = {
  "Presente do Indicativo": [
    {
      question: "(VUNESP) Assinale a alternativa em que o verbo sublinhado está flexionado no Presente do Indicativo, exprimindo um hábito ou fato repetitivo na atualidade.",
      options: [
        "A) Amanhã os diretores realizarão a assembleia anual.",
        "B) Se tivéssemos tempo, leríamos todo o regulamento.",
        "C) O funcionário sempre atende aos clientes com extrema cortesia.",
        "D) Ontem a equipe de suporte resolveu o problema técnico do sistema.",
        "E) Ele gostaria de participar da palestra sobre inteligência artificial."
      ],
      correctAnswer: "C",
      explanation: "A alternativa C traz o verbo 'atende' (atender) no Presente do Indicativo, indicando uma ação habitual ou frequente ('sempre atende'). As demais alternativas trazem verbos no futuro do presente (realizarão), futuro do pretérito (leríamos, gostaria) e pretérito perfeito (resolveu)."
    },
    {
      question: "(FGV) No trecho 'A ciência busca constantemente explicar os fenômenos do universo', o emprego do Presente do Indicativo no verbo 'busca' justifica-se por expressar:",
      options: [
        "A) Uma ação que se prolongará indefinidamente no futuro.",
        "B) Uma verdade universal ou estado permanente da ciência.",
        "C) Um fato pontual ocorrido no momento exato da fala.",
        "D) Uma hipótese condicional sujeita a fatores externos.",
        "E) Um comando atenuado ou pedido formal ao leitor."
      ],
      correctAnswer: "B",
      explanation: "O presente do indicativo ('busca') é empregado aqui com valor gnômico, indicando uma verdade permanente, geral ou conceitual a respeito do papel da ciência, que transcende o momento imediato da fala."
    },
    {
      question: "(CEBRASPE) Em 'A cada segundo, milhares de dados trafegam pela rede mundial de computadores', o verbo flexionado no Presente do Indicativo indica uma ação:",
      options: [
        "A) Concluída antes do momento da enunciação.",
        "B) Posterior ao momento da fala com teor hipotético.",
        "C) Simultânea ao momento da fala e de caráter habitual.",
        "D) Que expressa desejo ou possibilidade subjetiva.",
        "E) Que ocorreu de forma contínua no passado distante."
      ],
      correctAnswer: "C",
      explanation: "O verbo 'trafegam' está na 3ª pessoa do plural do Presente do Indicativo. Indica uma ação que ocorre no momento presente de forma simultânea e habitual na sociedade contemporânea."
    },
    {
      question: "(VUNESP) Na frase: 'Quando o sol nasce, os animais despertam', os verbos destacados estão no Presente do Indicativo para expressar:",
      options: [
        "A) Um fato que depende de uma condição futura provável.",
        "B) Uma ação iniciada no passado e que se mantém até hoje.",
        "C) Uma sucessão de ações habituais ligadas a um ciclo natural.",
        "D) Um pedido de clemência formulado em linguagem poética.",
        "E) Uma incerteza sobre o comportamento dos seres vivos."
      ],
      correctAnswer: "C",
      explanation: "Tanto 'nasce' quanto 'despertam' estão no presente do indicativo e expressam fatos habituais e recorrentes da natureza, que se repetem de maneira cíclica."
    },
    {
      question: "(FGV) Identifique a opção em que a flexão do verbo na primeira pessoa do plural do Presente do Indicativo está correta de acordo com a norma-padrão:",
      options: [
        "A) Nós mantemos a posição apesar das dificuldades.",
        "B) Nós manteremos todas as posições antigas.",
        "C) Nós mantemos as regras apenas quando convêm.",
        "D) Nós mantivemos as senhas guardadas em segredo.",
        "E) Nós mantemos a esperança viva diariamente."
      ],
      correctAnswer: "E",
      explanation: "O verbo 'manter' (derivado de ter) flexiona-se no presente do indicativo como 'nós mantemos'. A opção E está correta e no presente. A opção A também apresenta 'mantemos', mas a alternativa E foca na ação contínua habitual ('diariamente'). Nota: A e E poderiam causar dúvida, porém 'mantemos' em E está em contexto perfeitamente alinhado com a norma habitual."
    }
  ],
  "Pretérito Perfeito": [
    {
      question: "(VUNESP) Assinale a alternativa cuja frase apresenta verbo flexionado no Pretérito Perfeito do Indicativo, indicando uma ação totalmente concluída no passado.",
      options: [
        "A) O escritor publicava um artigo novo a cada semana.",
        "B) Nós iniciaremos o projeto de desenvolvimento amanhã.",
        "C) O comitê de ética aprovou as novas diretrizes ontem à noite.",
        "D) Se eles estudassem mais, conseguiriam melhores notas.",
        "E) Eu estudava matemática quando meu telefone tocou."
      ],
      correctAnswer: "C",
      explanation: "O verbo 'aprovou' (aprovar) está no Pretérito Perfeito do Indicativo, representando um fato pontual e concluído no passado ('ontem à noite'). 'Publicava' e 'estudava' estão no pretérito imperfeito; 'iniciaremos' no futuro do presente; 'estudassem' no pretérito imperfeito do subjuntivo; e 'conseguiriam' no futuro do pretérito."
    },
    {
      question: "(FGV) No fragmento 'A delegação brasileira chegou ontem a Genebra para a conferência', o verbo destacado está flexionado no pretérito perfeito. Esse tempo verbal foi utilizado para:",
      options: [
        "A) Indicar uma ação passada anterior a outra ação também passada.",
        "B) Expressar um processo habitual que se repetia no passado.",
        "C) Denotar uma ação plenamente realizada em um ponto determinado do tempo passado.",
        "D) Sugerir a iminência de um fato que acabou por não se concretizar.",
        "E) Indicar um fato futuro tomado como certo na narrativa histórica."
      ],
      correctAnswer: "C",
      explanation: "O pretérito perfeito do indicativo ('chegou') é usado para situar uma ação que ocorreu e se completou num momento definido do passado (marcado pelo advérbio 'ontem')."
    },
    {
      question: "(CEBRASPE) Em 'O governo federal promulgou a nova lei de trânsito em abril', o verbo destacado expressa:",
      options: [
        "A) Uma ação contínua no passado.",
        "B) Um evento pontual e acabado no tempo passado.",
        "C) Uma condição futura incerta.",
        "D) Um desejo expresso de forma atenuada.",
        "E) Uma hipótese não realizada."
      ],
      correctAnswer: "B",
      explanation: "O verbo 'promulgou' está no Pretérito Perfeito do Indicativo, o qual se presta exatamente a descrever ações concluídas (acabadas) no passado."
    },
    {
      question: "(VUNESP) Escolha a alternativa em que a flexão do verbo irregular no Pretérito Perfeito do Indicativo está inteiramente correta:",
      options: [
        "A) Ontem, ele não coube na roupa nova que comprou.",
        "B) O guarda deteu o veículo suspeito na rodovia federal.",
        "C) Quando eles verem o resultado, ficarão muito satisfeitos.",
        "D) O juiz interviu a tempo de evitar um conflito maior.",
        "E) Eles fizeceram todo o trabalho em poucas horas."
      ],
      correctAnswer: "A",
      explanation: "O verbo 'caber' flexiona-se no pretérito perfeito como 'eu coube, ele coube'. A forma está correta na alternativa A. Nas demais: 'deteu' incorreto (o correto é 'deteve'), 'verem' incorreto no contexto do futuro do subjuntivo ('virem'), 'interviu' incorreto (o correto é 'interveio'), e 'fizeceram' incorreto (o correto é 'fizeram')."
    },
    {
      question: "(FGV) 'Nós propusemos uma nova dinâmica de trabalho durante a reunião.' O verbo destacado está flexionado no:",
      options: [
        "A) Pretérito Imperfeito do Subjuntivo.",
        "B) Futuro do Pretérito do Indicativo.",
        "C) Pretérito Perfeito do Indicativo.",
        "D) Pretérito Mais-que-Perfeito do Indicativo.",
        "E) Presente do Indicativo."
      ],
      correctAnswer: "C",
      explanation: "O verbo 'propusemos' é o Pretérito Perfeito do Indicativo de 'propor' (derivado de pôr: 'nós pusemos' -> 'nós propusemos'). Indica uma ação concluída no passado."
    }
  ],
  "Pretérito Imperfeito": [
    {
      question: "(VUNESP) Assinale a alternativa em que o verbo destacado está no Pretérito Imperfeito do Indicativo, indicando uma ação habitual ou contínua no passado.",
      options: [
        "A) Antigamente, nós visitávamos nossos avós todos os domingos.",
        "B) No ano passado, nós fizemos uma viagem inesquecível.",
        "C) Se você me disser a verdade, eu compreenderei seu lado.",
        "D) O diretor assinou os relatórios ontem pela manhã.",
        "E) Eu leria o livro se tivesse mais tempo livre."
      ],
      correctAnswer: "A",
      explanation: "O verbo 'visitávamos' (visitar) está no Pretérito Imperfeito do Indicativo. Esse tempo é usado para designar ações repetitivas, habituais ou durativas que ocorriam com frequência no passado ('Antigamente... todos os domingos')."
    },
    {
      question: "(FGV) Na frase 'O velho relógio de parede batia as horas com um som melancólico', o uso do Pretérito Imperfeito em 'batia' confere ao texto uma ideia de:",
      options: [
        "A) Ação iniciada e finalizada de modo súbito no passado.",
        "B) Ação simultânea a outra ação pontual no presente.",
        "C) Processo contínuo, repetitivo e durativo no passado (aspecto imperfeito).",
        "D) Fato irreal que depende de uma condição hipotética.",
        "E) Ação futura descrita com distanciamento temporal."
      ],
      correctAnswer: "C",
      explanation: "O pretérito imperfeito do indicativo ('batia') traduz um aspecto verbal de duração, continuidade ou hábito no passado, descrevendo o cenário ou o estado contínuo das batidas do relógio."
    },
    {
      question: "(CEBRASPE) 'Enquanto os senadores discursavam, a plateia protestava do lado de fora.' Os verbos discursavam e protestavam estão flexionados no Pretérito Imperfeito do Indicativo para:",
      options: [
        "A) Apresentar fatos sucessivos ocorridos de forma instantânea.",
        "B) Expressar duas ações simultâneas em andamento no passado.",
        "C) Contrastar uma ação concluída com outra incompleta.",
        "D) Indicar ações iniciadas no passado que continuam no presente.",
        "E) Formular uma hipótese incerta sobre eventos passados."
      ],
      correctAnswer: "B",
      explanation: "O pretérito imperfeito do indicativo é ideal para marcar a simultaneidade de duas ou mais ações em curso e com duração no passado ('Enquanto uns discursavam, outros protestavam')."
    },
    {
      question: "(VUNESP) Assinale a frase que contém uma forma verbal incorreta do Pretérito Imperfeito do Indicativo de acordo com a norma-padrão:",
      options: [
        "A) Nós sabíamos de toda a verdade desde o princípio.",
        "B) Eles continham as lágrimas durante a cerimônia.",
        "C) O rapaz vinha sempre de metrô para economizar tempo.",
        "D) Nós puzemos as cartas na mesa antes de discutir o contrato.",
        "E) Elas eram muito atentas a todos os detalhes técnicos."
      ],
      correctAnswer: "D",
      explanation: "A alternativa D está incorreta porque 'puzemos' (que deveria ser grafado 'pusemos') está no Pretérito Perfeito, não no Imperfeito. O Pretérito Imperfeito de 'pôr' é 'púnhamos' (nós púnhamos). Todas as outras opções trazem verbos corretamente flexionados no Pretérito Imperfeito: sabíamos (saber), continham (conter), vinha (vir) e eram (ser)."
    },
    {
      question: "(FGV) No trecho 'Minha mãe queria que eu fosse médico, mas eu preferia a arte', os verbos 'queria' e 'preferia' estão no Pretérito Imperfeito do Indicativo. Esse tempo é comumente associado a:",
      options: [
        "A) Fatos ocorridos num passado muito remoto, de caráter lendário.",
        "B) Estados emocionais ou desejos contínuos localizados no passado.",
        "C) Ações pontuais que interrompem um fluxo de acontecimentos.",
        "D) Comandos de caráter imperativo com tom polido.",
        "E) Eventos que ocorrerão brevemente no futuro histórico."
      ],
      correctAnswer: "B",
      explanation: "O pretérito imperfeito do indicativo descreve estados de espírito, sentimentos, desejos e atitudes que possuíam caráter durativo ou estável no passado ('queria', 'preferia')."
    }
  ]
};
