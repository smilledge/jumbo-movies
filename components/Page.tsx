import * as React from 'react'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import { styled } from '../theme'

type Props = {
  title?: string
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    font-family: ${props => props.theme.bodyFont};
    background-color: ${props => props.theme.bodyBg};
    color: ${props => props.theme.bodyColor};
  }

  * {
    box-sizing: border-box;
  }
`

const App = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
`

const Page: React.FC<Props> = ({ children, title }) => (
  <div>
    <Head>
      <meta charSet="UTF-8" />
      <title key="title">{title && `${title} | `} The Movie DB</title>
      <meta key="viewport" name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="//www.themoviedb.org/favicon.ico" type="image/x-icon" rel="shortcut icon" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Roboto:400,500&display=swap" rel="stylesheet" />
    </Head>

    <GlobalStyle />

    <App id="app">
      {children}
    </App>
  </div>
)

export default Page
