export type LoreText = {
  title: string;
  subtitle: string;
  mythology: string;
  archaeology: string;
  archaeologicalImage?: string;
};

export const loreEntriesES: Record<string, LoreText> = {
  zeus: {
    title: 'ZEUS',
    subtitle: 'REY DE LOS DIOSES',
    mythology:
      'Zeus fue el dios supremo del Olimpo, señor del trueno, el relámpago y el cielo. En la tradición griega, destronó a los Titanes y estableció el orden divino entre los dioses, además de ejercer como juez de mortales e inmortales.',
    archaeology:
      'La interpretación arqueológica de Zeus se apoya en el poder simbólico del trueno, los relámpagos, los cultos montañosos y los espacios sagrados asociados al culto olímpico. Su iconografía aparece en exvotos de bronce, escultura monumental y elementos del templo.',
    archaeologicalImage: '/assets/lore/zeus.jpg',
  },
  thor: {
    title: 'THOR',
    subtitle: 'DIOS DEL TRUENO',
    mythology:
      'Thor era hijo de Odín, defensor de Asgard y portador del martillo Mjölnir. Simbolizaba la fuerza, la protección y la justicia divina frente a gigantes, caos y poderes hostiles.',
    archaeology:
      'La comprensión arqueológica de Thor se construye a partir de la iconografía nórdica, tumbas de guerreros, objetos con simbología y el paisaje ritual del mundo escandinavo.',
    archaeologicalImage: '/assets/lore/thor.jpg',
  },
  hoplite: {
    title: 'HOPLITA',
    subtitle: 'GUERRERO DE LA GRECIA ANTIGUA',
    mythology:
      'El hoplita estaba en el centro de la guerra de la Grecia clásica: un soldado-ciudadano que luchaba en formación cerrada, escudo con escudo, con lanza y armadura pesada.',
    archaeology:
      'La guerra hoplita se reconstruye a partir de restos funerarios, panoplias, puntas de lanza y evidencia de cementerios que muestran la centralidad del combate en formación en la Grecia arcaica y clásica.',
    archaeologicalImage: '/assets/lore/hoplite.jpg',
  },
  athena: {
    title: 'ATENA',
    subtitle: 'DIOSA DE LA SABIDURÍA',
    mythology:
      'Atenea era la diosa de la sabiduría, la estrategia y la guerra disciplinada. Se asoció con la razón, la destreza y las virtudes cívicas de la ciudad-estado.',
    archaeology:
      'Atenea suele identificarse a través de exvotos, estatuillas de bronce y santuarios dedicados a su culto en Atenas y en el mundo griego.',
    archaeologicalImage: '/assets/lore/athena.jpg',
  },
  minotaur: {
    title: 'MINOTAURO',
    subtitle: 'BESTIA DEL LABERINTO',
    mythology:
      'El minotauro era una criatura monstruosa de Creta, mitad hombre y mitad toro, ligada al laberinto y a la prueba heroica de la edad mitológica.',
    archaeology:
      'Su simbolismo se lee a través de la iconografía del toro, la violencia ritual y la mitología de la cultura palacial del Egeo.',
    archaeologicalImage: '/assets/lore/minotaur.jpg',
  },
  aphrodite: {
    title: 'AFRODITA',
    subtitle: 'DIOSA DEL AMOR Y LA BELLEZA',
    mythology:
      'Afrodita surgió de la espuma del mar y se convirtió en la diosa del amor, la belleza, el deseo y el poder erótico. Su culto unía el amor con la devoción y el peligro.',
    archaeology:
      'La arqueología de Afrodita se relaciona con figurillas, objetos rituales y cultos domésticos centrados en la belleza, la fertilidad y la sacralidad del deseo.',
    archaeologicalImage: '/assets/lore/aphrodite.jpg',
  },
  hades: {
    title: 'HADES',
    subtitle: 'SEÑOR DEL INFRAMUNDO',
    mythology:
      'Hades gobernó el reino de los muertos tras la división del mundo entre los hijos de Cronos. Presidía la muerte, los difuntos y la ley invisible del inframundo.',
    archaeology:
      'El simbolismo del inframundo de Hades se expresa en objetos funerarios, imágenes tumbales y tradiciones religiosas centradas en el entierro y el culto a los antepasados.',
    archaeologicalImage: '/assets/lore/hades.jpg',
  },
  demeter: {
    title: 'DEMÉTER',
    subtitle: 'DIOSA DE LA TIERRA',
    mythology:
      'Deméter era la diosa de la agricultura, el grano y las estaciones. Su dolor por la pérdida de Perséfone se convirtió en un mito central de muerte y renovación.',
    archaeology:
      'Su culto se vincula con ritos agrarios, simbolismo de fertilidad y el conjunto material de la cosecha y el ciclo vital.',
    archaeologicalImage: '/assets/lore/demeter.jpg',
  },
  poseidon: {
    title: 'POSEIDÓN',
    subtitle: 'DIOS DEL MAR',
    mythology:
      'Poseidón gobernaba el mar, las tormentas y los caballos. Era uno de los grandes olímpicos y una fuerza de creación y poder desbordado.',
    archaeology:
      'La presencia de Poseidón se lee a través del culto marítimo, la iconografía de navegación y la geografía ritual de costas, puertos y orillas sagradas.',
    archaeologicalImage: '/assets/lore/poseidon.jpg',
  },
  hesta: {
    title: 'HESTIA',
    subtitle: 'DIOSA DEL HOGAR',
    mythology:
      'Hestia era la diosa del hogar, la domesticidad y el fuego sagrado que unía la casa y la ciudad.',
    archaeology:
      'Hestia se asocia con hogares domésticos, fogones rituales y espacios sagrados donde se mantenían la identidad familiar y la vida cívica.',
    archaeologicalImage: '/assets/lore/hestia.jpg',
  },
  hermes: {
    title: 'HERMES',
    subtitle: 'DIOS DEL MENSAJE',
    mythology:
      'Hermes era el mensajero veloz de los dioses, protector del viaje, el comercio, los límites y la astucia. Unía la palabra divina con el movimiento y el intercambio.',
    archaeology:
      'Las huellas arqueológicas de Hermes se relacionan con la cultura del desplazamiento, los objetos devocionales y el mundo material de rutas comerciales y cruces fronterizos.',
    archaeologicalImage: '/assets/lore/hermes.jpg',
  },
  ulfsark: {
    title: 'ULFSARK',
    subtitle: 'GUERRERO LOBO',
    mythology:
      'Los úlfhéðnar eran guerreros de Odín vinculados al lobo y a la furia bélica. El lobo simbolizaba ferocidad, lealtad y combate extático.',
    archaeology:
      'La cultura guerrera nórdica se reconstruye a partir de tumbas, ajuares y objetos simbólicos ligados a la identidad marcial y la violencia sagrada.',
    archaeologicalImage: '/assets/lore/ulfsark.jpg',
  },
  freya: {
    title: 'FREYA',
    subtitle: 'DIOSA DEL AMOR Y LA GUERRA',
    mythology:
      'Freya fue una poderosa diosa nórdica del amor, la magia, la fertilidad y la batalla. Reinaba sobre el salón de los caídos y encarnaba tanto la ternura como la fuerza feroz.',
    archaeology:
      'La imagen de Freya se entiende a partir de la feminidad nórdica, el simbolismo ritual y la memoria cultural de las deidades relacionadas con el poder erótico y la gloria marcial.',
    archaeologicalImage: '/assets/lore/freya.jpg',
  },
  'frost-giant': {
    title: 'GIANT DE HIELO',
    subtitle: 'JÖTUNN DEL NORTE',
    mythology:
      'Los jötnar eran seres primordiales de hielo, naturaleza salvaje y fuerza cósmica, a menudo opuestos a los dioses y representando el mundo brumoso más allá del orden.',
    archaeology:
      'La iconografía del gigante de hielo se vincula con la geografía mítica del norte, donde las fuerzas naturales aterradoras se convierten en narrativa sagrada.',
    archaeologicalImage: '/assets/lore/frost-giant.jpg',
  },
  hela: {
    title: 'HEL',
    subtitle: 'SEÑORA DE LOS MUERTOS',
    mythology:
      'Hel era la señora del reino de los muertos para quienes no morían gloriosamente en batalla. Su dominio era frío, oculto y definitivo.',
    archaeology:
      'La presencia de Hel se lee a través del simbolismo funerario, el reino de los muertos y la comprensión nórdica de la muerte como un dominio con su propia orden.',
    archaeologicalImage: '/assets/lore/hel.jpg',
  },
  loki: {
    title: 'LOKI',
    subtitle: 'DIOS DEL ENGAÑO',
    mythology:
      'Loki era un dios cambiante, maestro del engaño y el caos. Era compañero y adversario de los dioses, y una fuente de inestabilidad del cosmos.',
    archaeology:
      'La identidad mítica de Loki se lee en la tensión entre orden y desorden, la mentira y la consecuencia, y las energías salvajes del mundo nórdico.',
    archaeologicalImage: '/assets/lore/loki.jpg',
  },
  skadi: {
    title: 'SKADI',
    subtitle: 'DIOSA DE LA CAZA Y EL INVIERNO',
    mythology:
      'Skadi era una diosa del invierno, las montañas, la caza y la independencia feroz. Representaba la belleza dura de los paisajes del norte.',
    archaeology:
      'El campo simbólico de Skadi se sitúa en la cultura material de los paisajes del norte, donde la caza, el invierno, el territorio y el poder sagrado están estrechamente entrelazados.',
    archaeologicalImage: '/assets/lore/skadi.jpg',
  },
  odin: {
    title: 'ODÍN',
    subtitle: 'SABIDURÍA Y MAGIA',
    mythology:
      'Odín era el padre de todos los dioses nórdicos, asociado con la sabiduría, el sacrificio, la magia y la búsqueda implacable del conocimiento.',
    archaeology:
      'La arqueología de Odín es inseparable del culto a los guerreros muertos, la sabiduría sagrada de las runas y el paisaje memorial del mundo nórdico.',
    archaeologicalImage: '/assets/lore/odin.jpg',
  },
  valkyrie: {
    title: 'VALKYRIE',
    subtitle: 'ELEGIDORA DE LOS CAÍDOS',
    mythology:
      'Las valquirias eran elegidoras divinas de los caídos, seleccionando guerreros para Valhalla y llevando muertos a los salones de los honrados.',
    archaeology:
      'El motivo de la valquiria aparece en el arte nórdico y la narrativa como emblema del destino marcial, la muerte y la trascendencia heroica.',
    archaeologicalImage: '/assets/lore/valkyrie.jpg',
  },
  forseti: {
    title: 'FORSETI',
    subtitle: 'DIOS DE LA VERDAD Y LA JUSTICIA',
    mythology:
      'Forseti era el dios de la verdad, la justicia y la resolución, asociado con la equidad, la mediación y la paz tras el conflicto.',
    archaeology:
      'Forseti se entiende menos por la iconografía de batalla y más por el orden legal y simbólico de la sociedad nórdica y la ética del juicio.',
    archaeologicalImage: '/assets/lore/forseti.jpg',
  },
};
