export type LoreText = {
  title: string;
  subtitle: string;
  mythology: string;
  archaeology: string;
  archaeologicalImage?: string;
};

export const loreEntriesEN: Record<string, LoreText> = {
  zeus: {
    title: 'ZEUS',
    subtitle: 'KING OF THE GODS',
    mythology:
      'Zeus was the supreme god of Olympus, lord of thunder, lightning, and sky. In Greek tradition, he overthrew the Titans and established divine order among the gods, while also reigning as judge of mortals and immortals.',
    archaeology:
      'Archaeological interpretations of Zeus generally rest on the symbolic power of thunder, lightning, mountain cults, and the sacred spaces associated with Olympian worship. His imagery often appears in bronze votives, monumental sculpture, and temple iconography.',
    archaeologicalImage: '/assets/lore/zeus.jpg',
  },
  thor: {
    title: 'THOR',
    subtitle: 'GOD OF THUNDER',
    mythology:
      'Thor was the son of Odin, defender of Asgard, and wielder of the hammer Mjölnir. He symbolized strength, protection, and the force of divine justice against giants, chaos, and hostile powers.',
    archaeology:
      'The archaeological understanding of Thor is built from Norse iconography, warrior graves, symbol-bearing objects, and the broader ritual landscape of the Scandinavian world.',
    archaeologicalImage: '/assets/lore/thor.jpg',
  },
  hoplite: {
    title: 'HOPLITE',
    subtitle: 'WARRIOR OF ANCIENT GREECE',
    mythology:
      'The hoplite stood at the heart of classical Greek warfare: a citizen-soldier fighting in disciplined formation, shield to shield, with spear and heavy armor.',
    archaeology:
      'Hoplite warfare is reconstructed from burial remains, panoplies, spearheads, and cemetery evidence that show the centrality of close-order combat in Archaic and Classical Greece.',
    archaeologicalImage: '/assets/lore/hoplite.jpg',
  },
  athena: {
    title: 'ATHENA',
    subtitle: 'GODDESS OF WISDOM',
    mythology:
      'Athena was the goddess of wisdom, strategy, and disciplined warfare. She was associated with reason, skill, and the civic virtues of the city-state.',
    archaeology:
      'Athena is often identified through votive objects, bronze statuary, and sanctuaries devoted to her cult in Athens and throughout the Greek world.',
    archaeologicalImage: '/assets/lore/athena.jpg',
  },
  minotaur: {
    title: 'MINOTAUR',
    subtitle: 'BEAST OF THE LABYRINTH',
    mythology:
      'The Minotaur was a monstrous creature of Crete, half man and half bull, bound to the labyrinth and linked to the ordeal of the heroic age.',
    archaeology:
      'The creature’s symbolism is often read through bull imagery, ritual violence, and the mythology of palace culture in the Aegean Bronze Age.',
    archaeologicalImage: '/assets/lore/minotaur.jpg',
  },
  aphrodite: {
    title: 'APHRODITE',
    subtitle: 'GODDESS OF LOVE AND BEAUTY',
    mythology:
      'Aphrodite emerged from the sea foam and became the goddess of love, beauty, desire, and erotic power. Her cult connected desire to both devotion and danger.',
    archaeology:
      'The archaeology of Aphrodite is tied to figurines, ritual objects, and domestic cults emphasizing beauty, fertility, and the sacredness of desire.',
    archaeologicalImage: '/assets/lore/aphrodite.jpg',
  },
  hades: {
    title: 'HADES',
    subtitle: 'LORD OF THE UNDERWORLD',
    mythology:
      'Hades ruled the realm of the dead after the division of the world among the sons of Cronus. He presided over death, the dead, and the invisible law of the underworld.',
    archaeology:
      'The underworld symbolism of Hades is expressed through funerary objects, tomb imagery, and religious traditions centered on burial and ancestor cult.',
    archaeologicalImage: '/assets/lore/hades.jpg',
  },
  demeter: {
    title: 'DEMETER',
    subtitle: 'GODDESS OF THE EARTH',
    mythology:
      'Demeter was the goddess of agriculture, grain, and the seasons. Her grief over the loss of Persephone became a foundational myth of death and renewal.',
    archaeology:
      'Her cult is strongly connected with agricultural rites, fertility symbolism, and the material culture of harvest and cyclical renewal.',
    archaeologicalImage: '/assets/lore/demeter.jpg',
  },
  poseidon: {
    title: 'POSEIDON',
    subtitle: 'GOD OF THE SEA',
    mythology:
      'Poseidon ruled the sea, storms, and horses. He was one of the great Olympians and a force of both creation and unrestrained power.',
    archaeology:
      'Poseidon’s presence is often read through maritime cult, seafaring symbolism, and the ritual geography of coasts, harbors, and sacred shores.',
    archaeologicalImage: '/assets/lore/poseidon.jpg',
  },
  hesta: {
    title: 'HESTA',
    subtitle: 'GODDESS OF THE HOME',
    mythology:
      'Hestia was the goddess of the hearth, domesticity, and the sacred fire that bound the household and the city together.',
    archaeology:
      'Hestia is often associated with domestic hearths, ritual fireplaces, and the sacred spaces where family and civic identity were maintained.',
    archaeologicalImage: '/assets/lore/hestia.jpg',
  },
  hermes: {
    title: 'HERMES',
    subtitle: 'GOD OF MESSAGING',
    mythology:
      'Hermes was the swift messenger of the gods, patron of travel, trade, boundaries, and cunning. He linked divine speech to movement and exchange.',
    archaeology:
      'Archaeological traces of Hermes connect to travel culture, devotional objects, and the material world of trade routes and border crossings.',
    archaeologicalImage: '/assets/lore/hermes.jpg',
  },
  ulfsark: {
    title: 'ULFSARK',
    subtitle: 'WOLF WARRIOR',
    mythology:
      'The úlfhéðnar were warriors of Odin, associated with wolves and battle frenzy. The wolf was a symbol of ferocity, loyalty, and ecstatic combat.',
    archaeology:
      'Norse warrior culture is reconstructed through burial remains, grave goods, and symbolic objects tied to martial identity and sacred violence.',
    archaeologicalImage: '/assets/lore/ulfsark.jpg',
  },
  freya: {
    title: 'FREYJA',
    subtitle: 'GODDESS OF LOVE AND WAR',
    mythology:
      'Freya was a powerful goddess of love, magic, fertility, and battle. She ruled over the hall of the fallen and embodied both tenderness and fierce power.',
    archaeology:
      'Freya’s image is understood through Norse femininity, ritual symbolism, and the cultural memory of goddesses associated with erotic power and martial glory.',
    archaeologicalImage: '/assets/lore/freya.jpg',
  },
  'frost-giant': {
    title: 'FROST GIANT',
    subtitle: 'JÖTUNN OF THE NORTH',
    mythology:
      'The jötnar were primordial beings of ice, wilderness, and cosmic force, often in opposition to the gods and representing the wild world beyond order.',
    archaeology:
      'Frost giant imagery is connected to the mythic geography of northern landscapes, where terrifying natural forces were folded into sacred narrative.',
    archaeologicalImage: '/assets/lore/frost-giant.jpg',
  },
  hela: {
    title: 'HEL',
    subtitle: 'RULER OF THE DEAD',
    mythology:
      'Hel was the ruler of the realm of the dead for those who did not die gloriously in battle. Her dominion was cold, hidden, and final.',
    archaeology:
      'Hel’s presence is read through funerary symbolism, the realm of the dead, and the Norse understanding of death as a realm with its own order.',
    archaeologicalImage: '/assets/lore/hel.jpg',
  },
  loki: {
    title: 'LOKI',
    subtitle: 'GOD OF TRICKERY',
    mythology:
      'Loki was a shape-shifting trickster, master of misdirection and chaos. He was both companion and adversary to the gods, and a source of instability in the cosmos.',
    archaeology:
      'Loki’s mythic identity is read through the tension between order and disorder, deception and consequence, and the wild energies of the Norse world.',
    archaeologicalImage: '/assets/lore/loki.jpg',
  },
  skadi: {
    title: 'SKADI',
    subtitle: 'GODDESS OF HUNT AND WINTER',
    mythology:
      'Skadi was a goddess of winter, mountains, hunting, and fierce independence. She represented the harsh beauty of the northern wilds.',
    archaeology:
      'Skadi’s symbolic field sits within the material culture of northern landscapes, where hunting, winter, terrain, and sacred power are tightly intertwined.',
    archaeologicalImage: '/assets/lore/skadi.jpg',
  },
  odin: {
    title: 'ODIN',
    subtitle: 'WISDOM AND MAGIC',
    mythology:
      'Odin was the all-father of the Norse gods, associated with wisdom, sacrifice, magic, and the relentless pursuit of knowledge.',
    archaeology:
      'The archaeology of Odin is inseparable from the cult of the warrior dead, the sacred wisdom of runes, and the memorial landscape of the Norse world.',
    archaeologicalImage: '/assets/lore/odin.jpg',
  },
  valkyrie: {
    title: 'VALKYRIE',
    subtitle: 'CHOOSER OF THE SLAIN',
    mythology:
      'The valkyries were divine choosers of the slain, selecting warriors for Valhalla and carrying the dead to the halls of the honored.',
    archaeology:
      'The valkyrie motif appears in Norse art and narrative as an emblem of martial destiny, death, and heroic transcendence.',
    archaeologicalImage: '/assets/lore/valkyrie.jpg',
  },
  forseti: {
    title: 'FORSETI',
    subtitle: 'GOD OF TRUTH AND JUSTICE',
    mythology:
      'Forseti was the god of truth, justice, and settlement, often associated with fairness, mediation, and the making of peace after conflict.',
    archaeology:
      'Forseti is understood less through battlefield iconography than through the legal and symbolic order of Norse society and the ethics of judgment.',
    archaeologicalImage: '/assets/lore/forseti.jpg',
  },
};
