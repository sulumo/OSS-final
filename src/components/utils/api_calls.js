/* eslint-disable no-unused-vars */
// API calls
import axios from 'axios'
import { getSpotifyBearerToken } from './utils'

const API_KEY = '0b8b5d6547cb1e0c5324c07ed3f260bb'

export const fetchTopTags = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=${API_KEY}&format=json`,
    headers: {}
  }

  try {
    const response = await axios.request(config)
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

const getArtistImageFromSpotify = async (artistName) => {
  const token = await getSpotifyBearerToken() // Ensure valid token is fetched before making the request

  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=artist:${artistName}&type=artist&limit=1`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios(config)
    const artist = response.data.artists.items[0]

    if (artist && artist.images.length > 0) {
      return artist.images[0].url // Get the first image (large size)
    }
    return 'https://via.placeholder.com/150?text=No+Image' // Default image
  } catch (error) {
    console.error('Error fetching artist image from Spotify:', error)
    return 'https://via.placeholder.com/150?text=PlaceHolder' // Default error image
  }
}

const getSongImageFromSpotify = async (songName) => {
  const token = await getSpotifyBearerToken() // Ensure valid token is fetched before making the request

  const config = {
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=track:${songName}&type=track&limit=1`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await axios(config)
    // console.log("response from spotify", response.data)
    const track = response.data.tracks.items[0].album

    // console.log("tracks from spotiy", track)

    if (track && track.images.length > 0) {
      return track.images[0].url // Get the first image (large size)
    }
    return 'https://via.placeholder.com/150?text=No+Image' // Default image
  } catch (error) {
    console.error('Error fetching artist image from Spotify:', error)
    return 'https://via.placeholder.com/150?text=PlaceHolder' // Default error image
  }
}

export const fetchTopTracks = async () => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=10`,
    headers: {}
  }

  try {
    const response = await axios.request(config)
    const tracks = response.data.tracks.track

    const augmentedTracks = await Promise.all(
      tracks.map(async (track) => {
        const artistName = track.artist.name
        const artistImage = await getSongImageFromSpotify(track.name)

        return {
          ...track,
          artist: {
            ...track.artist,
            image: artistImage
          }
        }
      })
    )

    return augmentedTracks
  } catch (error) {
    console.error('Error fetching top tracks:', error)
    throw error // Rethrow error for handling by the caller
  }
}

// Function to fetch tracks based on the tag name
export const fetchTracksByTag = async (tagName, limit) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tagName}&api_key=0b8b5d6547cb1e0c5324c07ed3f260bb&format=json&limit=${limit}`,
    headers: {}
  }

  try {
    const response = await axios.request(config)
    const tracks = response.data.tracks.track

    // Augment each track's artist with an image from Spotify
    const augmentedTracks = await Promise.all(
      tracks.map(async (track) => {
        const artistName = track.artist.name
        const artistImage = await getSongImageFromSpotify(track.name)

        return {
          ...track,
          artist: {
            ...track.artist,
            image: artistImage
          }
        }
      })
    )

    return augmentedTracks // Return the data for use
  } catch (error) {
    console.error('Error fetching top tracks by tag:', error)
    throw error // Rethrow error for handling by the caller
  }
}

export const fetchTopChartTracks = async () => {
  try {
    const response = await axios.get(
      'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=0b8b5d6547cb1e0c5324c07ed3f260bb&format=json'
    )

    const tracks = response?.data?.tracks?.track

    if (tracks && tracks.length > 0) {
      const enhancedTracks = await Promise.all(
        tracks.map(async (track) => {
          const spotifyImage = await getSongImageFromSpotify(track.name)
          return {
            name: track.name,
            artist: {
              name: track.artist.name,
              image: spotifyImage
            },
            listeners: track.listeners
          }
        })
      )

      // console.log('Enhanced Tracks:', enhancedTracks)
      return enhancedTracks
    } else {
      console.error('No tracks found')
      return []
    }
  } catch (error) {
    console.error('Error fetching top chart tracks:', error)
    return []
  }
}

export const fetchTracksByQuery = async (trackName) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${trackName}&api_key=${API_KEY}&format=json`,
    headers: {}
  }

  try {
    const response = await axios.request(config)
    const tracks = response.data.results.trackmatches.track
    // console.log('Pure tracks ', tracks)

    // Augment track data with Spotify images
    const augmentedTracks = await Promise.all(
      tracks.map(async (track) => {
        const artistImage = await getSongImageFromSpotify(track.name)
        return {
          ...track,
          artist: {
            ...track.artist,
            image: artistImage
          }
        }
      })
    )

    return augmentedTracks
  } catch (error) {
    console.error('Error fetching tracks by query:', error)
    throw error
  }
}

export const sendTrackDataToMockAPI = async (trackData) => {
  try {
    // Step 1: Fetch the existing tracks from MockAPI
    const getConfig = {
      method: 'get',
      url: 'https://67288011270bd0b97555c189.mockapi.io/Playlist'
    }

    const existingTracksResponse = await axios(getConfig)
    const existingTracks = existingTracksResponse.data

    // Step 2: Check if the track name already exists in the fetched data
    const trackExists = existingTracks.some(
      (track) => track.trackName === trackData.name
    )

    if (trackExists) {
      // console.log(`Track "${trackData.name}" already exists in the playlist.`)
      return
    }

    const postConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://67288011270bd0b97555c189.mockapi.io/Playlist',
      data: {
        trackName: trackData.name,
        artistName: trackData.artist.name,
        popularity: trackData.listeners,
        image: trackData.artist.image,
        personalNote: '',
        playTime: trackData.duration
      }
    }

    const postResponse = await axios(postConfig)
    // console.log('Track added:', postResponse.data)
  } catch (error) {
    console.error('Error in sendTrackDataToMockAPI:', error)
  }
}

export const getTracksFromMockAPI = async () => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://67288011270bd0b97555c189.mockapi.io/Playlist/',
      headers: {}
    }

    // Make the GET request to fetch data
    const response = await axios(config)

    // Log the response data (tracks)
    // console.log('Fetched tracks:', response.data)

    // Return the fetched data (if you need it for further use)
    return response.data
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error fetching tracks from MockAPI:', error)
  }
}

export const deleteTrackFromMockAPI = async (trackId) => {
  try {
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://67288011270bd0b97555c189.mockapi.io/Playlist/${trackId}`,
      headers: {}
    }

    const response = await axios.request(config)
    // console.log('Track deleted:', response.data)
  } catch (error) {
    console.error('Error deleting track:', error)
  }
}

export const fetchTopChartArtists = async () => {
  const config = {
    method: 'get',
    url: `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=5`,
    headers: {}
  }

  try {
    const response = await axios(config)
    const artists = response.data.artists.artist
    // console.log('Top Artists from Last.fm:', artists);
    return artists
  } catch (error) {
    console.error('Error fetching top chart artists:', error)
  }
}

export const getTopArtistsWithImages = async () => {
  try {
    const artists = await fetchTopChartArtists()

    // Augment each artist with an image from Spotify
    const artistsWithImages = await Promise.all(
      artists.map(async (artist) => {
        const imageUrl = await getArtistImageFromSpotify(artist.name)

        return {
          ...artist,
          image: imageUrl || null // Add the image URL or null if not available
        }
      })
    )

    // console.log('Top Artists with Images:', artistsWithImages);
    return artistsWithImages // Return the data for use
  } catch (error) {
    console.error('Error fetching top artists with images:', error)
    throw error // Rethrow the error for handling by the caller
  }
}

export const getArtistTopTracks = async (artistName) => {
  const config = {
    method: 'get',
    url: `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${API_KEY}&format=json`,
    headers: {}
  }
  try {
    const response = await axios(config)
    console.log(response)
    const tracks = response.data.toptracks.track

    const enhancedTracks = await Promise.all(
      tracks.map(async (track) => {
        const artistImage = await getSongImageFromSpotify(track.name)
        return {
          ...track,
          artist: {
            ...track.artist,
            image: artistImage
          }
        }
      })
    )
    console.log('Artist tracks:', enhancedTracks)
    return enhancedTracks
  } catch (error) {
    console.log(error)
  }
}
