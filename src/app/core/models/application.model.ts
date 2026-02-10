export interface Application {
  id?: number;
  userId: number;
  jobSlug: string;
  title: string;
  company: string;
  location: string;
  url: string;
  status: ApplicationStatus;
  notes?: string;
  dateAdded: string;
}

export enum ApplicationStatus {
  EN_ATTENTE = 'en_attente',
  ACCEPTE = 'accepte',
  REFUSE = 'refuse'
}

export interface CreateApplicationRequest {
  userId: number;
  jobSlug: string;
  title: string;
  company: string;
  location: string;
  url: string;
  status?: ApplicationStatus;
  notes?: string;
}

export interface UpdateApplicationRequest {
  status?: ApplicationStatus;
  notes?: string;
}
