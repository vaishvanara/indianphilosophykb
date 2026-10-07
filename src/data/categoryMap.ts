export interface TermItem {
  slug: string;
  title: string;
  devanagari?: string;
  iast?: string;
}

export interface SubCategory {
  id: string;
  title: string;
  description?: string;
  termSlugs: string[];
}

export interface PartCategory {
  id: string;
  number: number;
  title: string;
  description?: string;
  subcategories: SubCategory[];
}

export const CATEGORY_MAP: PartCategory[] = [
  {
    id: 'part-1-epistemology',
    number: 1,
    title: 'Part 1: Epistemology and epistemic foundations',
    description: 'The sources, means, methods, and validity of philosophical knowledge',
    subcategories: [
      {
        id: 'jnana',
        title: 'Jñāna (Knowledge)',
        description: 'Self-realization, higher knowledge, direct experience, and intuition',
        termSlugs: [
          'abheda-darsana', 'akhandakara-vrtti-jnana', 'alaukika', 'anubhava', 'aparoksa-jnana',
          'atma-jnana', 'atma-saksatkara', 'atma-vidya', 'atmanubhava', 'avadhi',
          'bhagavad-anubhava', 'bhakti-rupapanna-jnana', 'brahma-jnana', 'indriya-anapeksa',
          'mahatmya-jnana', 'pratibha', 'saksatkara', 'svanubhava', 'tattva-darsana',
          'asamprajnata', 'jnana', 'jnana-sakti', 'jnana-svarupa', 'kevala-jnana', 'para-vidya',
          'prajna', 'pratibhana-jnana', 'sadvidya', 'suddha-vidya', 'svarupa-jnana', 'svayam-siddha',
          'tattva-jnana', 'tattvavabodha', 'vidya', 'vijnana'
        ]
      },
      {
        id: 'pramana',
        title: 'Pramāṇa (Means of valid knowledge)',
        description: 'Valid means of knowledge',
        termSlugs: [
          'anumana', 'anupalabdhi', 'arthapatti', 'caksu-darsana', 'prama',
          'pramana', 'pratyaksa', 'samvadi-bhrama', 'yukti'
        ]
      },
      {
        id: 'sastra',
        title: 'Śāstra (Scriptures and sacred dialogues)',
        description: 'Authoritative sources',
        termSlugs: [
          'akhandartha-vakya', 'darsana', 'devanagari', 'sanskrita', 'sastra',
          'siddhartha-vakya', 'sruti', 'srsti-vakya', 'vedanta', 'prasthana-traya',
          'upanisad', 'bhagavad-gita', 'brahma-sutra', 'mandukyopanisat'
        ]
      },
      {
        id: 'vada',
        title: 'Vāda (Philosophical discussion)',
        description: 'Theories of causality, error, non-origination, and dialectical debate',
        termSlugs: [
          'abhasa-vada', 'adhyaropapavada', 'ajati', 'ajativada', 'anirvacaniya-khyati',
          'atma-vada', 'avaccheda-vada', 'bimba-pratibimba-vada', 'drishti-srishti-vada',
          'eka-jiva-vada', 'khyati', 'samsarga-abheda', 'satkarana-vada', 'vivarta-vada'
        ]
      },
      {
        id: 'sabda',
        title: 'Śabda (Sound)',
        description: 'Metaphysical and linguistic aspects of sound, sacred speech, and vibration',
        termSlugs: [
          'avakyartha', 'omkara', 'padartha', 'sabda', 'vakyartha', 'para',
          'pasyanti', 'madhyama', 'vaikhari', 'akara', 'makara', 'ukara'
        ]
      }
    ]
  },
  {
    id: 'part-2-ontology',
    number: 2,
    title: 'Part 2: Ontology and ultimate reality',
    description: 'Core metaphysical truths and the nature of non-dual reality',
    subcategories: [
      {
        id: 'brahma-svarupa',
        title: 'Brahma-Svarūpa (The nature of the Absolute)',
        description: 'Ontological reality, core entities, transcendental attributes, and cosmic pervasiveness',
        termSlugs: [
          'adhistana', 'advaita', 'advayam-ajatam', 'asat', 'atman', 'brahman', 'parabrahman',
          'paramartha', 'paramatman', 'pratyaktva', 'pratyagatman', 'purusottama', 'saccidananda',
          'sat', 'satta', 'svabhava', 'amala', 'anadi', 'ananta', 'kevala', 'niranjana',
          'nirapeksa', 'nirguna', 'santa', 'sasvata', 'bhati', 'sarvagata', 'sarva-kartrtva',
          'sarvajna', 'svayambhu', 'svayam-jyoti', 'vibhu', 'visvadhika'
        ]
      },
      {
        id: 'moksa-and-vibhuti',
        title: 'Mokṣa and Vibhūti (Liberation and divine powers)',
        description: 'States of liberation, unitive absorption, and spiritual or divine glory',
        termSlugs: [
          'aisvarya', 'brahma-bhava', 'ekibhava', 'jivanmukta', 'kaivalya', 'moksa',
          'niravadhikaisvarya', 'sadyomukti', 'sayujya', 'sthitaprajna', 'vibhuti'
        ]
      },
      {
        id: 'tattva',
        title: 'Tattva (Principle)',
        description: 'Fundamental principles in Advaita Vedānta and Sāṅkhya',
        termSlugs: [
          'tattva', 'tat', 'tvam', 'tanmatra', 'mahabhuta', 'karmendriya', 'jnanendriya', 'manah', 'purusa'
        ]
      },
      {
        id: 'guna',
        title: 'Guṇa (Qualities)',
        description: 'The three foundational qualities of nature',
        termSlugs: ['guna', 'sattva', 'rajas', 'tamas']
      }
    ]
  },
  {
    id: 'part-3-cosmology',
    number: 3,
    title: 'Part 3: Cosmology and metaphysical mechanics',
    description: 'How the universe manifests, transforms, and dissolves',
    subcategories: [
      {
        id: 'brahmapada',
        title: 'Brahmapada (The abode of Brahman)',
        description: 'Macrocosmic and microcosmic planes of Brahman',
        termSlugs: [
          'brahmapada', 'virat', 'hiranyagarbha', 'isvara', 'turiya', 'vaisvanara', 'taijasa', 'prajna'
        ]
      },
      {
        id: 'srshti',
        title: 'Sṛṣṭi (Creation and cosmic emanation)',
        description: 'Origin, structures, and primordial states of the manifested universe',
        termSlugs: [
          'abhinnanimittopadana', 'bindu', 'brahmanda', 'jagat', 'nama', 'namarupa',
          'parinama', 'prakrti', 'srsti', 'yonih'
        ]
      },
      {
        id: 'pralaya-and-vinasa',
        title: 'Pralaya and Vināśa (Dissolution, decay, and destruction)',
        description: 'Cosmic dissolution, decay, and return into latency',
        termSlugs: [
          'atyantika-pralaya', 'mahapralaya', 'mahasunya', 'pralaya', 'prapancanasana', 'samhara', 'vinasa'
        ]
      },
      {
        id: 'sakti-kala-and-maya',
        title: 'Śakti, Kāla, and Māyā (Cosmic dynamics, time, and universal potencies)',
        description: 'Fundamental forces, divine powers, and temporal dimensions',
        termSlugs: [
          'ananda-sakti', 'anandamaya', 'avarana', 'kala', 'mahamaya', 'maya', 'maya-sakti',
          'mulavidya', 'samsara', 'trikala'
        ]
      }
    ]
  },
  {
    id: 'part-4-psychology',
    number: 4,
    title: 'Part 4: Psychology and subjective consciousness',
    description: 'The inner architecture of individual consciousness',
    subcategories: [
      {
        id: 'catur-avastha',
        title: 'Catur-Avasthā (Primary states of consciousness and beyond)',
        description: 'Foundational planes of experience from waking to transcendental',
        termSlugs: [
          'jagrat', 'jagarita-sthana', 'svapna', 'svapna-sthana', 'susupti', 'susupta-sthana',
          'turiyatita', 'gunatita'
        ]
      },
      {
        id: 'saksin',
        title: 'Sākṣin (Subjective witness and higher attributes)',
        description: 'Unchanging witness-consciousness and its luminous characteristics',
        termSlugs: [
          'alinga', 'cid-abhasa', 'cidakasa', 'cit', 'jyotismati', 'prasanta-vahita', 'prakasa',
          'saksi-caitanyah', 'saksin'
        ]
      },
      {
        id: 'antah-karana',
        title: 'Antaḥ-Karaṇa (Internal instruments)',
        description: 'The fourfold internal mind complex',
        termSlugs: ['antah-karana', 'ahankara', 'buddhi', 'citta', 'hrdaya', 'karana-citta', 'sankalpa']
      },
      {
        id: 'citta-vrtti',
        title: 'Citta-Vṛtti (Modifications of the mind)',
        description: 'Mental fluctuations, cognitive processes, and latent impressions',
        termSlugs: [
          'agrahana', 'avidya-vrtti', 'citta-vrtti', 'nidra', 'phala-vyapyatva', 'pratyaya',
          'saksi-bhasya', 'samskara', 'smrti', 'vasana', 'vikalpa', 'viksepa', 'viparyaya',
          'vrtti', 'vrtti-jnana'
        ]
      },
      {
        id: 'samadhi-and-samapatti',
        title: 'Samādhi and Samāpatti (States of meditative absorption)',
        description: 'Refinement of awareness and unitive meditative absorption',
        termSlugs: [
          'ekagrata', 'samapatti', 'sabija', 'savitarka', 'nirvitarka', 'savicara', 'nirvicara',
          'dharma-megha-samadhi', 'niralambana', 'samadhi', 'nirbija'
        ]
      },
      {
        id: 'klesa',
        title: 'Kleśa (Affliction)',
        description: 'The five root mental afflictions causing suffering',
        termSlugs: ['klesa', 'avidya', 'ajnana', 'asmita', 'ragah', 'dvesah', 'abhinivesah']
      },
      {
        id: 'iccha-sakti',
        title: 'Icchā-Śakti (Will power)',
        description: 'Volition, spiritual effort, resolve, and sense mastery',
        termSlugs: [
          'dhrti', 'iccha', 'iccha-sakti', 'indriya-nigraha', 'manonigraha', 'pratipaksa-bhavana',
          'sama-and-dama', 'tapas', 'vairagya', 'virya', 'viveka'
        ]
      }
    ]
  },
  {
    id: 'part-5-embodiment',
    number: 5,
    title: 'Part 5: Embodiment, energetics, and physiology',
    description: 'The nature and condition of the individual embodied soul in Saṃsāra',
    subcategories: [
      {
        id: 'jiva',
        title: 'Jīva (Empirical self)',
        description: 'Individual living soul and empirical self',
        termSlugs: ['jiva', 'jivatman']
      },
      {
        id: 'sarira',
        title: 'Śarīra (Bodies of the Jīva)',
        description: 'Causal, subtle, and gross bodies of the soul',
        termSlugs: ['sarira', 'karana-sarira', 'suksma-sarira', 'linga-sarira', 'sthula-sarira']
      },
      {
        id: 'kosa',
        title: 'Kośa (Sheath)',
        description: 'The five concentric sheaths enveloping pure consciousness',
        termSlugs: ['kosa', 'anandamaya-kosa', 'pranamaya-kosa', 'manomaya-kosa', 'vijnanamaya-kosa', 'annamaya-kosa']
      },
      {
        id: 'bahya-karana',
        title: 'Bahya-Kāraṇa (External instruments)',
        description: 'Organs of knowledge, organs of action, subtle essences, and great elements',
        termSlugs: [
          'bahya-karana', 'srotra', 'tvak', 'caksuh', 'jihva', 'ghrana', 'vak', 'pani', 'pada',
          'payu', 'upastha', 'sparsa', 'rupa', 'rasa', 'gandha', 'akasa', 'vayu', 'tejas', 'apas', 'prthvi'
        ]
      },
      {
        id: 'prana',
        title: 'Prāṇa (Breath)',
        description: 'The five vital life currents sustaining the physical and subtle body',
        termSlugs: ['prana', 'apana', 'samana', 'vyana', 'udana']
      },
      {
        id: 'kundalini',
        title: 'Kuṇḍalinī (Subtle energy and chakras)',
        description: 'Coiled subtle energy and the seven energetic centers',
        termSlugs: ['kundalini', 'muladhara', 'svadhisthana', 'manipura', 'anahata', 'visuddhi', 'ajna', 'sahasrara']
      }
    ]
  },
  {
    id: 'part-6-practical-discipline',
    number: 6,
    title: 'Part 6: Practical discipline and methodology',
    description: 'Ethical, mental, and meditative practices to achieve liberation',
    subcategories: [
      {
        id: 'sadhana',
        title: 'Sādhana (Core frameworks and major paths)',
        description: 'Essential disciplines, foundational spiritual paths, and methods of inquiry',
        termSlugs: [
          'mukhya-antaranga-sadhana', 'abhyasa', 'astanga-yoga', 'bhakti-yoga', 'jnana-yoga',
          'manana', 'mantra', 'mantra-yoga', 'mauna', 'nididhyasana', 'nididhyasitavya',
          'nirgunopasana', 'sadhana', 'sadhana-catustaya', 'samyama', 'sravana', 'svadhyaya'
        ]
      },
      {
        id: 'vicara-and-viveka',
        title: 'Vicāra and Viveka (Inquiry and discrimination)',
        description: 'Methods of spiritual inquiry, analytical discernment, and cognitive negation',
        termSlugs: [
          'atma-vicara', 'avastha-traya-vicara', 'brahma-vicara', 'neti-neti',
          'panca-kosa-viveka', 'panca-bhuta-viveka', 'vicara'
        ]
      },
      {
        id: 'bhakti',
        title: 'Bhakti (Devotion, surrender, and divine grace)',
        description: 'Loving devotion, single-minded surrender, and reception of divine grace',
        termSlugs: [
          'bhakti', 'isvara-pranidhana', 'aradhana', 'goptrtva-varana', 'anugraha',
          'prasada', 'asirvadam', 'svastu'
        ]
      },
      {
        id: 'suddhi',
        title: 'Śuddhi (Purification, sense restraint, and mental control)',
        description: 'Cleansing the mind, subduing the senses, and cultivating detachment',
        termSlugs: [
          'citta-suddhi', 'manah-suddhi', 'manogupti', 'suddhi', 'vasikara',
          'sat-sampat', 'sattva-suddhi'
        ]
      },
      {
        id: 'dharma-bhava',
        title: 'Dharma Bhāva (Moral virtues and refined states)',
        description: 'Ethical virtues, noble mental dispositions, and spiritual attitudes',
        termSlugs: [
          'abhaya', 'abhimukti', 'akusidasya', 'anuraga', 'daya', 'dharma-bhava',
          'karuna', 'kalyana', 'ksama', 'ksanti', 'maitri', 'mardava', 'mudita',
          'mumuksutva', 'samarpana', 'saumanasya', 'sukha', 'sraddha', 'sreyas', 'upeksa'
        ]
      },
      {
        id: 'astanga-yoga',
        title: 'Aṣṭāṅga-Yoga (Eight limbs of Yoga)',
        description: 'The classical eightfold path of Raja Yoga',
        termSlugs: ['asana', 'pranayama', 'pratyahara', 'dharana', 'dhyana']
      },
      {
        id: 'yama',
        title: 'Yama (Abstentions)',
        description: 'Ethical restraints and universal vows',
        termSlugs: ['yama', 'ahimsa', 'satya', 'asteya', 'brahmacarya', 'aparigraha']
      },
      {
        id: 'niyama',
        title: 'Niyama (Observances)',
        description: 'Internal purifications and spiritual disciplines',
        termSlugs: ['niyama', 'sauca', 'santosa']
      },
      {
        id: 'karma',
        title: 'Karma (Action)',
        description: 'Principles, classifications, and cosmic effects of volitional action',
        termSlugs: [
          'karma', 'naiskarmya', 'prarabdha-karma', 'sancita-karma', 'agami-karma',
          'sukla', 'krsna', 'sukla-krsna', 'asukla-krsna'
        ]
      }
    ]
  },
  {
    id: 'part-7-traditions-and-texts',
    number: 7,
    title: 'Part 7: Specific traditions, texts, and auxiliary figures',
    description: 'Text-specific terms, sayings, divine entities, and non-orthodox systems',
    subcategories: [
      {
        id: 'vedanta-and-advaita',
        title: 'Vedānta and Advaita (Philosophical concepts)',
        description: 'Core non-dual principles, analytical distinctions, and levels of reality',
        termSlugs: [
          'adhyasa', 'alata-santi', 'badhayam-samanadhikaranya', 'jiva-brahma-aikya',
          'mithya', 'pratibhasika', 'svarupa-abheda', 'svarupa-laksana', 'tatastha-laksana',
          'vyavaharika'
        ]
      },
      {
        id: 'mahavakya',
        title: 'Mahāvākya (Great saying)',
        description: 'The core contemplative statements of identity in Upanishads',
        termSlugs: [
          'mahavakya', 'aham-brahmasmi', 'ayam-atma-brahma', 'ekam-eva-advitiyam',
          'prajnanam-brahma', 'sarvam-khalvidam-brahma', 'tat-tvam-asi', 'so-ham'
        ]
      },
      {
        id: 'devata',
        title: 'Devatā (Deities and sacred figures)',
        description: 'Divine aspects, celestial beings, holy titles, and revered spiritual figures',
        termSlugs: [
          'achala', 'adinatha', 'amitabha', 'avatara', 'bhagavan', 'bhuvana-sundara',
          'bodhisattva', 'cakravartin', 'devata', 'devatma-sakti', 'divya', 'harih',
          'mahadeva', 'mahan', 'mahesvara', 'mauni', 'namaskara', 'narayana', 'paramesvara',
          'pasupati', 'radha', 'sadasiva', 'sarasvati', 'sarvesvarah', 'sadhu', 'siddha',
          'sakti', 'siva', 'tathagata', 'vasudeva', 'visnu'
        ]
      },
      {
        id: 'buddhist-and-jain',
        title: 'Buddhist and Jain concepts',
        description: 'Key doctrines, ethical perfections, and terms from Śramaṇa traditions',
        termSlugs: [
          'anuttara', 'aryasatya', 'avaktavya', 'bodhi', 'brahma-vihara',
          'catvari-arya-satyani', 'dana-paramita', 'divya-caksuh', 'nirvana', 'sadhumati', 'sudurjaya'
        ]
      }
    ]
  }
];

// Helper lookup mapping slug -> category hierarchy details
export function getCategoryForTerm(slug: string): { part: PartCategory; subcategory: SubCategory } | undefined {
  for (const part of CATEGORY_MAP) {
    for (const subcategory of part.subcategories) {
      if (subcategory.termSlugs.includes(slug)) {
        return { part, subcategory };
      }
    }
  }
  return undefined;
}

// Flat list of all terms ordered sequentially for Prev/Next navigation
export function getAllOrderedSlugs(): string[] {
  const slugs: string[] = [];
  for (const part of CATEGORY_MAP) {
    for (const subcategory of part.subcategories) {
      slugs.push(...subcategory.termSlugs);
    }
  }
  return Array.from(new Set(slugs));
}
