export type MovieQuery = {
  query?: string
  page?: string
}

export interface MovieSummary {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  vote_count: number
}

export interface MovieDetails extends MovieSummary {
  runtime: number
}
