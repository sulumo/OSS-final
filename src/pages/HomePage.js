import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import styled from '@emotion/styled'
import CardBanner from '../components/CardBanner'
import Slider from 'react-slick'
import CategoryButton from '../components/CategoryButton'
import MusicCard from '../components/MusicCard'
import TopChartsCard from '../components/TopCharts'
import {
  fetchTopTags,
  fetchTopTracks,
  fetchTracksByTag,
  fetchTopChartTracks,
  // fetchTopChartArtists,
  getTopArtistsWithImages
} from '../components/utils/api_calls'
import ArtistCard from '../components/ArtistCard'
import { useNavigate } from 'react-router-dom'

const MainSection = styled.section`
  /* border: 1px solid red; */
  width: 58%;
  height: 100%;

  & .banner-container {
    width: 100%;
    height: 300px;
  }

  & .category-container {
    margin-top: 10px;
  }
`

const Aside = styled.aside`
  width: 39%;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`

const TopChartsContainer = styled.div``

const placeholder = [1, 2, 3, 4, 5, 6, 7, 8]

const HomePage = () => {
  const [tags, setTags] = useState([])
  const [topTracks, setTopTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [chartTopTracks, setChartTopTracks] = useState([])
  const [tagTracks, setTagTracks] = useState([])
  const [topArtists, setTopArtist] = useState()
  const navigate = useNavigate()

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: '80px'
  }

  let iter = 1

  const handleCategoryClick = async (tagName) => {
    setLoading(true)
    try {
      const fetchedTracks = await fetchTracksByTag(tagName, 8)
      setTagTracks(fetchedTracks)
    } catch (error) {
      console.error('Error fetching tracks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleArtistClick = (aristName) => {
    navigate(`/viewer/${aristName}`) // Updated navigation
  }

  useEffect(() => {
    const fetchTags = async () => {
      const result = await fetchTopTags()
      if (result?.toptags?.tag) {
        setTags(result.toptags.tag)
      }
    }

    const fetchTracks = async () => {
      const result = await fetchTopTracks()
      if (result) {
        setTopTracks(result)
      }
    }

    const fetchTopChart = async () => {
      const result = await fetchTopChartTracks()
      if (result) {
        setChartTopTracks(result)
      }
    }

    const fetchTopArtists = async () => {
      const result = await getTopArtistsWithImages()
      if (result) {
        setTopArtist(result)
      }
    }

    fetchTopArtists()
    fetchTopChart()
    fetchTracks()
    fetchTags()
  }, [])

  useEffect(() => {
    const fetchTracksForFirstTag = async () => {
      const result = await fetchTracksByTag(tags[0], 8)
      if (result) {
        setTagTracks(result)
      }
    }

    fetchTracksForFirstTag()
  }, [])

  return (
    <div className="d-flex flex-column align-items-start full-height overflow-scroll no-scroll-visible">
      <div className="d-flex flex-row w-100 full-height  justify-content-between mt-3 ">
        <MainSection>
          <Title>Music of the day</Title>
          <Slider {...settings}>
            {topTracks.map((track, index) => (
              <div key={index} className="banner-container">
                <CardBanner
                  key={track.id}
                  title={track.name}
                  artistName={track.artist.name}
                  imgUrl={track.artist.image}
                  listeners={track.listeners}
                  track={track}
                />
              </div>
            ))}
          </Slider>
          <div className="category-container ">
            {tags.slice(5, 11).map((tag, index) => {
              return (
                <CategoryButton
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

          <Title>Top Charts</Title>
          <TopChartsContainer className="d-flex flex-column">
            {chartTopTracks.slice(0, 4).map((card) => (
              <TopChartsCard
                key={card.id}
                title={card.name}
                artistName={card.artist.name}
                imageUrl={card.artist.image}
                listeners={card.listeners}
                rank={iter++}
                track={card}
              />
            ))}
          </TopChartsContainer>
        </MainSection>
        <Aside>
          {/* <Title>New releases</Title> */}
          <Title>Top Artists</Title>
          {topArtists?.slice(0, 5).map((artist, index) => (
            <ArtistCard
              key={index}
              artist={artist}
              handleClick={() => handleArtistClick(artist.name)}
            />
          ))}
        </Aside>
      </div>
    </div>
  )
}

export default HomePage
