export interface ConjugationEnding {
  person: string;
  ending: string;
}

export interface ConjugationGroup {
  conjugation: string; // e.g., "-AR (1ª Conjugação)", "-ER (2ª Conjugação)", "-IR (3ª Conjugação)"
  endings: ConjugationEnding[];
}

export interface VerbExample {
  sentence: string;
  explanation: string;
}

export interface VerbTenseInfo {
  id: string; // matches the store tense name/code mapping
  title: string;
  description: string;
  usage: string[];
  groups: ConjugationGroup[];
  examples: VerbExample[];
  observations: string[];
  traps?: string[];
  contestTips?: string[];
}
