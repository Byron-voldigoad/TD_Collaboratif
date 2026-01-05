export interface Article {
  id: number;
  nom: string;
  description: string | null;
  prix: number;
  stock: number;
  image_url: string | null;
  created_at: string;
}

export interface Client {
  id: number;
  email: string;
  nom: string;
  ville: string | null;
  created_at: string;
}
