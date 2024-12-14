import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const Form = styled.form`
  width: 400px;
`

const SearchInput = styled.input`
  height: 100%;

  background-color: #1c1c1c;
  color: #5a5a5a;
  border: none !important;
  outline: none !important;
  padding: 10px;
  border-radius: 5px 0 0 5px;
  flex: 1;

  &:focus {
    background-color: #1c1c1c;
    outline: none;
  }

  &::placeholder {
    color: #5a5a5a;
  }
`

const Button = styled.button`
  /* background-color: #1C1C1C; */
  height: 100%;
  background-color: #333333;
  color: #5a5a5a;
  border: none;
  outline: none;
  border-radius: 0 5px 5px 0;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    /* background-color: #1C1C1C; */
    background-color: #333333;
  }
  &:active {
    /* background-color: #1C1C1C; */
    background-color: #333333;
  }
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 45px;
`

const SearchBar = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search/${query}`)
  }

  return (
    <Form onSubmit={handleSearch}>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search for songs"
          value={query}
          onChange={handleInputChange}
        />
        <Button type="submit">
          <span className="material-symbols-outlined">search</span>
        </Button>
      </SearchWrapper>
    </Form>
  )
}

export default SearchBar
