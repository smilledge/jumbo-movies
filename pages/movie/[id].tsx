import * as React from 'react'
import { NextPage } from 'next'
import { useRouter, NextRouter } from 'next/router'
import { styled } from '../../theme'
import { useMovie } from '../../lib/movies/hooks'
import Page from '../../components/Page'
import Container from '../../components/Container'
import BaseLoader from '../../components/Loader'
import MovieHeader from '../../components/MovieHeader'

const getIdParam = (router: NextRouter): number => {
  const value = router.query.id
  return parseInt(Array.isArray(value) ? value[0] : value, 10)
}

const Loader = styled(BaseLoader)`
  min-height: 100vh;
`

const Hr = styled.hr`
  margin: 1.75rem 0;
  border: none;
  border-bottom: 1px solid #0F303D;
`

const SectionTitle = styled.h2`
  margin: 0 0 0.75rem;
  line-height: 1.2;
  font-size: ${props => props.theme.h2Size};
  font-family: ${props => props.theme.headingFont};
`

const SectionContent = styled.div`
  line-height: 1.5;
  color: #9FBBC7;
`

const MoviePage: NextPage<{}> = () => {
  const router: NextRouter = useRouter()
  const [isLoading, movie] = useMovie(getIdParam(router))
  const title = movie ? movie.title : undefined

  return (
    <Page title={title}>
      {isLoading ? <Loader size="4rem" color="red" /> : null}
      {!isLoading && movie && <>
        <MovieHeader movie={movie} />
        <Container small>
          <Hr />
          <SectionTitle>Overview</SectionTitle>
          <SectionContent>{movie.overview}</SectionContent>
        </Container>
      </>}
    </Page>
  )
}

export default MoviePage
