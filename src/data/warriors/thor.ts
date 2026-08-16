import freyaImage from '../../assets/players/freya.png';
import frostGiantImage from '../../assets/players/frost-giant.png';
import forsetiImage from '../../assets/players/forseti.png';
import helaImage from '../../assets/players/hela.png';
import lokiImage from '../../assets/players/loki.png';
import odinImage from '../../assets/players/odin.png';
import skadiImage from '../../assets/players/skadi.png';
import thorImage from '../../assets/players/thor.png';
import valkyrieImage from '../../assets/players/valkiria.png';
import player2Image from '../../assets/players/ulfsark.png';

import freyaSound from '../../assets/sounds/freya.mp3';
import frostGiantSound from '../../assets/sounds/frost-giant.mp3';
import forsetiSound from '../../assets/sounds/forseti.mp3';
import helSound from '../../assets/sounds/hel.mp3';
import lokiSound from '../../assets/sounds/loki.mp3';
import odinSound from '../../assets/sounds/odin.mp3';
import skadiSound from '../../assets/sounds/skadi.mp3';
import thorSound from '../../assets/sounds/thor.mp3';
import valkyrieSound from '../../assets/sounds/valkiria.mp3';
import ulfsarkSound from '../../assets/sounds/ulfsark.mp3';

import type { Warrior } from './types';

export const THOR_WARRIORS: Warrior[] = [
  {
    id: 'ulfsark',
    name: 'ULFSARK',
    title: 'WOLF WARRIOR',
    description: 'The úlfhéðnar appear in Old Norse tradition as warriors associated with wolves and Odin, often compared with berserkers.',
    unlockAt: 0,
    image: player2Image,
    sound: ulfsarkSound,
  },
  {
    id: 'freya',
    name: 'FREYJA',
    title: 'GODDESS OF LOVE AND WAR',
    description: 'A powerful Norse goddess associated with love, fertility, magic and battle. Freyja receives half of those who fall in combat.',
    unlockAt: 1,
    image: freyaImage,
    sound: freyaSound,
  },
  {
    id: 'frost-giant',
    name: 'FROST GIANT',
    title: 'JÖTUNN OF THE NORTH',
    description: 'The jötnar are powerful beings of Norse mythology, frequently opposed to the gods and tied to the wild forces of the cosmos.',
    unlockAt: 3,
    image: frostGiantImage,
    sound: frostGiantSound,
  },
  {
    id: 'hela',
    name: 'HEL',
    title: 'RULER OF THE DEAD',
    description: 'Daughter of Loki and ruler of the realm also called Hel. She receives many of those who die from sickness or old age.',
    unlockAt: 5,
    image: helaImage,
    sound: helSound,
  },
  {
    id: 'loki',
    name: 'LOKI',
    title: 'GOD OF MESSAGING AND TRICKERY',
    description: 'Trickster god associated with chaos, cunning, and magic. Loki is known for his shape-shifting abilities and his complex relationship with the other gods.',
    unlockAt: 7,
    image: lokiImage,
    sound: lokiSound,
  },
  {
    id: 'skadi',
    name: 'SKADI',
    title: 'GODDESS OF HUNT AND WINTER',
    description: 'A powerful Norse goddess associated with hunting, winter, and the mountains. Skadi is known for her strength and her role in the myth of the gods.',
    unlockAt: 10,
    image: skadiImage,
    sound: skadiSound,
  },
  {
    id: 'odin',
    name: 'ODIN',
    title: 'WISDOM AND MAGIC',
    description: 'The chief of the Aesir gods and the ruler of Asgard. Odin is associated with wisdom, war, and death.',
    unlockAt: 12,
    image: odinImage,
    sound: odinSound,
  },
  {
    id: 'valkyrie',
    name: 'VALKYRIE',
    title: 'CHOOSER OF THE SLAIN',
    description: 'Female figures in Norse mythology who decide which warriors die in battle and are brought to Valhalla.',
    unlockAt: 14,
    image: valkyrieImage,
    sound: valkyrieSound,
  },
  {
    id: 'forseti',
    name: 'FORSETI',
    title: 'GOD OF TRUTH AND JUSTICE',
    description: 'The god of truth and justice in Norse mythology. Forseti is known for his fairness and his role in mediating disputes.',
    unlockAt: 16,
    image: forsetiImage,
    sound: forsetiSound,
  },
  {
    id: 'thor',
    name: 'THOR',
    title: 'GOD OF THUNDER',
    description: 'Son of Odin and one of the mightiest Norse gods. Thor protects gods and humans and wields the famous hammer Mjölnir.',
    unlockAt: 20,
    image: thorImage,
    sound: thorSound,
  },
];
