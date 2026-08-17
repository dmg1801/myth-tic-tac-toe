import hopliteLoreImage from '../../assets/lore/hoplite-lore.png';
import athenaLoreImage from '../../assets/lore/athena-lore.png';
import minotaurLoreImage from '../../assets/lore/minotaur-lore.png';
import aphroditeLoreImage from '../../assets/lore/aphrodite-lore.png';
import hadesLoreImage from '../../assets/lore/hades-lore.png';
import demeterLoreImage from '../../assets/lore/demeter-lore.png';
import poseidonLoreImage from '../../assets/lore/poseidon-lore.png';
import hestaLoreImage from '../../assets/lore/hestia-lore.png';
import hermesLoreImage from '../../assets/lore/hermes-lore.png';
import zeusLoreImage from '../../assets/lore/zeus-lore.png';

import ulfsarkLoreImage from '../../assets/lore/ulfsark-lore.png';
import freyaLoreImage from '../../assets/lore/Freyja-lore.png';
import frostGiantLoreImage from '../../assets/lore/frost-giant-lore.png';
import helaLoreImage from '../../assets/lore/hel-lore.png';
import lokiLoreImage from '../../assets/lore/loki-lore.png';
import skadiLoreImage from '../../assets/lore/skadi-lore.png';
import odinLoreImage from '../../assets/lore/odin-lore.png';
import valkyrieLoreImage from '../../assets/lore/valkiria-lore.png';
import forsetiLoreImage from '../../assets/lore/forseti-lore.png';
import thorLoreImage from '../../assets/lore/thor-lore.png';

export type LoreText = {
  title: string;
  subtitle: string;
  mythology: string;
  archaeology: string;
  archaeologicalCaption?: string;
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
    archaeologicalCaption:
      'Zeus apunta su rayo contra un gigante (no mostrado). Un águila está posada en su otra mano.\n\nFiguras rojas áticas, ca. 470–460 a. C.',
    archaeologicalImage: zeusLoreImage,
  },

  thor: {
    title: 'THOR',
    subtitle: 'DIOS DEL TRUENO',
    mythology:
      'Thor era hijo de Odín, defensor de Asgard y portador del martillo Mjölnir. Simbolizaba la fuerza, la protección y la justicia divina frente a gigantes, caos y poderes hostiles.',
    archaeology:
      'La comprensión arqueológica de Thor se construye a partir de la iconografía nórdica, tumbas de guerreros, objetos con simbología y el paisaje ritual del mundo escandinavo.',
    archaeologicalCaption:
      'La estatua de Eyrarland es una figura de bronce de un personaje sentado (6,7 cm) datada alrededor del año 1000 d. C.\n\nThor sostiene su martillo, Mjölnir, esculpido con la típica forma islandesa similar a una cruz.',
    archaeologicalImage: thorLoreImage,
  },

  hoplite: {
    title: 'HOPLITA',
    subtitle: 'GUERRERO DE LA GRECIA ANTIGUA',
    mythology:
      'El hoplita estaba en el centro de la guerra de la Grecia clásica: un soldado-ciudadano que luchaba en formación cerrada, escudo con escudo, con lanza y armadura pesada.',
    archaeology:
      'La guerra hoplita se reconstruye a partir de restos funerarios, panoplias, puntas de lanza y evidencia de cementerios que muestran la centralidad del combate en formación en la Grecia arcaica y clásica.',
    archaeologicalCaption:
      'Detalle de un vaso corintio que muestra una batalla de hoplitas.\n\nc. 600 a. C. (terracota).',
    archaeologicalImage: hopliteLoreImage,
  },

  athena: {
    title: 'ATENEA',
    subtitle: 'DIOSA DE LA SABIDURÍA',
    mythology:
      'Atenea era la diosa de la sabiduría, la estrategia y la guerra disciplinada. Se asoció con la razón, la destreza y las virtudes cívicas de la ciudad-estado.',
    archaeology:
      'Atenea suele identificarse a través de exvotos, estatuillas de bronce y santuarios dedicados a su culto en Atenas y en el mundo griego.',
    archaeologicalCaption:
      'Copa de Aison, siglo V a. C., Museo Arqueológico Nacional (M.A.N.), Madrid.\n\nTeseo derrota al Minotauro en presencia de Atenea.',
    archaeologicalImage: athenaLoreImage,
  },

  minotaur: {
    title: 'MINOTAURO',
    subtitle: 'BESTIA DEL LABERINTO',
    mythology:
      'El minotauro era una criatura monstruosa de Creta, mitad hombre y mitad toro, ligada al laberinto y a la prueba heroica de la edad mitológica.',
    archaeology:
      'Su simbolismo se lee a través de la iconografía del toro, la violencia ritual y la mitología de la cultura palacial del Egeo.',
    archaeologicalCaption:
      'El Minotauro en el tondo de una kílix de figuras negras áticas, ca. 515 a. C., con inscripción kalos.',
    archaeologicalImage: minotaurLoreImage,
  },

  aphrodite: {
    title: 'AFRODITA',
    subtitle: 'DIOSA DEL AMOR Y LA BELLEZA',
    mythology:
      'Afrodita surgió de la espuma del mar y se convirtió en la diosa del amor, la belleza, el deseo y el poder erótico. Su culto unía el amor con la devoción y el peligro.',
    archaeology:
      'La arqueología de Afrodita se relaciona con figurillas, objetos rituales y cultos domésticos centrados en la belleza, la fertilidad y la sacralidad del deseo.',
    archaeologicalCaption:
      'Kílix ático de fondo blanco y figuras rojas que muestra a Afrodita montando un cisne.\n\nc. 460–470 a. C., hallada en Kameiros (Rodas).',
    archaeologicalImage: aphroditeLoreImage,
  },

  hades: {
    title: 'HADES',
    subtitle: 'SEÑOR DEL INFRAMUNDO',
    mythology:
      'Hades gobernó el reino de los muertos tras la división del mundo entre los hijos de Cronos. Presidía la muerte, los difuntos y la ley invisible del inframundo.',
    archaeology:
      'El simbolismo del inframundo de Hades se expresa en objetos funerarios, imágenes tumbales y tradiciones religiosas centradas en el entierro y el culto a los antepasados.',
    archaeologicalCaption:
      'Hades y Perséfone reclinados en un lecho en el inframundo.\n\nEl dios sostiene un cuerno de la abundancia y un plato; la diosa un pequeño objeto, probablemente una semilla de granada.\n\nca. 430 a. C., Museo Británico, Londres.',
    archaeologicalImage: hadesLoreImage,
  },

  demeter: {
    title: 'DEMÉTER',
    subtitle: 'DIOSA DE LA TIERRA',
    mythology:
      'Deméter era la diosa de la agricultura, el grano y las estaciones. Su dolor por la pérdida de Perséfone se convirtió en un mito central de muerte y renovación.',
    archaeology:
      'Su culto se vincula con ritos agrarios, simbolismo de fertilidad y el conjunto material de la cosecha y el ciclo vital.',
    archaeologicalCaption:
      'Triptolemo se prepara para partir en un carro alado (parcialmente mostrado) en su misión de enseñar agricultura a la humanidad.\n\nFrente a él está Deméter, junto a un altar; la diosa lleva una corona y sostiene haces de trigo.\n\nca. 480 a. C.',
    archaeologicalImage: demeterLoreImage,
  },

  poseidon: {
    title: 'POSEIDÓN',
    subtitle: 'DIOS DEL MAR',
    mythology:
      'Poseidón gobernaba el mar, las tormentas y los caballos. Era uno de los grandes olímpicos y una fuerza de creación y poder desbordado.',
    archaeology:
      'La presencia de Poseidón se lee a través del culto marítimo, la iconografía de navegación y la geografía ritual de costas, puertos y orillas sagradas.',
    archaeologicalCaption:
      'Poseidón está sentado en un trono con un tridente en una mano y una copa en la otra.\n\nLo acompaña la diosa alada Iris (o quizá Hebe), que sirve néctar desde una jarra oinochoe.\n\nca. 475–470 a. C.',
    archaeologicalImage: poseidonLoreImage,
  },

  hesta: {
    title: 'HESTIA',
    subtitle: 'DIOSA DEL HOGAR',
    mythology:
      'Hestia era la diosa del hogar, la domesticidad y el fuego sagrado que unía la casa y la ciudad.',
    archaeology:
      'Hestia se asocia con hogares domésticos, fogones rituales y espacios sagrados donde se mantenían la identidad familiar y la vida cívica.',
    archaeologicalCaption: 'Descripción de la pieza arqueológica pendiente.',
    archaeologicalImage: hestaLoreImage,
  },

  hermes: {
    title: 'HERMES',
    subtitle: 'DIOS DEL MENSAJE',
    mythology:
      'Hermes era el mensajero veloz de los dioses, protector del viaje, el comercio, los límites y la astucia. Unía la palabra divina con el movimiento y el intercambio.',
    archaeology:
      'Las huellas arqueológicas de Hermes se relacionan con la cultura del desplazamiento, los objetos devocionales y el mundo material de rutas comerciales y cruces fronterizos.',
    archaeologicalCaption:
      'Hestia sosteniendo una rama de árbol casto, en una kílix de figuras rojas atribuida a Oltos.\n\nMuseo Nacional de Tarquinia.',
    archaeologicalImage: hermesLoreImage,
  },

  ulfsark: {
    title: 'ULFSARK',
    subtitle: 'GUERRERO LOBO',
    mythology:
      'Los úlfhéðnar eran guerreros de Odín vinculados al lobo y a la furia bélica. El lobo simbolizaba ferocidad, lealtad y combate extático.',
    archaeology:
      'La cultura guerrera nórdica se reconstruye a partir de tumbas, ajuares y objetos simbólicos ligados a la identidad marcial y la violencia sagrada.',
    archaeologicalCaption:
      'Fotografía en blanco y negro de la placa de Torslunda.\n\nA la derecha aparece una figura danzante, tuerta y con cuernos, asociada a Odín, junto a un hombre‑lobo —un berserker (úlfhéðinn / “Ulfsark”).\n\nSiglos VI–VII.',
    archaeologicalImage: ulfsarkLoreImage,
  },

  freya: {
    title: 'FREYA',
    subtitle: 'DIOSA DEL AMOR Y LA GUERRA',
    mythology:
      'Freya fue una poderosa diosa nórdica del amor, la magia, la fertilidad y la batalla. Reinaba sobre el salón de los caídos y encarnaba tanto la ternura como la fuerza feroz.',
    archaeology:
      'La imagen de Freya se entiende a partir de la feminidad nórdica, el simbolismo ritual y la memoria cultural de las deidades relacionadas con el poder erótico y la gloria marcial.',
    archaeologicalCaption:
      'Colgante de plata que representa a la diosa nórdica Freyja, adornada con su preciado collar Brísingamen.\n\nPeriodo 800–1050 d. C.\n\nMuseo Histórico Nacional, Estocolmo.',
    archaeologicalImage: freyaLoreImage,
  },

  'frost-giant': {
    title: 'GIGANTE DE HIELO',
    subtitle: 'JÖTUNN DEL NORTE',
    mythology:
      'Los jötnar eran seres primordiales de hielo, naturaleza salvaje y fuerza cósmica, a menudo opuestos a los dioses y representando el mundo brumoso más allá del orden.',
    archaeology:
      'La iconografía del gigante de hielo se vincula con la geografía mítica del norte, donde las fuerzas naturales aterradoras se convierten en narrativa sagrada.',
    archaeologicalCaption:
      'DR284 del Monumento de Hunnestad, interpretado como la giganta Hyrrokkin montando un lobo y usando una serpiente como riendas.',
    archaeologicalImage: frostGiantLoreImage,
  },

  hela: {
    title: 'HELA',
    subtitle: 'SEÑORA DE LOS MUERTOS',
    mythology:
      'Hela era la señora del reino de los muertos para quienes no morían gloriosamente en batalla. Su dominio era frío, oculto y definitivo.',
    archaeology:
      'La presencia de Hela se lee a través del simbolismo funerario, el reino de los muertos y la comprensión nórdica de la muerte como un dominio con su propia orden.',
    archaeologicalCaption:
      'Hel (1889), por Johannes Gehrts, representada junto a su sabueso Garmr.',
    archaeologicalImage: helaLoreImage,
  },

  loki: {
    title: 'LOKI',
    subtitle: 'DIOS DEL ENGAÑO',
    mythology:
      'Loki era un dios cambiante, maestro del engaño y el caos. Era compañero y adversario de los dioses, y una fuente de inestabilidad del cosmos.',
    archaeology:
      'La identidad mítica de Loki se lee en la tensión entre orden y desorden, la mentira y la consecuencia, y las energías salvajes del mundo nórdico.',
    archaeologicalCaption:
      'La Piedra de Loki es una talla del siglo VIII que representa al dios nórdico Loki, atado y encadenado.\n\nEs una de solo dos representaciones conocidas de este tipo en Europa y la única en Gran Bretaña.',
    archaeologicalImage: lokiLoreImage,
  },

  skadi: {
    title: 'SKADI',
    subtitle: 'DIOSA DE LA CAZA Y EL INVIERNO',
    mythology:
      'Skadi era una diosa del invierno, las montañas, la caza y la independencia feroz. Representaba la belleza dura de los paisajes del norte.',
    archaeology:
      'El campo simbólico de Skadi se sitúa en la cultura material de los paisajes del norte, donde la caza, el invierno, el territorio y el poder sagrado están estrechamente entrelazados.',
    archaeologicalCaption:
      'Litografía de la diosa Skadi realizada por Carl Fredrik von Saltza (1858–1905).',
    archaeologicalImage: skadiLoreImage,
  },

  odin: {
    title: 'ODÍN',
    subtitle: 'SABIDURÍA Y MAGIA',
    mythology:
      'Odín era el padre de todos los dioses nórdicos, asociado con la sabiduría, el sacrificio, la magia y la búsqueda implacable del conocimiento.',
    archaeology:
      'La arqueología de Odín es inseparable del culto a los guerreros muertos, la sabiduría sagrada de las runas y el paisaje memorial del mundo nórdico.',
    archaeologicalCaption:
      'Placa de un casco sueco de la era Vendel que muestra a una figura montada a caballo, acompañada por dos cuervos (Huginn y Muninn), ambos símbolos de Odín, sosteniendo una lanza y un escudo, frente a una serpiente.',
    archaeologicalImage: odinLoreImage,
  },

  valkyrie: {
    title: 'VALQUIRIA',
    subtitle: 'ELEGIDORA DE LOS CAÍDOS',
    mythology:
      'Las valquirias eran elegidoras divinas de los caídos, seleccionando guerreros para Valhalla y llevando muertos a los salones de los honrados.',
    archaeology:
      'El motivo de la valquiria aparece en el arte nórdico y la narrativa como emblema del destino marcial, la muerte y la trascendencia heroica.',
    archaeologicalCaption:
      'Valquirias (c. 1905), por Emil Doepler, representadas como mujeres etéreas y acorazadas con cabellos ondulantes.',
    archaeologicalImage: valkyrieLoreImage,
  },

  forseti: {
    title: 'FORSETI',
    subtitle: 'DIOS DE LA VERDAD Y LA JUSTICIA',
    mythology:
      'Forseti era el dios de la verdad, la justicia y la resolución, asociado con la equidad, la mediación y la paz tras el conflicto.',
    archaeology:
      'Forseti se entiende menos por la iconografía de batalla y más por el orden legal y simbólico de la sociedad nórdica y la ética del juicio.',
    archaeologicalCaption:
      'Forseti sentado en juicio (1881), por Carl Emil Doepler.\n\nEl dios aparece como un juez sabio y justo, sentado en un trono con un libro de leyes en la mano.',
    archaeologicalImage: forsetiLoreImage,
  },
};
