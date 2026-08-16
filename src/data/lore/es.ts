export type LoreText = {
  title: string;
  subtitle: string;
  mythology: string;
  archaeology: string;
};

export const loreEntriesES: Record<string, LoreText> = {
  zeus: {
    title: 'ZEUS',
    subtitle: 'REY DE LOS DIOSES',
    mythology:
      'Entrada de prototipo. Esta sección está preparada para incorporar el texto mitológico e histórico completo sobre Zeus.',
    archaeology:
      'Esta sección está reservada para la pieza arqueológica, su cronología, procedencia, interpretación y contexto museístico.',
  },
  thor: {
    title: 'THOR',
    subtitle: 'DIOS DEL TRUENO',
    mythology:
      'Entrada de prototipo. Esta sección está preparada para incorporar el texto mitológico e histórico completo sobre Thor.',
    archaeology:
      'Esta sección está reservada para la pieza arqueológica, su cronología, procedencia, interpretación y contexto museístico.',
  },
};
