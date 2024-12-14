import React from 'react'
import styled from '@emotion/styled'

const ButtonWrapper = styled.button`
  background-color: #1c1c1c;
  color: #e2e8f0;
  padding: 5px 20px;
  margin-right: 10px;
  border: none;
  outline: none;
  border-radius: 7px;
  margin-bottom: 15px;
`

const CategoryButton = ({ children, onClick }) => {
  return (
    <ButtonWrapper className="font15" onClick={() => onClick(children)}>
      {children}
    </ButtonWrapper>
  )
}

export default CategoryButton
