export interface Lesson {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
}

export interface Audio {
  id: string;
  title: string;
  duration: string;
  fileUrl: string;
}

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'ebook' | 'sheet';
  cover: string;
  description: string;
  lessons?: Lesson[];
  assetSlots?: {
    ebookUrl?: string;
    sheetUrl?: string;
  };
}

export interface Bonus extends Module {
  audios?: Audio[];
}

export const modules: Module[] = [
  {
    id: "m1",
    title: "Introducción al Magnesio",
    type: "video",
    cover: "/INTRODUCTION TO.png",
    description: "Fundamentos, señales, absorción y práctica.",
    lessons: [
      { id: "m1l1", title: "Lección 1 — Qué es y por qué es esencial", youtubeId: "wnUesgUHXHo", duration: "12:00" },
      { id: "m1l2", title: "Lección 2 — Cómo identificar la deficiencia", youtubeId: "RM_WaeIMYLI", duration: "11:00" },
      { id: "m1l3", title: "Lección 3 — Absorción y cómo mejorarla", youtubeId: "YFVmQErZjH0", duration: "09:40" },
      { id: "m1l4", title: "Lección 4 — Fuentes alimentarias", youtubeId: "pKIgDbPc2mw", duration: "10:30" },
      { id: "m1l5", title: "Lección 5 — Errores que desperdician magnesio", youtubeId: "JEQAOVGzn28", duration: "08:55" },
      { id: "m1l6", title: "Lección 6 — Combinaciones que potencian", youtubeId: "-DcMH-42Qtw", duration: "09:10" }
    ]
  }
];

export const bonuses: Bonus[] = [
  {
    id: "b1",
    title: "Guía del Sueño (video)",
    type: "video",
    cover: "https://i.im.ge/2025/11/02/nHqSMK.8.png",
    description: "Higiene del sueño + rutina.",
    lessons: [
      { id: "b1l1", title: "Introducción al sueño", youtubeId: "_Fkc-tWE4xc", duration: "01:00" },
      { id: "b1l2", title: "Escucha el audio 1", youtubeId: "pAH5YXJFpE0", duration: "18:00" },
      { id: "b1l3", title: "Escucha el audio 2", youtubeId: "CAEyD8YrlK8", duration: "18:00" },
      { id: "b1l4", title: "Escucha el audio 3", youtubeId: "4wTi17rjHTA", duration: "18:00" },
      { id: "b1l5", title: "Escucha el audio 4", youtubeId: "B2pPApLLCUY", duration: "15:00" }
    ],
    audios: [
      { id: "a1", title: "Respiración Profunda", duration: "18:00", fileUrl: "" },
      { id: "a2", title: "Relajación Progresiva", duration: "18:00", fileUrl: "" },
      { id: "a3", title: "Visualización de la Naturaleza", duration: "18:00", fileUrl: "" },
      { id: "a4", title: "Afirmaciones Positivas", duration: "15:00", fileUrl: "" }
    ]
  },
  {
    id: "b2",
    title: "Hoja de Cálculo de Magnesio",
    type: "sheet",
    cover: "https://i.im.ge/2025/11/02/nHqdI9.9.png",
    description: "Google Sheets/Excel en línea.",
    assetSlots: { sheetUrl: "https://docs.google.com/spreadsheets/d/1PoWmdQycdHvRKpthIkheAeYP06We6hCwO94mnV3HquU/edit?usp=sharing" }
  },
  {
    id: "b3",
    title: "Guía Alimentaria",
    type: "ebook",
    cover: "https://i.im.ge/2025/11/02/nHq7dh.10.png",
    description: "PDF completo con porciones.",
    assetSlots: { ebookUrl: "" }
  },
  {
    id: "b4",
    title: "Guía de Infusiones",
    type: "ebook",
    cover: "https://i.im.ge/2025/11/02/nHqqxX.11.png",
    description: "Recetas y preparación.",
    assetSlots: { ebookUrl: "" }
  },
  {
    id: "b5",
    title: "Masterclass de Suplementos",
    type: "video",
    cover: "https://i.im.ge/2025/11/02/nHqsJ8.12.png",
    description: "Formas, dosis y seguridad.",
    lessons: [{ id: "b5l1", title: "Cómo elegir suplementos", youtubeId: "GgAIzjOhJFE", duration: "22:40" }]
  }
];

// Array that feeds the Home carousel
export const modulesUnified = [...modules, ...bonuses];