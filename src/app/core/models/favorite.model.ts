export interface Favorite {
  id?: number;
  userId: number;
  jobSlug: string;
  title: string;
  company: string;
  location: string;
  url: string;
  savedAt: string;
}

export interface CreateFavoriteRequest {
  userId: number;
  jobSlug: string;
  title: string;
  company: string;
  location: string;
  url: string;
}
