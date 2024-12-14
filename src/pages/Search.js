import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import MusicCard from '../components/MusicCard'
import { fetchTracksByQuery } from '../components/utils/api_calls'

const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
`

const Search = () => {
  const { query } = useParams()
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true)
        const results = await fetchTracksByQuery(query)
        setTracks(results)
      } catch (error) {
        console.error('Error fetching tracks:', error)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchTracks()
    }
  }, [query])

  if (loading) {
    return <div>Loading...</div>
  }

  if (tracks.length === 0) {
    return <div>No results found for {query}</div>
  }

  return (
    <SearchWrapper>
      {tracks.map((track) => (
        <MusicCard
          key={track.id}
          title={track.name}
          artistName={track.artist.name}
          imgUrl={track.artist.image}
          track={track}
        />
      ))}
    </SearchWrapper>
  )
}

export default Search
