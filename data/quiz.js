export const quiz = [
  {score:'0',
    isLocked: false,
    image: require('../assets/images/ancientCity/ancientAthens.png'),
    warior: require('../assets/images/warior/wariorAthene.png'),
    name: 'Athines',
    id: 1,
    levelQuestions: [
      {
        id: 'q1',
        question: ' What form of government arose in Athens?',
        options: ['Democracy', 'Monarchy', 'Oligarchy', 'Dictatorship'],
        answer: 'Democracy',
      },
      {
        id: 'q2',
        question: 'Which goddess is the patroness of Athens?',
        options: ['Athena', 'Hera', 'Aphrodite', 'Hestia'],
        answer: 'Athena',
      },
      {
        id: 'q3',
        question:
          'On this hill stands the temple of our patroness. What is the name of this temple?',
        options: ['Parthenon', 'Odeon', 'Temple of Zeus', 'Temple of Athena'],
        answer: 'Odeon',
      },
      {
        id: 'q4',
        question:
          'Do you know what tactic we used to defeat the Persians at the Battle of Marathon?',
        options: ['Phalanx', 'Siege', 'Hoplite', 'Horsemen'],
        answer: 'Phalanx',
      },
      {
        id: 'q5',
        question:
          'History writes about our victories. Who was the first historian to describe the events of the Greco-Persian Wars?',
        options: ['Herodotus', 'Thucydides', 'Plato', 'Aristotle'],
        answer: 'Herodotus',
      },
      {
        id: 'q6',
        question:
          'And now – about symbols. What did the laurel wreath symbolize in Ancient Greece?',
        options: [
          'Victory and glory',
          'Divine power',
          'Humility',
          'Family honor',
        ],
        answer: 'Victory and glory',
      },
      {
        id: 'q7',
        question:
          'Do you know which sporting event was born in Ancient Greece?',
        options: ['Olympic Games', 'Triathlon', 'Marathon', 'Gladiator fights'],
        answer: 'Olympic Games',
      },
      {
        id: 'q8',
        question:
          'Homer wrote a great epic about the heroes of Troy. What is the name of this work?',
        options: ['Iliad', 'Aeneid', 'Mahabharata', 'Epic of Gilgamesh'],
        answer: 'Iliad',
      },
      {
        id: 'q9',
        question:
          'In the Golden Age of Athens, our city flourished under the leadership of this strategist. What was his name?',
        options: ['Miltiades', 'Pericles', 'Leonidas', 'Alcibiades'],
        answer: 'Pericles',
      },
      {
        id: 'q10',
        question:
          'And the last question. What material did the Greeks most often use to build temples?',
        options: ['Marble', 'Granite', 'Sand', 'Wood'],
        answer: 'Marble',
      },
    ],
    welcome:
      'Hello, traveler! You have arrived in the great city of Athens, the center of culture, science, and warfare. But do you truly know our history? Let me test your knowledge.',
  },
  {score:'0',
    isLocked: true,
    image: require('../assets/images/ancientCity/ancientSparta.png'),
    warior: require('../assets/images/warior/wariorSparta.png'),
    name: 'Sparta',
    id: '2',
    levelQuestions: [
      {
        id: 'q1',
        question: "What does the word 'Sparta' mean in our culture?",
        options: [
          'Legend',
          'Simplicity and discipline',
          'Wealth and luxury',
          'Art',
        ],
        answer: 'Simplicity and discipline',
      },
      {
        id: 'q2',
        question: 'What was the main goal the Spartans had for their citizens?',
        options: [
          'To be philosophers',
          'To be warriors',
          'To be merchants',
          'To be poets',
        ],
        answer: 'To be warriors',
      },
      {
        id: 'q3',
        question:
          'What was the foundation of a young man’s education in Sparta?',
        options: [
          'Agōn — military training',
          'Singing and dancing',
          'Learning philosophy',
          'Trade skills',
        ],
        answer: 'Agōn — military training',
      },
      {
        id: 'q4',
        question:
          'How many Spartans participated in the Battle of Thermopylae?',
        options: ['500', '1,000', '300', '10,000'],
        answer: '300',
      },
      {
        id: 'q5',
        question:
          'What phrase did Spartan mothers often say to their sons going to war?',
        options: [
          '"Please come back."',
          '"Don\'t forget your family."',
          '"Win at any cost."',
          '"With your shield or on it."',
        ],
        answer: '"With your shield or on it."',
      },
      {
        id: 'q6',
        question: 'What form of government existed in Sparta?',
        options: ['Democracy', 'Tyranny', 'Oligarchy', 'Diarchy - two kings'],
        answer: 'Diarchy - two kings',
      },
      {
        id: 'q7',
        question: 'Who were the Perioeci in Sparta?',
        options: [
          'Slaves',
          'Mercenaries',
          'Teachers',
          'Free citizens without political rights',
        ],
        answer: 'Free citizens without political rights',
      },
      {
        id: 'q8',
        question: 'Who were the Helots in Sparta?',
        options: ['Slaves', 'Allies', 'Merchants', 'Warriors'],
        answer: 'Slaves',
      },
      {
        id: 'q9',
        question: 'What was the significance of the shield to a Spartan?',
        options: [
          'Personal protection',
          'Symbol of honor',
          'Trophy',
          'Defense of the entire unit',
        ],
        answer: 'Defense of the entire unit',
      },
      {
        id: 'q10',
        question:
          'What phrase was engraved on the tomb of the Spartans at Thermopylae?',
        options: [
          '"We gave our lives for freedom."',
          '"Courage and honor."',
          '"We fought to the last."',
          '"Traveler, go tell Sparta that here we lie, obedient to her command."',
        ],
        answer:
          '"Traveler, go tell Sparta that here we lie, obedient to her command."',
      },
    ],
    welcome:
      'Traveler! Welcome to Sparta, a city of war, honor and iron discipline. Do you want to earn our trust? Then you must answer a few questions to prove your willingness to be a part of this story.',
  },

  {score:'0',
    isLocked: true,
    image: require('../assets/images/ancientCity/ancientThermo.png'),
    warior: require('../assets/images/warior/wariorThermopylae.png'),
    name: 'Thermopylae',
    id: '3',
    levelQuestions: [
      {
        id: 'q1',
        question: 'When did the Battle of Thermopylae take place?',
        options: ['400 BCE', '480 BCE', '500 BCE', '300 BCE'],
        answer: '480 BCE',
      },
      {
        id: 'q2',
        question: 'How many Spartans fought in the Battle of Thermopylae?',
        options: ['100', '500', '300', '1000'],
        answer: '300',
      },
      {
        id: 'q3',
        question: 'How many Spartans fought in the Battle of Thermopylae?',
        options: ['100', '500', '300', '1000'],
        answer: '300',
      },
      {
        id: 'q4',
        question:
          'How did the Spartans manage to hold off the Persians for so long at the narrow pass of Thermopylae?',
        options: [
          'They used cavalry',
          'They were supported by sailors',
          'They utilized the narrow terrain and a wall of shields',
          'They used fire arrows',
        ],
        answer: 'They utilized the narrow terrain and a wall of shields',
      },
      {
        id: 'q5',
        question: 'Which Greek allies joined the Spartans at Thermopylae?',
        options: [
          'Athenians',
          'Phocians and Thespians',
          'Corinthians',
          'Sicyonians',
        ],
        answer: 'Phocians and Thespians',
      },
      {
        id: 'q6',
        question: 'What was the Spartan strategy at Thermopylae?',
        options: [
          'A flank attack',
          'Maneuvering around the enemy',
          'Mobile combat',
          'Standing firm with the phalanx in the narrow pass',
        ],
        answer: 'Standing firm with the phalanx in the narrow pass',
      },
      {
        id: 'q7',
        question: 'How did King Leonidas die?',
        options: [
          'He was killed by a traitor',
          'He drowned while retreating',
          'He died of wounds on the battlefield',
          'He was killed in combat defending his warriors',
        ],
        answer: 'He was killed in combat defending his warriors',
      },
      {
        id: 'q8',
        question:
          'What phrase was engraved on the tomb of the Spartans at Thermopylae?',
        options: [
          '"We gave you a chance."',
          '"Traveler, go tell Sparta that here we lie, obedient to her command."',
          '"We gave our lives for freedom."',
          '"We were unbroken."',
        ],
        answer:
          '"Traveler, go tell Sparta that here we lie, obedient to her command."',
      },
      {
        id: 'q9',
        question:
          'How long did the Spartans hold their position at Thermopylae?',
        options: ['1 day', '3 days', '5 days', '7 days'],
        answer: '3 days',
      },
      {
        id: 'q10',
        question:
          'What was the outcome of the Battle of Thermopylae for the Greek coalition?',
        options: [
          'Loss of Greek independence',
          'A tactical defeat but a strategic victory due to inspiration and unity',
          'Complete destruction of the Persian forces',
          'Spartans became rulers of all Greek city-states',
        ],
        answer:
          'A tactical defeat but a strategic victory due to inspiration and unity',
      },
    ],
    welcome:
      'You have found yourself in the heart of glory and death. Here at Thermopylae, 300 Spartans stood to the last to defend their land from the Persians. Want to learn more about this epic battle? Then you must take my quiz.',
  },
  {score:'0',
    isLocked: true,
    image: require('../assets/images/ancientCity/ancientDelphi.png'),
    warior: require('../assets/images/warior/wariorDelphi.png'),
    name: 'Delphi',
    id: '4',
    levelQuestions: [
      {
        id: 'q1',
        question:
          'Which god was worshiped at Delphi, whose name became a symbol of prophetic powers?',
        options: ['Poseidon', 'Demeter', 'Apollo', 'Zeus'],
        answer: 'Apollo',
      },
      {
        id: 'q2',
        question:
          'How often did Pythia, the priestess of the Oracle at Delphi, receive prophetic visions?',
        options: ['Once a year', 'Once a month', 'Once a week', 'Once a day'],
        answer: 'Once a year',
      },
      {
        id: 'q3',
        question: 'How did Pythia receive her prophecies?',
        options: [
          'By using magical herbs',
          'Through apotheosis—ecstasy induced by vapors from the earth’s fissures',
          'By astral travel',
          'Through direct communication with the gods',
        ],
        options: [
          'By using magical herbs',
          'Through apotheosis—ecstasy induced by vapors from the earth’s fissures',
          'By astral travel',
          'Through direct communication with the gods',
        ],
        answer:
          'Through apotheosis—ecstasy induced by vapors from the earth’s fissures',
      },
      {
        id: 'q4',
        question:
          'What were the words Pythia uttered during her prophecy called?',
        options: [
          'Delphic Hymns',
          'Delphic phrases',
          'Delphic Epigrams',
          'Delphic Epigrams',
        ],
        answer: 'Delphic phrases',
      },
      {
        id: 'q5',
        question: 'Who was allowed to consult the Oracle at Delphi?',
        options: [
          'Only kings',
          'Anyone with a question',
          'Only warriors',
          'Only priestesses',
        ],
        answer: 'Anyone with a question',
      },
      {
        id: 'q6',
        question:
          'What was the nature of most questions asked of the Oracle at Delphi?',
        options: [
          'Religious questions',
          'Political and military questions',
          'Questions about the weather',
          'Personal health inquiries',
        ],
        answer: 'Political and military questions',
      },
      {
        id: 'q7',
        question:
          'What was the goal of those who sought advice from the Oracle at Delphi?',
        options: [
          'Seeking aid in gaining power',
          'Seeking guidance in making critical decisions, especially in battles',
          'Searching for wealth',
          'Pursuing spiritual enlightenment',
        ],
        answer:
          'Seeking guidance in making critical decisions, especially in battles',
      },
      {
        id: 'q8',
        question: 'What did the Oracle’s phrase, "Know thyself," mean?',
        options: [
          'To understand the nature of the gods',
          'To understand the nature of the world',
          'To understand the nature of the self',
          'To understand the nature of the enemy',
        ],
        answer: 'To understand the nature of the self',
      },
      {
        id: 'q9',
        question: 'When did Delphi become the most renowned Oracle in Greece?',
        options: [
          '10th century BCE',
          '5th century BCE',
          '6th–4th century BCE',
          '3rd century CE',
        ],
        answer: '6th–4th century BCE',
      },
      {
        id: 'q10',
        question: 'Which great hero sought help from the Oracle at Delphi?',
        options: ['Odysseus', 'Spartacus', 'Pericles', 'Cleisthenes'],
        answer: 'Odysseus',
      },
    ],
    welcome:
      'You have arrived at Delphi, where Apollo himself bestows his prophecy on the people. Before you can gain access to the truths, you must pass my quiz. Only one who understands the essence of the prophetic words can receive the blessing.',
  },
  {score:'0',
    isLocked: true,
    image: require('../assets/images/ancientCity/ancientCrete.png'),
    warior: require('../assets/images/warior/wariorCrete.png'),
    name: 'Crete',
    id: '5',
    levelQuestions: [
      {
        id: 'q1',
        question:
          'What was one of the greatest achievements of the Minoan civilization?',
        options: [
          'Temple architecture',
          'The Palace of Knossos',
          'The Olympic Games',
          'Theater',
        ],
        answer: 'The Palace of Knossos',
      },
      {
        id: 'q2',
        question:
          'What legend is associated with Crete and its greatest king, Minos?',
        options: [
          'Legend of Perseus',
          'Legend of Heracles',
          'Legend of the Minotaur',
          'Legend of Odysseus',
        ],
        answer: 'Legend of the Minotaur',
      },
      {
        id: 'q3',
        question: 'Who killed the Minotaur in the labyrinth?',
        options: ['Heracles', 'Achilles', 'Theseus', 'Perseus'],
        answer: 'Theseus',
      },
      {
        id: 'q4',
        question:
          'Which civilization arose on the island of Crete, one of the earliest in Europe?',
        options: ['Minoan', 'Mycenaean', 'Phoenician', 'Hellenistic'],
        answer: 'Minoan',
      },
      {
        id: 'q5',
        question: 'Who killed the Minotaur in the labyrinth?',
        options: ['Heracles', 'Achilles', 'Theseus', 'Perseus'],
        answer: 'Theseus',
      },
      {
        id: 'q6',
        question:
          'What was the main economic activity on Crete during the Minoan civilization?',
        options: ['Agriculture', 'Trade', 'Art', 'Trade and seafaring'],
        answer: 'Trade and seafaring',
      },
      {
        id: 'q7',
        question:
          'What were the underground labyrinths called, where the Minotaur was said to have been hidden?',
        options: [
          'The Palace of Knossos',
          'The Labyrinth of Minos',
          'The Cave of Hermion',
          'The Temple of Apollo',
        ],
        answer: 'The Labyrinth of Minos',
      },
      {
        id: 'q8',
        question:
          'What significant culture emerged on Crete after the fall of the Minoan civilization?',
        options: [
          'Spartan culture',
          'Roman culture',
          'Athenian culture',
          'Ancient Greek culture',
        ],
        options: [
          'Spartan culture',
          'Roman culture',
          'Athenian culture',
          'Ancient Greek culture',
        ],
        answer: 'Ancient Greek culture',
      },
      {
        id: 'q9',
        question:
          'Which ancient civilization conquered Crete after the Minoans?',
        options: ['Athenians', 'Spartans', 'Romans', 'Achaeans'],
        answer: 'Achaeans',
      },
      {
        id: 'q10',
        question:
          'What writer first described the Minotaur and the labyrinth in literature?',
        options: ['Homer', 'Sophocles', 'Plutarch', 'Herodotus'],
        answer: 'Plutarch',
      },
    ],
    welcome:
      'You have come to Crete, the heart of myths and an ancient civilization. Before you can access the secrets of this island, you must pass my quiz. Only the one who can understand and reveal the history of this place will gain the power necessary for further conquests.',
  },
];
