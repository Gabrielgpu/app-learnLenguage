import { Clock, CheckCircle2, RotateCcw, History, TrendingUp, HelpCircle, GitBranch, LucideIcon } from "lucide-react";
import { VerbTenseLabel } from "./tenseMapping";

export interface TenseOption {
  id: VerbTenseLabel;
  title: string;
  description: string;
  example: string;
  icon: LucideIcon;
  color: string;
  shadow: string;
  border: string;
  selectedBorder: string;
}

export const TENSE_OPTIONS: TenseOption[] = [
  {
    id: "Presente do Indicativo",
    title: "Presente do Indicativo",
    description: "Ações habituais, verdades universais ou fatos ocorrendo no momento da fala.",
    example: "Ex: 'O cientista busca explicar...' ou 'Eu corro diariamente.'",
    icon: Clock,
    color: "from-blue-500 to-cyan-400 font-cyan",
    shadow: "shadow-cyan-500/10",
    border: "hover:border-cyan-500/30 border-dark-border",
    selectedBorder: "border-brand-blue ring-1 ring-brand-blue bg-brand-blue/5",
  },
  {
    id: "Pretérito Perfeito",
    title: "Pretérito Perfeito",
    description: "Ações totalmente concluídas e terminadas em um ponto definido do passado.",
    example: "Ex: 'Aprovou as diretrizes ontem à noite.' ou 'Nós propusemos a mudança.'",
    icon: CheckCircle2,
    color: "from-brand-purple to-purple-400",
    shadow: "shadow-brand-purple/10",
    border: "hover:border-brand-purple/30 border-dark-border",
    selectedBorder: "border-brand-purple ring-1 ring-brand-purple bg-brand-purple/5",
  },
  {
    id: "Pretérito Imperfeito",
    title: "Pretérito Imperfeito",
    description: "Processos frequentes, contínuos ou habituais no passado, indicando duração.",
    example: "Ex: 'Antigamente nós visitávamos...' ou 'O relógio batia as horas.'",
    icon: RotateCcw,
    color: "from-pink-500 to-rose-400",
    shadow: "shadow-rose-500/10",
    border: "hover:border-rose-500/30 border-dark-border",
    selectedBorder: "border-rose-500 ring-1 ring-rose-500 bg-rose-500/5",
  },
  {
    id: "Pretérito Mais-que-perfeito",
    title: "Pretérito Mais-que-perfeito",
    description: "Expressa uma ação concluída antes de outra ação também ocorrida no passado.",
    example: "Ex: 'Quando cheguei, ela já partira.' ou 'O juiz declarara encerrada a sessão.'",
    icon: History,
    color: "from-amber-500 to-orange-400",
    shadow: "shadow-orange-500/10",
    border: "hover:border-orange-500/30 border-dark-border",
    selectedBorder: "border-orange-500 ring-1 ring-orange-500 bg-orange-500/5",
  },
  {
    id: "Futuro do Presente",
    title: "Futuro do Presente",
    description: "Expressa uma ação que ocorrerá posteriormente ao momento atual.",
    example: "Ex: 'Amanhã eu estudarei.' ou 'Eles viajarão nas férias.'",
    icon: TrendingUp,
    color: "from-emerald-500 to-green-400",
    shadow: "shadow-emerald-500/10",
    border: "hover:border-emerald-500/30 border-dark-border",
    selectedBorder: "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-500/5",
  },
  {
    id: "Futuro do Pretérito",
    title: "Futuro do Pretérito",
    description: "Expressa hipótese, condição ou um fato futuro em relação a um momento passado.",
    example: "Ex: 'Ele disse que viajaria.' ou 'Eu gostaria de fazer uma pergunta.'",
    icon: HelpCircle,
    color: "from-indigo-500 to-violet-400",
    shadow: "shadow-indigo-500/10",
    border: "hover:border-indigo-500/30 border-dark-border",
    selectedBorder: "border-indigo-500 ring-1 ring-indigo-500 bg-indigo-500/5",
  },
  {
    id: "Futuro do Subjuntivo",
    title: "Futuro do Subjuntivo",
    description: "Expressa possibilidade ou condição relacionada ao futuro.",
    example: "Ex: 'Quando ele vier, conversaremos.' ou 'Se chover, cancelaremos o passeio.'",
    icon: GitBranch,
    color: "from-teal-500 to-sky-400",
    shadow: "shadow-teal-500/10",
    border: "hover:border-teal-500/30 border-dark-border",
    selectedBorder: "border-teal-500 ring-1 ring-teal-500 bg-teal-500/5",
  },
];

export const ALL_TENSE_IDS: VerbTenseLabel[] = TENSE_OPTIONS.map((o) => o.id);
