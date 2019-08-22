import * as React from 'react'
import Link from 'next/link'
import { styled } from '../theme'
import { MovieSummary } from '../lib/movies/types'
import { useReleaseDate } from '../lib/movies/hooks'
import MoviePoster from './MoviePoster'

type Props = {
  movie: MovieSummary
}

const Tile = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`

const Title = styled.h4`
  margin: 0.75rem 0 0.375rem;
  line-height: 1.2;
  font-size: 0.875rem;
  font-weight: normal;

  @media (min-width: 1024px) {
    margin: 1rem 0 0.5rem;
    font-size: 1rem;
  }
`

const Date = styled.div`
  line-height: 1;
  font-size: 0.75rem;
  color: #A1D1E5;

  @media (min-width: 1024px) {
    font-size: 0.875rem;
  }
`

const MovieTile: React.FC<Props> = ({ movie }) => {
  const displayDate = useReleaseDate('MMMM, yyyy', movie)

  return (
    <Link href={`/movie?id=${movie.id}`} as={`/movie/${movie.id}/`}>
      <Tile>
        <MoviePoster className="poster" movie={movie} />
        <Title>{movie.title}</Title>
        {displayDate && <Date>{displayDate}</Date>}
      </Tile>
    </Link>
  )
}

export default MovieTile
