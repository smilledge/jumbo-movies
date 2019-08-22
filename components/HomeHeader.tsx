import * as React from 'react'
import Link from 'next/link'
import { styled } from '../theme'
import Container from './Container'
import BaseSearchForm from './SearchForm'
import BackgroundLines from './BackgroundLines'

type Props = {
  query?: string
  onSearch: (query: string) => Promise<any> | void
}

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 192px;
  /* Buffer for the search form */
  margin-bottom: 1.375rem;

  @media (min-width: 1024px) {
    min-height: 220px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 120%;
    height: 200%;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    background-image: radial-gradient(rgba(5, 112, 172, 0.46), rgba(8, 27, 35, 1) 70%);
    z-index: -1;
  }

  .logo {
    @media (min-width: 1024px) {
      width: 80px;
    }
  }
`

const SearchForm = styled(BaseSearchForm)`
  position: absolute;
  top: 100%;
  left: 50%;
  width: 100%;
  max-width: 340px;
  transform: translate(-50%, -50%);
`

const LeftLines = styled(BackgroundLines)`
  position: absolute;
  right: 50%;
  bottom: 0;
  margin-right: 45px;

  @media (min-width: 1024px) {
    margin-right: 100px;
  }
`

const RightLines = styled(BackgroundLines)`
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: 60px;

  @media (min-width: 1024px) {
    margin-left: 120px;
  }
`

const HomeHeader: React.FC<Props> = ({ query, onSearch }) => {
  return (
    <Header>
      <LeftLines />
      <RightLines />
      <Container>
        <Link href="/">
          <a>
            <img className="logo" src="/static/logo.svg" alt="The Movie DB" />
          </a>
        </Link>
        <SearchForm query={query} onSearch={onSearch} />
      </Container>
    </Header>
  )
}

export default HomeHeader
