export type Movie = {
  id: number;
  title: string;
  year: number;
  poster?: string | null;

  description: string;
  runtime: number;
  country: string;
  budget: number;
  directorId: number;

  director?: {
    id: number;
    name: string;
  };

  actors?: {
    id: number;
    actor: {
      id: number;
      name: string;
    };
  }[];

  genres?: {
    id: number;
    genre: {
      id: number;
      name: string;
    };
  }[];

  ratings?: {
    id: number;
    rating: {
      id: number;
      rating: number;
      votes: number;
      viewer: string;
    };
  }[];
};