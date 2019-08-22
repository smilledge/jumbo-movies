import * as React from 'react'
import { useRef } from 'react'
import { styled, movieRatingColor } from '../theme'
import { MovieSummary } from '../lib/movies/types'
import { usePosterImage } from '../lib/movies/hooks'
import { displayRating } from '../lib/movies/utils'
import Loader from './Loader'
import { usePosterHoverEffect } from '../animations/PosterHoverEffect'

type Props = {
  className?: string
  movie: MovieSummary
}

const Poster = styled.div`
  position: relative;

  .media,
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.625rem;
    overflow: hidden;
    box-shadow: ${props => props.theme.shadow};
    transition: box-shadow 0.5s;

    &:hover {
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    }
  }
`

const Ratio = styled.div`
  width: 100%;
  padding-top: ${Math.floor(233 / 155 * 100)}%;
`

const Rating = styled.div<Props>`
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  padding: 0 0.5rem;
  line-height: 1.25rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  border-radius: 0.5rem;
  background-color: ${props => movieRatingColor(props.movie)};
  pointer-events: none;

  @media (min-width: 1024px) {
    top: 0.5rem;
    left: 0.5rem;
    padding: 0 0.75rem;
    line-height: 1.5rem;
    font-size: 0.875rem;
  }
`

const MoviePoster: React.FC<Props> = ({ className, movie }) => {
  const [isLoading, imageUrl] = usePosterImage(movie.poster_path, 'w500')

  const containerRef = useRef<HTMLDivElement | null>(null)
  const posterRef = useRef<HTMLDivElement | null>(null)
  usePosterHoverEffect(containerRef, posterRef)

  return (
    <Poster className={className} ref={containerRef}>
      <Ratio />
      {isLoading && <Loader size="2rem" />}
      {
        !isLoading && imageUrl &&
        <div className="media" ref={posterRef}>
          <img src={imageUrl} alt={movie.title} />
          <Rating movie={movie}>{displayRating(movie)}</Rating>
        </div>
      }
    </Poster>
  )
}

export default MoviePoster
