import * as React from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import { styled } from '../theme'
import { usePopularMovies } from '../lib/movies/hooks'
import Page from '../components/Page'
import HomeHeader from '../components/HomeHeader'
import Container from '../components/Container'
import Loader from '../components/Loader'
import MovieGrid from '../components/MovieGrid'

const MoviesContainer = styled(Container)`
  margin-top: 4rem;
  margin-bottom: 2.75rem;

  .loader {
    padding: 160px 0;
  }
`

const IndexPage: NextPage<{}> = () => {
  const [isLoading, movies] = usePopularMovies()

  const onSearch = (query: string) => Router.push({
    pathname: '/search',
    query: { query }
  })

  return (
    <Page>
      <HomeHeader onSearch={onSearch} />
      <MoviesContainer>
        {isLoading ? <Loader size="4rem" color="red" /> : null}
        {!!movies.length ? <MovieGrid title="Popular Movies" movies={movies} /> : null}
      </MoviesContainer>
    </Page>
  )
}

export default IndexPage
