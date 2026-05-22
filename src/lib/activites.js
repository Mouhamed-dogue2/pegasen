// ============================================================
// DONNÉES 3 NIVEAUX : Zone → Lieu → Activités
// ============================================================

export const ZONES_PANIER = [
  {
    id: 'petite-cote',
    nom: 'Petite Côte',
    emoji: '🏖️',
    couleur: '#1A6B3C',
    image: '/images/destinations/petite-cote.jpg',
    description: 'Plages dorées, villages de pêcheurs et réserves animalières',
    lieux: [
      {
        id: 'bandia',
        nom: 'Réserve de Bandia',
        emoji: '🦁',
        image: '/images/excursions/bandia.jpg',
        description: 'Safari africain avec lions, girafes, rhinocéros et zèbres.',
        activites: [
          { id: 'bandia-safari', nom: 'Safari en véhicule', emoji: '🚙', prix: 25000, unite: 'par personne', inclus: ['Guide local', 'Entrée réserve', 'Transport A/R'] },
          { id: 'bandia-photo', nom: 'Séance photo animalière', emoji: '📸', prix: 5000, unite: 'par personne', inclus: ['1h de session guidée'] },
        ],
      },
      {
        id: 'joal',
        nom: 'Joal-Fadiouth',
        emoji: '🐚',
        image: '/images/excursions/joal-fadiouth.jpg',
        description: 'Île aux coquillages, ville natale de Senghor, pont de 632 m.',
        activites: [
          { id: 'joal-visite', nom: 'Visite guidée de l\'île', emoji: '🗺️', prix: 8000, unite: 'par personne', inclus: ['Guide local', 'Transport A/R'] },
          { id: 'joal-pirogue', nom: 'Retour en pirogue', emoji: '⛵', prix: 3000, unite: 'par personne', inclus: ['Pirogue traditionnelle'] },
          { id: 'joal-cimetiere', nom: 'Visite cimetière mixte', emoji: '⛪', prix: 2000, unite: 'par personne', inclus: ['Guide'] },
        ],
      },
      {
        id: 'nianing',
        nom: 'Nianing & Mbour',
        emoji: '🌳',
        image: '/images/excursions/nianing-mbour.jpg',
        description: 'Baobab sacré, église en coquillage, port de pêche de Mbour.',
        activites: [
          { id: 'nianing-baobab', nom: 'Visite Baobab Sacré', emoji: '🌳', prix: 4000, unite: 'par personne', inclus: ['Guide local'] },
          { id: 'nianing-eglise', nom: 'Église en Coquillage', emoji: '⛪', prix: 2000, unite: 'par personne', inclus: ['Visite guidée'] },
          { id: 'nianing-port', nom: 'Retour des Pêcheurs – Port de Mbour', emoji: '🐟', prix: 3000, unite: 'par personne', inclus: ['Guide', 'Marché artisanal'] },
        ],
      },
      {
        id: 'saly',
        nom: 'Saly',
        emoji: '🏄',
        image: '/images/destinations/petite-cote.jpg',
        description: 'Station balnéaire — plage, sports nautiques, équitation.',
        activites: [
          { id: 'saly-plage', nom: 'Journée plage Palm Beach', emoji: '🏖️', prix: 5000, unite: 'par personne', inclus: ['Transport A/R'] },
          { id: 'saly-jetski', nom: 'Jet-ski (30 min)', emoji: '🚤', prix: 20000, unite: 'par personne', inclus: ['Équipement sécurité'] },
          { id: 'saly-equitation', nom: 'Équitation sur la plage', emoji: '🐴', prix: 15000, unite: 'par personne', inclus: ['Guide équestre', '1h'] },
          { id: 'saly-lutte', nom: 'Spectacle de Lutte Sénégalaise', emoji: '🥊', prix: 5000, unite: 'par personne', inclus: ['Place spectateur'] },
        ],
      },
      {
        id: 'somone',
        nom: 'Somone',
        emoji: '🦜',
        image: '/images/destinations/petite-cote.jpg',
        description: 'Mangroves en pirogue et observation des oiseaux migrateurs.',
        activites: [
          { id: 'somone-pirogue', nom: 'Balade en pirogue – Mangrove', emoji: '🛶', prix: 8000, unite: 'par personne', inclus: ['Pirogue', 'Guide ornithologique'] },
          { id: 'somone-oiseaux', nom: 'Observation des oiseaux', emoji: '🦩', prix: 3000, unite: 'par personne', inclus: ['Jumelles disponibles'] },
        ],
      },
    ],
  },

  {
    id: 'dakar',
    nom: 'Dakar',
    emoji: '🏙️',
    couleur: '#C0392B',
    image: '/images/destinations/dakar.jpg',
    description: 'La capitale vibrante au bout de la presqu\'île du Cap-Vert',
    lieux: [
      {
        id: 'lac-rose',
        nom: 'Lac Rose (Lac Retba)',
        emoji: '🌸',
        image: '/images/excursions/lac-rose.jpg',
        description: 'Lac aux eaux roses uniques, extraction de sel, dunes de sable.',
        activites: [
          { id: 'lacrose-quad', nom: 'Quad sur les dunes', emoji: '🏜️', prix: 25000, unite: 'par personne', inclus: ['Quad 1h', 'Casque', 'Guide'] },
          { id: 'lacrose-pirogue', nom: 'Traversée en pirogue', emoji: '⛵', prix: 8000, unite: 'par personne', inclus: ['Pirogue traditionnelle', 'Gilet de sauvetage'] },
          { id: 'lacrose-sel', nom: 'Découverte récolte du sel', emoji: '🧂', prix: 5000, unite: 'par personne', inclus: ['Guide', 'Démonstration'] },
          { id: 'lacrose-dromadaire', nom: 'Balade dromadaire ou cheval', emoji: '🐪', prix: 12000, unite: 'par personne', inclus: ['30 min', 'Guide équestre'] },
          { id: 'lacrose-dejeuner', nom: 'Déjeuner au bord du lac + piscine', emoji: '🍽️', prix: 15000, unite: 'par personne', inclus: ['Repas complet', 'Accès piscine'] },
        ],
      },
      {
        id: 'goree',
        nom: 'Île de Gorée',
        emoji: '⚓',
        image: '/images/destinations/dakar.jpg',
        description: 'Site UNESCO, Maison des Esclaves, histoire de la traite atlantique.',
        activites: [
          { id: 'goree-bateau', nom: 'Traversée en bateau A/R', emoji: '🚢', prix: 10000, unite: 'par personne', inclus: ['Billet bateau A/R'] },
          { id: 'goree-visite', nom: 'Visite guidée de l\'île', emoji: '🏛️', prix: 8000, unite: 'par personne', inclus: ['Guide local', 'Maison des Esclaves'] },
          { id: 'goree-musee', nom: 'Musée Historique', emoji: '🎨', prix: 4000, unite: 'par personne', inclus: ['Entrée musée'] },
        ],
      },
      {
        id: 'dakar-ville',
        nom: 'Dakar Centre',
        emoji: '🗿',
        image: '/images/destinations/dakar.jpg',
        description: 'Monument de la Renaissance, marchés, Mosquée de la Divinité.',
        activites: [
          { id: 'dakar-monument', nom: 'Monument de la Renaissance (49m)', emoji: '🗿', prix: 8000, unite: 'par personne', inclus: ['Entrée', 'Guide'] },
          { id: 'dakar-sandaga', nom: 'Marché Sandaga – Shopping artisanat', emoji: '🛍️', prix: 5000, unite: 'par personne', inclus: ['Guide shopping', '2h'] },
          { id: 'dakar-mosquee', nom: 'Mosquée de la Divinité', emoji: '🕌', prix: 3000, unite: 'par personne', inclus: ['Visite extérieure guidée'] },
          { id: 'dakar-vilageart', nom: 'Village des Arts – Galeries', emoji: '🖼️', prix: 4000, unite: 'par personne', inclus: ['Visite ateliers', 'Guide culturel'] },
        ],
      },
    ],
  },

  {
    id: 'saloum',
    nom: 'Sine Saloum',
    emoji: '🦅',
    couleur: '#2E7D32',
    image: '/images/destinations/saloum.jpg',
    description: 'Delta enchanteur, bolongs et mangroves classés UNESCO',
    lieux: [
      {
        id: 'ndangane',
        nom: 'Ndangane & Bolongs',
        emoji: '🚣',
        image: '/images/excursions/saloum-excursion.jpg',
        description: 'Point de départ des pirogues dans le delta, bolongs enchanteurs.',
        activites: [
          { id: 'saloum-pirogue', nom: 'Excursion en pirogue – Bolongs', emoji: '🛶', prix: 15000, unite: 'par personne', inclus: ['Pirogue', 'Guide local', 'Transport A/R'] },
          { id: 'saloum-oiseaux', nom: 'Île aux Oiseaux – Sanctuaire naturel', emoji: '🦩', prix: 8000, unite: 'par personne', inclus: ['Pirogue', 'Guide ornithologique'] },
          { id: 'saloum-marlodj', nom: 'Village de Mar Lodj', emoji: '🏘️', prix: 6000, unite: 'par personne', inclus: ['Guide', 'Visite artiste Pierre'] },
          { id: 'saloum-dejeuner', nom: 'Déjeuner pieds dans l\'eau', emoji: '🍽️', prix: 12000, unite: 'par personne', inclus: ['Repas traditionnel sénégalais'] },
        ],
      },
    ],
  },

  {
    id: 'saint-louis',
    nom: 'Saint-Louis',
    emoji: '🌉',
    couleur: '#D4A017',
    image: '/images/destinations/saint-louis.jpg',
    description: 'Ancienne capitale coloniale classée au patrimoine UNESCO',
    lieux: [
      {
        id: 'stl-ile',
        nom: 'Île de Saint-Louis',
        emoji: '🏛️',
        image: '/images/destinations/saint-louis.jpg',
        description: 'Architecture coloniale unique, calèches, ambiance hors du temps.',
        activites: [
          { id: 'stl-visite', nom: 'Visite guidée centre historique', emoji: '🗺️', prix: 15000, unite: 'par personne', inclus: ['Guide francophone', '3h'] },
          { id: 'stl-caleche', nom: 'Tour en calèche', emoji: '🐎', prix: 10000, unite: 'par personne', inclus: ['Calèche 1h'] },
          { id: 'stl-jazz', nom: 'Soirée Jazz de Saint-Louis', emoji: '🎷', prix: 8000, unite: 'par personne', inclus: ['Entrée concert'] },
        ],
      },
      {
        id: 'djoudj',
        nom: 'Parc National du Djoudj',
        emoji: '🦩',
        image: '/images/destinations/saint-louis.jpg',
        description: '3ème réserve ornithologique mondiale — pélicans, flamants roses.',
        activites: [
          { id: 'djoudj-visite', nom: 'Safari ornithologique en bateau', emoji: '🚢', prix: 20000, unite: 'par personne', inclus: ['Bateau', 'Guide', 'Entrée parc'] },
          { id: 'djoudj-photo', nom: 'Session photo naturaliste', emoji: '📷', prix: 8000, unite: 'par personne', inclus: ['Guide naturaliste'] },
        ],
      },
    ],
  },

  {
    id: 'casamance',
    nom: 'Casamance',
    emoji: '🌿',
    couleur: '#2E7D32',
    image: '/images/destinations/casamance.jpg',
    description: 'Le Sénégal vert et mystérieux, pays Diola',
    lieux: [
      {
        id: 'capskirring',
        nom: 'Cap Skirring',
        emoji: '🌴',
        image: '/images/destinations/casamance.jpg',
        description: 'L\'une des plus belles plages d\'Afrique de l\'Ouest.',
        activites: [
          { id: 'cap-plage', nom: 'Journée plage Cap Skirring', emoji: '🏖️', prix: 0, unite: 'sur devis', surDevis: true, inclus: ['Transport A/R', 'Guide'] },
          { id: 'cap-pirogue', nom: 'Pêche en pirogue traditionnelle', emoji: '🎣', prix: 0, unite: 'sur devis', surDevis: true, inclus: ['Pirogue', 'Matériel de pêche'] },
        ],
      },
      {
        id: 'ziguinchor',
        nom: 'Ziguinchor & Villages Diola',
        emoji: '🏘️',
        image: '/images/destinations/casamance.jpg',
        description: 'Capitale de la Casamance, cases à impluvium, rites ancestraux.',
        activites: [
          { id: 'zig-village', nom: 'Visite villages Diola', emoji: '🏘️', prix: 0, unite: 'sur devis', surDevis: true, inclus: ['Guide local', 'Transport A/R'] },
          { id: 'zig-foret', nom: 'Forêt de Cabrousse', emoji: '🌲', prix: 0, unite: 'sur devis', surDevis: true, inclus: ['Guide naturaliste'] },
        ],
      },
    ],
  },

  {
    id: 'oriental',
    nom: 'Sénégal Oriental',
    emoji: '🦁',
    couleur: '#8B4513',
    image: '/images/destinations/senegal-oriental.jpg',
    description: 'Savane sauvage, chutes et pays Bassari',
    lieux: [
      {
        id: 'kedougou',
        nom: 'Kédougou & Chutes de Dindefelo',
        emoji: '🌊',
        image: '/images/destinations/senegal-oriental.jpg',
        description: 'Cascade de 100m, panoramas exceptionnels, pays Bassari UNESCO.',
        activites: [
          { id: 'ked-chutes', nom: 'Randonnée Chutes de Dindefelo', emoji: '🌊', prix: 20000, unite: 'par personne', inclus: ['Guide local', 'Transport depuis Kédougou'] },
          { id: 'ked-bassari', nom: 'Village Bassari classé UNESCO', emoji: '🏺', prix: 15000, unite: 'par personne', inclus: ['Guide culturel', 'Cérémonie traditionnelle'] },
          { id: 'ked-orpaillage', nom: 'Découverte orpaillage traditionnel', emoji: '⛏️', prix: 10000, unite: 'par personne', inclus: ['Guide', 'Démonstration'] },
        ],
      },
    ],
  },
]