import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import NextApp from 'next/app'
import { theme } from '../theme'

type AppProps = {
  Component: React.ReactNode
  pageProps: object
}

class App extends NextApp<AppProps> {
  render () {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

export default App
