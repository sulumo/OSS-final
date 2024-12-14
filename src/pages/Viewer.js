import React, { useState, useEffect } from 'react'
import { getArtistTopTracks } from '../components/utils/api_calls'
import styled from '@emotion/styled'
import MusicCard from '../components/MusicCard'
import { useParams } from 'react-router-dom'

const Wrapper = styled.section`
  & .category {
    margin-bottom: 10px;
  }
  & .category-container {
    margin-top: 10px;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`

const Viewer = () => {
  const [artistTracks, setArtistTracks] = useState([])
  const { query } = useParams()

  useEffect(() => {
    const fetchTopArtists = async () => {
      const result = await getArtistTopTracks(query)
      if (result) {
        setArtistTracks(result)
      }
    }

    fetchTopArtists()
  }, [])

  return (
    <Wrapper>
      <GridContainer>
        {artistTracks.map((card) => (
          <MusicCard
            key={card.id}
            artistName={card.artist.name}
            title={card.name}
            imgUrl={card.artist.image}
            track={card}
          />
        ))}
      </GridContainer>
    </Wrapper>
  )
}

export default Viewer
