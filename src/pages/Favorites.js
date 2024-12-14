import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import MusicCard from '../components/MusicCard'
import {
  getTracksFromMockAPI,
  deleteTrackFromMockAPI
} from '../components/utils/api_calls'
import EditModal from '../components/Modal'
import ViewModal from '../components/ViewModal'

const FavoritesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
`

const Favorites = () => {
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingTrack, setEditingTrack] = useState(null)
  const [viewingTrack, setViewingTrack] = useState(null)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true)
        const fetchedTracks = await getTracksFromMockAPI()
        setTracks(fetchedTracks)
      } catch (err) {
        setError('Error fetching tracks from MockAPI')
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [])

  const handleDelete = async (trackId) => {
    try {
      await deleteTrackFromMockAPI(trackId)
      setTracks((prevTracks) =>
        prevTracks.filter((track) => track.id !== trackId)
      )
    } catch (error) {
      console.error('Error deleting track:', error)
    }
  }

  const handleSave = (updatedTrack) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === updatedTrack.id ? updatedTrack : track
      )
    )
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (tracks.length === 0) {
    return <div>No favorites found</div>
  }

  return (
    <FavoritesWrapper>
      {tracks.map((track) => (
        <div key={track.id}>
          <MusicCard
            key={track.id}
            title={track.trackName}
            artistName={track.artistName}
            imgUrl={track.image}
            track={track}
            isFavorite={true}
            onDelete={() => handleDelete(track.id)}
            onEdit={() => setEditingTrack(track)}
            onView={() => setViewingTrack(track)}
          />
        </div>
      ))}

      {editingTrack && (
        <EditModal
          track={editingTrack}
          onSave={handleSave}
          onClose={() => setEditingTrack(null)}
        />
      )}

      {viewingTrack && (
        <ViewModal track={viewingTrack} onClose={() => setViewingTrack(null)} />
      )}
    </FavoritesWrapper>
  )
}

export default Favorites
