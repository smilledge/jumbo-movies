import { useState, useEffect, useMemo, SetStateAction, Dispatch } from 'react'
import { DateTime, Duration } from 'luxon'
import api from './api'
import { getConfiguration, ApiConfig } from './configuration'
import { MovieSummary, MovieQuery, MovieDetails } from './types'

type MovieHookState = [boolean, MovieDetails | null]
type MoviesHookState = [boolean, MovieSummary[], MovieQuery,  Dispatch<SetStateAction<MovieQuery>>]

/**
 * Get a movie by ID
 *
 * See: https://developers.themoviedb.org/3/movies/get-movie-details
 *
 * @param movieId
 */
export function useMovie (movieId: number): MovieHookState {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [movie, setMovie] = useState<MovieDetails | null>(null)

  const load = async () => {
    if (!movieId) {
      return
    }

    setIsLoading(true)
    const res = await api.get(`movie/${movieId}`)
    setMovie(res.data)
    setIsLoading(false)
  }

  useEffect(() => {
    load()
  }, [movieId])

  return [isLoading, movie]
}

/**
 * Abstract hook for creating queying movies
 *
 * @param endpoint The Movie DB endpoint (eg, 'search/movie')
 * @param defaultQuery
 */
export function useMovies (endpoint: string, defaultQuery: MovieQuery = {}): MoviesHookState {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [movies, setMovies] = useState<MovieSummary[]>([])
  const [query, setQuery] = useState<MovieQuery>(defaultQuery)

  const load = async () => {
    if (query.query === '') {
      // Movie DB API errors on empty searches
      setMovies([])
      return
    }

    setIsLoading(true)

    const res = await api.get(endpoint, {
      params: query
    })

    setMovies(res.data.results)
    setIsLoading(false)
  }

  useEffect(() => {
    load()
  }, [query])

  return [isLoading, movies, query, setQuery]
}


/**
 * Hook for fetching popular movies
 */
export function usePopularMovies (): MoviesHookState {
  return useMovies('movie/popular')
}

/**
 * Hook for searching movies
 *
 * @param query Search string
 */
export function useSearchMovies (query: MovieQuery = {}): MoviesHookState {
  return useMovies('search/movie', query)
}


/**
 * Hook for loading an image from the Movie DB
 *
 * @param imagePath
 * @param size
 */
export function useMovieImage (imagePath: string, size: string, configKey: string): [boolean, string] {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>('')

  const load = async () => {
    setIsLoading(true)

    try {
      const configuration = await getConfiguration()
      const imageUrl = getImageUrl(configuration, imagePath, size, configKey)

      if (imageUrl) {
        await preload(imageUrl)
        setImageUrl(imageUrl)
      }
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    load()
  }, [imagePath])

  return [isLoading, imageUrl]
}

export function usePosterImage (imagePath: string, size: string): [boolean, string] {
  return useMovieImage(imagePath, size, 'poster_sizes')
}

export function useBackdropImage (imagePath: string, size: string): [boolean, string] {
  return useMovieImage(imagePath, size, 'backdrop_sizes')
}

/**
 * Format a movie's release date and memoize the result
 *
 * Format tokens: https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
 *
 * @param format Luxon format string
 * @param movie
 */
export function useReleaseDate (format: string, movie: MovieSummary | MovieDetails): string {
  return useMemo(() => {
    if (!movie.release_date) {
      return ''
    }

    const date = DateTime.fromFormat(movie.release_date, 'yyyy-MM-dd')
    return date.toFormat(format)
  }, [movie])
}


/**
 * Format a movie's runtime and memoize the result
 *
 * @param format Luxon format string
 * @param movie
 */
export function useRuntime (format: string, movie: MovieDetails): string {
  return useMemo(() => {
    if (!movie.runtime) {
      return ''
    }

    const duration = Duration.fromObject({
      minutes: movie.runtime
    })

    return duration.toFormat(format)
  }, [movie])
}


/**
 * Get the full image URL for a poster/backdrop image
 *
 * See: https://developers.themoviedb.org/3/getting-started/images
 *
 * @param path Image path from the API response
 * @param size Valid size for the Movie DB api
 */
function getImageUrl (config: ApiConfig, path: string, size: string = 'original', configKey: string): string | null {
  const sizes = config.images[configKey]
  path = (path || '').replace(/^\//, '')

  if (!path) {
    return null
  }

  if (sizes.indexOf(size) === -1) {
    throw new Error(`Invalid image size (must be one of ${sizes.join(', ')})`)
  }

  return `${config.images.secure_base_url}${size}/${path}`
}


/**
 * Preload an image
 *
 * @param url Full image url
 */
function preload (url: string): Promise<void> {
  return new Promise(resolve => {
    const img: HTMLImageElement = new Image()
    img.src = url
    img.onload = () => resolve()
  })
}
