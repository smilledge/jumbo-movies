import * as React from 'react'
import { styled } from '../theme'
import BaseContainer from './Container'
import Loader from './Loader'
import BaseMoviePoster from './MoviePoster'
import BaseBackButton from './BackButton'
import { MovieDetails } from '../lib/movies/types'
import { useBackdropImage, useReleaseDate, useRuntime } from '../lib/movies/hooks'
import { displayRating } from '../lib/movies/utils'

type Props = {
  movie: MovieDetails
}

const Header = styled.header`
  position: relative;
  min-height: 192px;
`

const BackButton = styled(BaseBackButton)`
  position: absolute;
  top: 0.5rem;
  left: 0;
  z-index: 2;
`

const Container = styled(BaseContainer)`
  display: flex;
  align-items: flex-start;
`

const Details = styled.div`
  margin: 1.25rem 0 0 1.25rem;

  @media (min-width: 768px) {
    margin: 2rem 0 0 2rem;
  }
`

const Title = styled.h1`
  margin: 0 0 0.875rem;
  line-height: 1.1;
  font-size: 1.75rem;
  font-family: ${props => props.theme.headingFont};
`

const Meta = styled.div`
  line-height: 1.75;
  font-size: 0.75rem;
  font-family: ${props => props.theme.headingFont};
  color: #B8D8E5;

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`

const Backdrop = styled.div`
  position: relative;
  min-height: 245px;
  background-color: rgba(0, 0, 0, 0.2);

  @media (min-width: 1024px) {
    min-height: 360px;
  }

  img,
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Poster = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 140px;

  .ratio {
    padding-top: 100%;
  }

  @media (min-width: 768px) {
    width: 180px;
  }

  @media (min-width: 1024px) {
    width: 32%;
  }
`

const MoviePoster = styled(BaseMoviePoster)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`

const MovieHeader: React.FC<Props> = ({ movie }) => {
  const [isBackdropLoading, backdropUrl] = useBackdropImage(movie.backdrop_path, 'w1280')
  const releaseYear = useReleaseDate('yyyy', movie)
  const runtime = useRuntime(`h'h' m 'min'`, movie)

  return (
    <Header>
      <BackButton parent={{ href: '/' }} />

      <Backdrop>
        {isBackdropLoading && <Loader size="2rem" />}
        {backdropUrl && <img src={backdropUrl} alt={movie.title} />}
      </Backdrop>

      <Container small>
        <Poster>
          <div className="ratio"></div>
          <MoviePoster movie={movie} />
        </Poster>

        <Details>
          <Title>{movie.title}</Title>

          <Meta>
            <span className="year">{releaseYear}</span>
            &nbsp;&nbsp;•&nbsp;&nbsp;
            <span className="score">{displayRating(movie)} User score</span>
            <br />
            <span className="runtime">{runtime}</span>
          </Meta>
        </Details>
      </Container>
    </Header>
  )
}

export default MovieHeader
