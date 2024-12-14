import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 0px 10px 0px;
  margin: 15 0px;
  margin-bottom: 10px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }

  & .image-container {
    border: 100%;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 15px;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }

  & p {
    margin: 0;
  }
`

const ArtistCard = ({ artist, handleClick }) => {
  return (
    <Wrapper className="d-flex flex-row" onClick={handleClick}>
      <div className="image-container">
        <img src={artist.image} alt={artist.name} />
      </div>
      <div>
        <p className="text-secondary font16">{artist.name}</p>
        <p className="text-ternary font13">
          {artist.listeners} Monthly listeners
        </p>
      </div>
    </Wrapper>
  )
}

export default ArtistCard
