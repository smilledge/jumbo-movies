import * as React from 'react'
import { useState } from 'react'
import { styled } from '../theme'

type Props = {
  className?: string
  query?: string
  onSearch: (query: string) => Promise<any> | void
}

const Form = styled.form``

const Input = styled.input`
  width: 100%;
  height: 2.75rem;
  padding: 0 3.5rem 0 1rem;
  border: none;
  border-radius: 1.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${props => props.theme.bodyFont};
  box-shadow: ${props => props.theme.shadow};
  color: ${props => props.theme.green};
  transition: all 0.2s;

  &::placeholder {
    opacity: 0.5;
    color: black;
  }

  &:focus {
    outline: none;
    box-shadow: ${props => props.theme.focusShadow};
  }
`

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 2.75rem;
  padding: 0;
  border: none;
  background-color: transparent;
  background-image: url('/static/icon-search.svg');
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`

const SearchForm: React.FC<Props> = ({ className, query = '', onSearch }) => {
  const [currentQuery, setQuery] = useState<string>(query)

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setQuery(target.value.trim())
  }

  const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(currentQuery)
  }

  return (
    <Form className={className} onSubmit={onSubmit}>
      <Input type="text" placeholder="Search" defaultValue={query} onKeyUp={onKeyUp} />
      <Button type="submit" />
    </Form>
  )
}

export default SearchForm
