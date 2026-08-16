import athenaImage from '../../assets/players/athena.png';
import aphroditeImage from '../../assets/players/afrodita.png';
import demeterImage from '../../assets/players/demeter.png';
import hadesImage from '../../assets/players/hades.png';
import hermesImage from '../../assets/players/hermes.png';
import hestaImage from '../../assets/players/hestia.png';
import minotaurImage from '../../assets/players/minotaur.png';
import poseidonImage from '../../assets/players/poseidon.png';
import zeusImage from '../../assets/players/zeus.png';

import athenaSound from '../../assets/sounds/athena.mp3';
import aphroditeSound from '../../assets/sounds/afrodita.mp3';
import demeterSound from '../../assets/sounds/demeter.mp3';
import hadesSound from '../../assets/sounds/hades.mp3';
import hermesSound from '../../assets/sounds/hermes.mp3';
import hestaSound from '../../assets/sounds/hestia.mp3';
import minotaurSound from '../../assets/sounds/minotaur.mp3';
import poseidonSound from '../../assets/sounds/poseidon.mp3';
import zeusSound from '../../assets/sounds/zeus.mp3';
import hopliteSound from '../../assets/sounds/hoplite.mp3';
import player1Image from '../../assets/players/hoplita.png';

import type { Warrior } from './types';

export const ZEUS_WARRIORS: Warrior[] = [
  {
    id: 'hoplite',
    name: 'HOPLITE',
    title: 'WARRIOR OF ANCIENT GREECE',
    description: 'Hoplites were heavily armed Greek infantrymen who fought in close formation, protected by large shields and armed with spears.',
    unlockAt: 0,
    image: player1Image,
    sound: hopliteSound,
  },
  {
    id: 'athena',
    name: 'ATHENA',
    title: 'GODDESS OF WISDOM',
    description: 'Daughter of Zeus and patron goddess of Athens. Athena embodied wisdom, strategy and disciplined warfare.',
    unlockAt: 1,
    image: athenaImage,
    sound: athenaSound,
  },
  {
    id: 'minotaur',
    name: 'MINOTAUR',
    title: 'BEAST OF THE LABYRINTH',
    description: 'A mythical creature with the body of a man and the head of a bull, confined within the Labyrinth of Crete.',
    unlockAt: 3,
    image: minotaurImage,
    sound: minotaurSound,
  },
  {
    id: 'aphrodite',
    name: 'APRODITE',
    title: 'GODDESS OF LOVE AND BEAUTY',
    description: 'Goddess of love, beauty, pleasure, and procreation. Aphrodite was born from the sea foam and is associated with the dove and the rose.',
    unlockAt: 5,
    image: aphroditeImage,
    sound: aphroditeSound,
  },
  {
    id: 'hades',
    name: 'HADES',
    title: 'LORD OF THE UNDERWORLD',
    description: 'Brother of Zeus and Poseidon. After the gods divided the cosmos, Hades became ruler of the Underworld and the realm of the dead.',
    unlockAt: 7,
    image: hadesImage,
    sound: hadesSound,
  },
  {
    id: 'Demeter',
    name: 'DEMETER',
    title: 'GODDESS OF THE EARTH',
    description: 'Goddess of the harvest, agriculture, and the seasons. Demeter is associated with the cycle of life and death.',
    unlockAt: 10,
    image: demeterImage,
    sound: demeterSound,
  },
  {
    id: 'Poseidon',
    name: 'POSEIDON',
    title: 'GOD OF THE SEA',
    description: 'Brother of Zeus and Hades. Poseidon is the god of the sea, earthquakes, and horses.',
    unlockAt: 12,
    image: poseidonImage,
    sound: poseidonSound,
  },
  {
    id: 'hesta',
    name: 'HESTA',
    title: 'GODDESS OF THE HOME',
    description: 'Goddess of the hearth, home, and family. Hesta is associated with the sacred fire and the domestic sphere.',
    unlockAt: 14,
    image: hestaImage,
    sound: hestaSound,
  },
  {
    id: 'hermes',
    name: 'HERMES',
    title: 'GOD OF MESSAGING',
    description: 'God of travel, communication, and thieves. Hermes is known for his speed and cunning.',
    unlockAt: 16,
    image: hermesImage,
    sound: hermesSound,
  },
  {
    id: 'zeus',
    name: 'ZEUS',
    title: 'KING OF THE GODS',
    description: 'Ruler of the Olympian gods and master of thunder and lightning. Zeus overthrew the Titans and ruled from Mount Olympus.',
    unlockAt: 20,
    image: zeusImage,
    sound: zeusSound,
  },
];
