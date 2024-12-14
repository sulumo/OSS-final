import React, { useState, useEffect } from 'react'
import {
  fetchTopTags,
  // fetchTopTracks,
  fetchTracksByTag
  // fetchTopChartTracks
} from '../components/utils/api_calls'
import CategoryButton from '../components/CategoryButton'
import styled from '@emotion/styled'
import MusicCard from '../components/MusicCard'

const Wrapper = styled.section`
  overflow: scroll !important;
  & .category {
    margin-bottom: 10px;
  }
  & .category-container {
    margin-top: 10px;
  }
`
const placeholder = [1, 2, 3, 4, 5, 6, 7, 8]

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`

const Explore = () => {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [tagTracks, setTagTracks] = useState([])

  console.log(tagTracks)

  const handleCategoryClick = async (tagName) => {
    setLoading(true)
    try {
      const fetchedTracks = await fetchTracksByTag(tagName)
      setTagTracks(fetchedTracks)
    } catch (error) {
      console.error('Error fetching tracks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchTags = async () => {
      const result = await fetchTopTags()
      if (result?.toptags?.tag) {
        setTags(result.toptags.tag)
      }
    }

    fetchTags()
  }, [])

  useEffect(() => {
    const fetchTracksForFirstTag = async () => {
      const result = await fetchTracksByTag(tags[0], 25)
      if (result) {
        setTagTracks(result)
      }
    }

    fetchTracksForFirstTag()
  }, [])

  return (
    <Wrapper className="overflow-scroll">
      <div className="category-container ">
        {tags.slice(0, 25).map((tag, index) => {
          return (
            <CategoryButton
              className="category"
              key={index}
              onClick={() => handleCategoryClick(tag.name)}
            >
              {tag.name}
            </CategoryButton>
          )
        })}
      </div>
      <GridContainer>
        {loading || tagTracks === undefined
          ? placeholder.map((placeholderCard) => {
              ;<MusicCard
                key={placeholderCard}
                artistName="artist namer"
                title="title"
                imgUrl="image"
              />
            })
          : tagTracks.map((card) => (
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

export default Explore
