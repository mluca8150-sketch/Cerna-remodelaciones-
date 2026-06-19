export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  role?: string;
  avatarText: string;
  source: 'Google Maps' | 'Instagram' | 'Facebook';
  text: string;
  fullText?: string;
  ownerReply?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  highlights: string[];
  durationWeeksRange: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  neighborhood: string;
  projectType: string;
  sizeSqm: number;
  quality: 'Standard' | 'Premium' | 'Luxury';
  details: string;
  date: string;
  estimatedBudget?: number;
}
