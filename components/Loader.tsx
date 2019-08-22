import * as React from 'react'
import { styled } from '../theme'

type Props = {
  className?: string
  size?: string
  color?: string
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Svg = styled.svg`
  stroke: ${props => props.color || props.theme.bodyColor};
  stroke-width: 6%;
  fill: transparent;
  animation: dash 2s ease infinite, rotate 2s linear infinite;

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 95;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 85, 95;
      stroke-dashoffset: -25;
    }
    100% {
      stroke-dasharray: 85, 95;
      stroke-dashoffset: -93;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader: React.FC<Props> = ({ className = 'loader', size = '3rem' }) => {
  return (
    <Wrapper className={className}>
      <Svg
        style={{ width: size }}
        viewBox="0 0 40 40"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="15" />
      </Svg>
    </Wrapper>
  )
}

export default Loader
