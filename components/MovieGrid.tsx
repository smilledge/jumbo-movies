import * as React from 'react'
import { styled } from '../theme'
import { MovieSummary } from '../lib/movies/types'
import MovieTile from './MovieTile'

type Props = {
  className?: string
  movies: MovieSummary[],
  title?: string
}

const Title = styled.h2`
  margin: 0 0 1rem;
  line-height: 1.2;
  font-size: ${props => props.theme.h2Size};
  font-family: ${props => props.theme.headingFont};
`

const Grid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
  margin-top: -1.5rem;
`

const Item = styled.div`
  flex: 0 0 50%;
  padding: 0 1rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    flex-basis: 33.333%;
  }

  @media (min-width: 1024px) {
    flex-basis: 25%;
  }

  @media (min-width: 1600px) {
    flex-basis: 20%;
  }
`

const MovieGrid: React.FC<Props> = ({ className, movies, title }) => {
  return (
    <div>
      {title && <Title>{title}</Title>}
      <Grid className={className}>
        {movies.map(m => (
          <Item key={m.id}>
            <MovieTile movie={m} />
          </Item>
        ))}
      </Grid>
    </div>
  )
}

export default MovieGrid
