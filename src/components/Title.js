import React from 'react'
import styled from '@emotion/styled'

const SectionTitle = styled.p`
  font-weight: 700;
  margin-bottom: 20px;
`

const Title = ({ children }) => {
  return (
    <SectionTitle className="font18 text-secondary">{children}</SectionTitle>
  )
}

export default Title
