import baseStyled, { ThemedStyledInterface } from 'styled-components'
import { MovieSummary, MovieDetails } from './lib/movies/types';

export const theme = {
  bodyFont: `'Roboto', sans-serif`,
  headingFont: `'Montserrat', sans-serif`,

  bodyBg: '#081B23',
  bodyColor: '#E3F4FC',
  bodyColorMuted: '#9FBBC7',

  green: '#01D277',
  purple: '#4902A3',
  pink: '#D1225B',

  shadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
  focusShadow: '0px 2px 20px rgba(5, 112, 172, 0.46)',

  h1Size: '1.75rem',
  h2Size: '1.25rem'
}

export function movieRatingColor (movie: MovieSummary | MovieDetails): string {
  const value = (movie.vote_average || 0) * 10

  if (value >= 75) {
    return theme.green
  } else if (value >= 50) {
    return theme.purple
  } else {
    return theme.pink
  }
}

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const styled = baseStyled as ThemedStyledInterface<Theme>
