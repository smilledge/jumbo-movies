import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { styled } from '../theme'

type Props = {
  className?: string
  parent: LinkProps
}

const Button = styled.a`
  padding: 1.25rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`

const BackButton: React.FC<Props> = ({ className, parent }) => {
  // TODO: Next router doesn't seem to store the history
  // Therefore we cannot use the browser's back() function without potentially leaving the site
  // Need to hook into the router events and start tracking this
  return (
    <Link {...parent}>
      <Button className={className}>
        <img src="/static/icon-back.svg" alt="Back" />
      </Button>
    </Link>
  )
}

export default BackButton
