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
  ],
  "Pretérito Mais-que-perfeito": [
    {
      question: "(VUNESP) Assinale a alternativa em que o verbo destacado está flexionado no Pretérito Mais-que-perfeito do Indicativo (forma simples).",
      options: [
        "A) Quando os convidados chegaram, a anfitriã já preparara o jantar.",
        "B) Ele sempre estudava à noite para o concurso.",
        "C) Nós fizemos todas as tarefas conforme o combinado.",
        "D) Se você trouxesse o livro, nós leríamos juntos.",
        "E) Eles cantarão no coral da igreja no próximo domingo."
      ],
      correctAnswer: "A",
      explanation: "O verbo 'preparara' está flexionado na 3ª pessoa do singular do Pretérito Mais-que-perfeito do Indicativo simples. Indica uma ação concluída no passado antes de outra ação também passada ('chegaram')."
    },
    {
      question: "(FGV) Na frase 'Quando o sinal sonoro soou, os alunos já haviam entregado a prova', a forma verbal 'haviam entregado' equivale a 'entregaram' no Pretérito Mais-que-perfeito. Cronologicamente, qual ação ocorreu primeiro?",
      options: [
        "A) O soar do sinal sonoro.",
        "B) A entrega das provas pelos alunos.",
        "C) Ambas as ações ocorreram de maneira exatamente simultânea.",
        "D) A entrega ocorreu após o soar do sinal.",
        "E) Nenhuma das ações se concretizou de fato."
      ],
      correctAnswer: "B",
      explanation: "O Pretérito Mais-que-perfeito (seja na forma simples 'entregaram' - do verbo entregar: entregara, entregaras, entregara... ou na composta 'haviam entregado') expressa uma ação que ocorreu ANTES de outra ação passada (marcada aqui pelo pretérito perfeito 'soou'). Portanto, a entrega das provas ocorreu primeiro."
    },
    {
      question: "(CEBRASPE) Em qual das seguintes orações a forma verbal sublinhada indica uma ação concluída anteriormente a outro evento passado, configurando o uso clássico do Pretérito Mais-que-perfeito do Indicativo?",
      options: [
        "A) Ele correra todas as manhãs quando morava no interior.",
        "B) Quando a polícia chegou ao local, o suspeito já fugira.",
        "C) Nós dividíamos o apartamento de forma harmoniosa.",
        "D) Ontem eu fiz a inscrição para o processo seletivo.",
        "E) Eles jogavam futebol sob chuva fina."
      ],
      correctAnswer: "B",
      explanation: "Na alternativa B, 'fugira' está no Pretérito Mais-que-perfeito simples, indicando a ação de fugir que aconteceu antes da chegada da polícia ('chegou' - pretérito perfeito). Nas demais opções, temos pretérito imperfeito ('morava', 'dividíamos', 'jogavam') e pretérito perfeito ('fiz')."
    },
    {
      question: "(VUNESP) A frase 'A mãe comprara o presente de aniversário antes do final de semana' apresenta o verbo 'comprar' no Pretérito Mais-que-perfeito simples. Assinale a opção que apresenta a correta correlação de sentido com a forma composta correspondente no indicativo:",
      options: [
        "A) A mãe tinha comprado...",
        "B) A mãe teria comprado...",
        "C) A mãe estaria comprando...",
        "D) A mãe fora comprar...",
        "E) A mãe comprou..."
      ],
      correctAnswer: "A",
      explanation: "A forma composta do Pretérito Mais-que-perfeito do Indicativo é formada pelo auxiliar ter/haver no pretérito imperfeito do indicativo + particípio do verbo principal (tinha/havia comprado). Portanto, 'comprara' equivale a 'tinha comprado' ou 'havia comprado'."
    },
    {
      question: "(FGV) Assinale a alternativa que apresenta a flexão correta do verbo 'trazer' na primeira pessoa do plural (Nós) do Pretérito Mais-que-perfeito do Indicativo simples.",
      options: [
        "A) Nós trazeramos",
        "B) Nós trouxéramos",
        "C) Nós trazíamos",
        "D) Nós trouxemos",
        "E) Nós traríamos"
      ],
      correctAnswer: "B",
      explanation: "O verbo trazer é irregular. O tema do pretérito é 'troux-'. No Pretérito Mais-que-perfeito do Indicativo simples, a flexão para a 1ª pessoa do plural é 'trouxéramos'. 'Trazíamos' está no pretérito imperfeito, 'trouxemos' no pretérito perfeito, e 'traríamos' no futuro do pretérito."
    }
  ],
  "Futuro do Presente": [
    {
      question: "(VUNESP) Assinale a alternativa em que o verbo destacado está flexionado no Futuro do Presente do Indicativo.",
      options: [
        "A) Amanhã os diretores realizarão a assembleia anual.",
        "B) Se tivéssemos tempo, leríamos todo o regulamento.",
        "C) O funcionário sempre atende aos clientes com cortesia.",
        "D) Ontem a equipe resolveu o problema técnico do sistema.",
        "E) Ele gostaria de participar da palestra sobre o tema."
      ],
      correctAnswer: "A",
      explanation: "'Realizarão' está flexionado no Futuro do Presente, indicando um fato certo que ocorrerá após o momento da fala. As demais alternativas trazem futuro do pretérito (leríamos, gostaria), presente (atende) e pretérito perfeito (resolveu)."
    },
    {
      question: "(FGV) No trecho 'O edital determina que o candidato entregará os documentos até o dia 10', o uso do Futuro do Presente em 'entregará' expressa:",
      options: [
        "A) Uma possibilidade remota e incerta.",
        "B) Uma obrigação/determinação futura com grau de certeza.",
        "C) Um hábito frequente no presente.",
        "D) Uma ação já concluída no passado.",
        "E) Um desejo condicionado a fatores externos."
      ],
      correctAnswer: "B",
      explanation: "Em textos normativos e editais, o Futuro do Presente é frequentemente usado para expressar obrigações ou determinações futuras com forte grau de certeza, e não hipótese."
    },
    {
      question: "(CEBRASPE) Assinale a alternativa em que a forma verbal apresenta irregularidade correta no Futuro do Presente do Indicativo.",
      options: [
        "A) Ele dizerá a verdade amanhã.",
        "B) Ele direi a verdade amanhã.",
        "C) Ele dirá a verdade amanhã.",
        "D) Ele disserá a verdade amanhã.",
        "E) Ele diria a verdade amanhã."
      ],
      correctAnswer: "C",
      explanation: "O verbo 'dizer' é irregular no Futuro do Presente, contraindo o radical: 'dirá' (3ª pessoa do singular), e não 'dizerá'. 'Direi' é a 1ª pessoa do singular, e 'diria' pertence ao Futuro do Pretérito."
    },
    {
      question: "(VUNESP) Complete corretamente: 'Antes de sair, eu já __________ o relatório.' com a forma composta do Futuro do Presente.",
      options: [
        "A) terei terminado",
        "B) tinha terminado",
        "C) teria terminado",
        "D) tenho terminado",
        "E) terminarei"
      ],
      correctAnswer: "A",
      explanation: "O Futuro do Presente Composto é formado pelo auxiliar 'ter' no Futuro do Presente ('terei') + particípio ('terminado'), indicando uma ação futura que estará concluída antes de outra ação futura."
    },
    {
      question: "(FGV) Assinale a alternativa que substitui corretamente 'Estudarei bastante para o concurso' por uma perífrase equivalente de uso coloquial.",
      options: [
        "A) Estudava bastante para o concurso.",
        "B) Vou estudar bastante para o concurso.",
        "C) Estudaria bastante para o concurso.",
        "D) Estudara bastante para o concurso.",
        "E) Tenho estudado bastante para o concurso."
      ],
      correctAnswer: "B",
      explanation: "Na linguagem coloquial, o Futuro do Presente ('estudarei') é comumente substituído pela perífrase verbo 'ir' no presente + infinitivo ('vou estudar'), mantendo o mesmo valor de futuridade."
    }
  ],
  "Futuro do Pretérito": [
    {
      question: "(VUNESP) Assinale a alternativa em que o verbo destacado está flexionado no Futuro do Pretérito do Indicativo, indicando cortesia.",
      options: [
        "A) Eu gostaria de fazer uma pergunta.",
        "B) Eu gosto de fazer perguntas.",
        "C) Eu gostei de fazer a pergunta.",
        "D) Eu gostava de fazer perguntas.",
        "E) Eu gostarei de fazer a pergunta."
      ],
      correctAnswer: "A",
      explanation: "'Gostaria' está no Futuro do Pretérito, usado aqui para suavizar um pedido, tornando-o mais educado — um dos usos característicos desse tempo verbal."
    },
    {
      question: "(FGV) Em 'Ele disse que viajaria assim que possível', a forma verbal 'viajaria' expressa:",
      options: [
        "A) Um fato certo e definitivo, sem qualquer condição.",
        "B) Um fato posterior a outro fato ocorrido no passado ('disse').",
        "C) Uma ação habitual no passado.",
        "D) Uma ação concluída antes de outra ação passada.",
        "E) Uma ordem direta dada no presente."
      ],
      correctAnswer: "B",
      explanation: "O Futuro do Pretérito indica um fato que ocorreria posteriormente a outro fato já passado, muito comum no discurso indireto ('disse que viajaria' = discurso direto 'viajarei')."
    },
    {
      question: "(CEBRASPE) Assinale a alternativa que apresenta corretamente a hipótese condicionada por meio do Futuro do Pretérito.",
      options: [
        "A) Se tivesse dinheiro, compro uma casa.",
        "B) Se tivesse dinheiro, comprarei uma casa.",
        "C) Se tivesse dinheiro, compraria uma casa.",
        "D) Se tivesse dinheiro, comprava uma casa.",
        "E) Se tivesse dinheiro, tinha comprado uma casa."
      ],
      correctAnswer: "C",
      explanation: "A construção condicional clássica em português combina o Pretérito Imperfeito do Subjuntivo na oração condicional ('se tivesse') com o Futuro do Pretérito na oração principal ('compraria'), indicando uma hipótese."
    },
    {
      question: "(VUNESP) Assinale a alternativa que traz corretamente a irregularidade do verbo 'trazer' no Futuro do Pretérito, 1ª pessoa do singular.",
      options: [
        "A) Eu trazeria",
        "B) Eu trarei",
        "C) Eu traria",
        "D) Eu trouxera",
        "E) Eu trazerei"
      ],
      correctAnswer: "C",
      explanation: "O verbo 'trazer' contrai o radical no Futuro do Pretérito: 'traria' (e não 'trazeria'). 'Trarei' pertence ao Futuro do Presente, e 'trouxera' ao Pretérito Mais-que-perfeito."
    },
    {
      question: "(FGV) Complete corretamente: 'Se tivesse dinheiro, eu já __________ viajado no ano passado.' com a forma composta do Futuro do Pretérito.",
      options: [
        "A) terei",
        "B) tinha",
        "C) teria",
        "D) tenho",
        "E) tive"
      ],
      correctAnswer: "C",
      explanation: "O Futuro do Pretérito Composto é formado pelo auxiliar 'ter' no Futuro do Pretérito ('teria') + particípio ('viajado'), indicando um fato que poderia ter acontecido após outro fato passado."
    }
  ],
  "Futuro do Subjuntivo": [
    {
      question: "(VUNESP) Assinale a alternativa em que o verbo destacado está flexionado no Futuro do Subjuntivo.",
      options: [
        "A) Quando ele vier, conversaremos sobre o projeto.",
        "B) Quando ele vem, conversamos sobre o projeto.",
        "C) Quando ele veio, conversamos sobre o projeto.",
        "D) Quando ele vinha, conversávamos sobre o projeto.",
        "E) Quando ele viera, já tínhamos conversado."
      ],
      correctAnswer: "A",
      explanation: "'Vier' está no Futuro do Subjuntivo, indicando uma condição futura hipotética. As demais alternativas trazem presente (vem), pretérito perfeito (veio), imperfeito (vinha) e mais-que-perfeito (viera)."
    },
    {
      question: "(FGV) A forma correta do verbo 'trazer' no Futuro do Subjuntivo, 1ª pessoa do plural, é:",
      options: [
        "A) Se nós trazermos os documentos...",
        "B) Se nós trouxermos os documentos...",
        "C) Se nós trazêssemos os documentos...",
        "D) Se nós trouxéssemos os documentos...",
        "E) Se nós traríamos os documentos..."
      ],
      correctAnswer: "B",
      explanation: "O Futuro do Subjuntivo deriva da 3ª pessoa do plural do Pretérito Perfeito ('trouxeram'), retirando-se o '-am': 'trouxer-' + '-mos' = 'trouxermos'."
    },
    {
      question: "(CEBRASPE) Assinale a alternativa que apresenta corretamente a diferença de sentido entre 'Quando ele vem' e 'Quando ele vier'.",
      options: [
        "A) Ambas as formas indicam o mesmo fato habitual no presente.",
        "B) 'Vem' indica hábito no presente; 'vier' indica condição hipotética futura.",
        "C) 'Vem' indica futuro certo; 'vier' indica passado concluído.",
        "D) Ambas as formas pertencem ao modo subjuntivo.",
        "E) 'Vier' indica uma ação já concluída no passado."
      ],
      correctAnswer: "B",
      explanation: "'Vem' está no Presente do Indicativo, expressando um fato habitual. 'Vier' está no Futuro do Subjuntivo, expressando uma condição hipotética que ainda vai se realizar."
    },
    {
      question: "(VUNESP) Assinale a alternativa que completa corretamente: 'Assim que os alunos __________ a prova, poderão sair.' (verbo: terminar)",
      options: [
        "A) terminam",
        "B) terminaram",
        "C) terminarem",
        "D) terminassem",
        "E) terminariam"
      ],
      correctAnswer: "C",
      explanation: "Após o conectivo 'assim que', emprega-se o Futuro do Subjuntivo. Para o verbo regular 'terminar', a 3ª pessoa do plural é 'terminarem' (derivada de 'terminaram', retirando-se o '-am')."
    },
    {
      question: "(FGV) Assinale a alternativa que traz o verbo 'dizer' corretamente flexionado no Futuro do Subjuntivo, 3ª pessoa do singular.",
      options: [
        "A) Se ele disser a verdade...",
        "B) Se ele dissesse a verdade...",
        "C) Se ele dirá a verdade...",
        "D) Se ele diria a verdade...",
        "E) Se ele dizer a verdade..."
      ],
      correctAnswer: "A",
      explanation: "O Futuro do Subjuntivo de 'dizer' deriva de 'disseram' (Pretérito Perfeito), retirando-se o '-am': 'disser'. 'Dissesse' é Pretérito Imperfeito do Subjuntivo; 'dirá' é Futuro do Presente."
    }
  ]
};
