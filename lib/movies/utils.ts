import { MovieDetails, MovieSummary } from './types'

export function displayRating (movie: MovieDetails | MovieSummary): string {
  return `${Math.floor((movie.vote_average || 0) * 10)}%`
}
