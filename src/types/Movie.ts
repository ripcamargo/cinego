export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail extends Movie {
  overview: string
  genres: Genre[]
}