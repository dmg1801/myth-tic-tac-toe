export type LoreText = {
  title: string;
  subtitle: string;
  mythology: string;
  archaeology: string;
};

export const loreEntriesEN: Record<string, LoreText> = {
  zeus: {
    title: 'ZEUS',
    subtitle: 'KING OF THE GODS',
    mythology:
      'Prototype entry. This area is ready for the complete mythological and historical text about Zeus.',
    archaeology:
      'This area is reserved for the archaeological object, its chronology, provenance, interpretation and museum context.',
  },
  thor: {
    title: 'THOR',
    subtitle: 'GOD OF THUNDER',
    mythology:
      'Prototype entry. This area is ready for the complete mythological and historical text about Thor.',
    archaeology:
      'This area is reserved for the archaeological object, its chronology, provenance, interpretation and museum context.',
  },
};
