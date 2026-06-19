import { Review, ServiceItem } from './types';

export const reviewsData: Review[] = [
  {
    id: "rev-1",
    author: "Amsterdamse Boedelruiming",
    role: "Local Guide",
    rating: 5.0,
    date: "Hace 2 años",
    avatarText: "AB",
    source: "Google Maps",
    text: "Me ayudan con el trabajo en la cocina. Todo se hizo excelente, según mi gusto. Voy a continuar con Leonardo si falta algo. Mas el sabe el mercado de buenos aires para que recomendar donde se venden por un buen precio. Al final super!",
    ownerReply: "Muchas gracias por su reseña. Saludos."
  },
  {
    id: "rev-2",
    author: "Héctor 'Tito' Dubon",
    role: "Local Guide · 330 reseñas",
    rating: 5.0,
    date: "Hace un año",
    avatarText: "HD",
    source: "Google Maps",
    text: "Leo realiza un trabajo muy prolijo, de calidad y con precios justos. Además tiene contactos para conseguir los materiales a excelente precio. Hice trabajos de colocación de taparrollos de chapa, entre otros refracciones parecidas de excelente nivel.",
    ownerReply: "Muchas gracias Héctor, un placer haber cumplido tus expectativas."
  },
  {
    id: "rev-3",
    author: "Ariel Guerra",
    role: "Local Guide · 28 reseñas",
    rating: 5.0,
    date: "Hace 2 años",
    avatarText: "AG",
    source: "Google Maps",
    text: "Lo contraté para reciclar departamento. Cumplieron 100% con todo lo pactado. Muy recomendable precio/calidad. Y sobre todo buena gente.",
    ownerReply: "Muchas gracias por su reseña. Un placer cumplir con sus expectativas."
  },
  {
    id: "rev-4",
    author: "María Eugenia Fernández",
    role: "Propietaria Belgrano",
    rating: 5.0,
    date: "Hace 6 meses",
    avatarText: "MF",
    source: "Google Maps",
    text: "Excelente experiencia con Leonardo y su equipo. Hicieron la reforma del baño completo. Súper limpios, prolijos con la colocación del porcelanato y siempre puntuales. Me ahorraron muchísimo dinero recomendándome locales en Avenida Alberdi.",
    ownerReply: "Gracias María Eugenia! Disfrutá mucho de tu nuevo baño."
  },
  {
    id: "rev-5",
    author: "Ignacio Scaglione",
    role: "Propietario Palermo",
    rating: 5.0,
    date: "Hace 8 meses",
    avatarText: "IS",
    source: "Google Maps",
    text: "Súper profesionales. Cambiamos las aberturas y reciclamos la cocina de un depto antiguo. Destaco la puntualidad de Leo y la claridad con la que maneja los números. No hubo sorpresas ni costos ocultos.",
    ownerReply: "Muchísimas gracias Ignacio, un gran abrazo."
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: "srv-kitchen",
    title: "Remodelación de Cocinas",
    shortDescription: "Diseño y renovación integral de cocinas optimizando funcionalidad, almacenamiento y estética.",
    longDescription: "Transformamos cocinas combinando diseño moderno y alta durabilidad. Realizamos cambio de cañerías, instalación eléctrica adaptada a electrodomésticos de alta potencia, revestimientos cerámicos o porcelanatos, instalaciones de mesadas de granito, cuarzo o mármol, y colocación de carpintería y amoblamientos a medida para optimizar cada rincón.",
    image: "/src/assets/images/kitchen_remodel_1781879655000.jpg",
    highlights: ["Sustitución completa de cañerías e instalaciones", "Colocación de mesadas premium y bachas dobles", "Desarrollo de mobiliario de melamina a medida", "Distribuciones inteligentes en U, L o con isla flotante"],
    durationWeeksRange: "2 - 4 semanas"
  },
  {
    id: "srv-bathroom",
    title: "Remodelación de Baños",
    shortDescription: "Creación de baños modernos, funcionales y resistentes a la humedad, con terminaciones de alta calidad.",
    longDescription: "Damos vida a baños elegantes y confortables. Nos encargamos de la impermeabilización completa para evitar filtraciones, instalación de cañerías de agua fría, caliente y desagües, colocación de duchas y mamparas premium de vidrio templado, revestimiento fino con cortes a escuadra impecables, instalación de sanitarios y griferías monocomando de primeras marcas.",
    image: "/src/assets/images/bathroom_remodel_1781879668565.jpg",
    highlights: ["Colocación experta de porcelanatos y azulejos", "Instalación de mamparas de vidrio templado y desagües lineales", "Guardas decorativas e iluminación perimetral sutil", "Renovación integral de sistemas fluviales y cloacales"],
    durationWeeksRange: "2 - 3 semanas"
  },
  {
    id: "srv-apartment",
    title: "Reciclado de Departamentos",
    shortDescription: "Reformas integrales llave en mano para refaccionar unidades antiguas o redistribuir espacios.",
    longDescription: "Renovamos departamentos de forma total o parcial para adaptarlos a el estilo de vida actual. Demolición selectiva de muros para crear ambientes de concepto abierto (open plan), renovación de tabiquería de yeso, tendidos de cableado eléctrico homologados, carpintería metálica de alta calidad (incluyendo colocación experta de taparrollos de chapa) y pintura general.",
    image: "/src/assets/images/apartment_remodel_1781879679640.jpg",
    highlights: ["Unión de living y cocina (concepto open concept)", "Pintura general al látex y enduido completo", "Instalación y reparación de aberturas y aberturas taparrollo", "Colocación de flotantes, vinílicos o restauración de parquet"],
    durationWeeksRange: "4 - 8 semanas"
  }
];

// Reference neighborhoods in CABA for dropdowns
export const neighborhoodList = [
  "Palermo",
  "Recoleta",
  "Belgrano",
  "Almagro",
  "Caballito",
  "Villa Crespo",
  "Colegiales",
  "Chacarita",
  "Flores",
  "San Telmo",
  "Saavedra",
  "Nuñez",
  "Otras zonas de CABA"
];

// Local estimators guideline
export const US_BLUE_EXCHANGE_RATE = 1200; // Guideline value for display calculation if requested
export const ESTIMATOR_TIERS = {
  projectTypes: [
    { id: 'kitchen', name: 'Cocina Integral', basePriceSqmUSD: 280, minSqm: 4, desc: 'Mesadas, cañerías, amoblamiento, electricidad y revestimiento' },
    { id: 'bathroom', name: 'Baño Completo', basePriceSqmUSD: 310, minSqm: 3, desc: 'Grifería, cerámicos, mampara, sanitarios y plomería' },
    { id: 'apartment', name: 'Reciclado Completo de Depto', basePriceSqmUSD: 180, minSqm: 30, desc: 'Paredes, aberturas, pintura, pisos, abarcando toda la planta' },
    { id: 'painting', name: 'Pintura y Reparaciones Menores', basePriceSqmUSD: 45, minSqm: 20, desc: 'Enduido, lija, látex premium en paredes y cielorrasos' }
  ],
  qualities: [
    { id: 'Standard', name: 'Línea Funcional', multiplier: 1.0, details: 'Materiales nobles nacionales, grifería FV clásica, pisos de porcelanato nacional o vinílicos de buena durabilidad.' },
    { id: 'Premium', name: 'Línea Exclusiva', multiplier: 1.35, details: 'Mesadas de cuarzo tipo silestone, griferías monocomando FV/Ferrum de alta gama, porcelanatos rectificados grandes.' },
    { id: 'Luxury', name: 'Línea de Autor', multiplier: 1.7, details: 'Diseño ultra-personalizado, mármol importado, griferías empotradas italianas o españolas, detalles en madera noble lustrada.' }
  ]
};
