import * as React from 'react'
import { useEffect } from 'react'
import { NextPage } from 'next'
import Router, { useRouter, NextRouter } from 'next/router'
import { styled } from '../theme'
import { useSearchMovies } from '../lib/movies/hooks'
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

/**
 * Get the value of a route query param as a string
 */
const getParam = (router: NextRouter, key: string): string => {
  const value = router.query[key]
  return Array.isArray(value) ? value[0] : value ? value : ''
}

const SearchPage: NextPage<{}> = () => {
  const router: NextRouter = useRouter()

  const [isLoading, movies, searchQuery, setSearchQuery] = useSearchMovies({
    query: getParam(router, 'query')
  })

  useEffect(() => {
    setSearchQuery({
      query: getParam(router, 'query')
    })
  }, [router.query.query])

  const onSearch = (query: string) => {
    Router.replace({
      pathname: '/search',
      query: { query }
    }, undefined, { shallow: true })
  }

  const pageTitle = `Search results for "${searchQuery.query}"`

  return (
    <Page title={pageTitle}>
      <HomeHeader query={searchQuery.query} onSearch={onSearch} />
      <MoviesContainer>
        {isLoading ? <Loader size="4rem" color="red" /> : null}
        {!isLoading ? <MovieGrid title={pageTitle} movies={movies} /> : null}
      </MoviesContainer>
    </Page>
  )
}

export default SearchPage
