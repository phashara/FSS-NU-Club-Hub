export interface ClubInfo {
  id: string;
  name: string;
  shortName: string;
  category: 'academic' | 'sports' | 'social' | 'student_union' | 'affairs';
  categoryLabel: string;
  description: string;
  facebookUrl?: string;
  instagramUrl?: string;
  accentColor: string;
  badgeBg: string;
  tagline: string;
}

export interface PostItem {
  id: string;
  clubId: string;
  title: string;
  content: string;
  publishedAt: string;
  source: 'facebook' | 'instagram' | 'announcement';
  sourceUrl?: string;
  imageUrl?: string;
  category: 'activity' | 'recruitment' | 'announcement' | 'competition' | 'welfare';
  categoryLabel: string;
  eventDate?: string;
  location?: string;
  isPinned?: boolean;
}

export type FilterCategory = 'all' | 'activity' | 'recruitment' | 'announcement' | 'competition' | 'welfare';
export type FilterSource = 'all' | 'facebook' | 'instagram' | 'official';
