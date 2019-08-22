import { styled } from '../theme'

type Props = {
  small?: boolean
}

const Container = styled.div<Props>`
  max-width: ${props => props.small ? '768px' : '1420px'};
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 480px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`

export default Container
