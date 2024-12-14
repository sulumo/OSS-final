import axios from 'axios'

export const shuffleArray = (array) => {
  const shuffled = [...array] // Create a copy to avoid mutating the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const fetchSpotifyBearerToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: '34257df70e7049afb62985bfdd812ff4', // Your client_id
          password: '7c80f41dc93c40208aa2e2c8fc4b3bbb' // Your client_secret
        }
      }
    )

    const token = response.data.access_token
    const expiresIn = response.data.expires_in // Token expiration time in seconds

    // Store token and expiration time in localStorage
    localStorage.setItem('spotify_token', token)
    localStorage.setItem('spotify_token_expiry', Date.now() + expiresIn * 1000) // Store the expiry time in milliseconds

    return token
  } catch (error) {
    console.error('Error fetching Spotify Bearer token:', error)
    throw new Error('Unable to fetch Bearer token')
  }
}

export const getSpotifyBearerToken = async () => {
  const token = localStorage.getItem('spotify_token')
  const tokenExpiry = localStorage.getItem('spotify_token_expiry')

  // If token doesn't exist or is expired
  if (!token || Date.now() >= tokenExpiry) {
    console.log('Token expired or not found. Fetching a new token...')
    return await fetchSpotifyBearerToken() // Fetch new token
  }

  return token // Return the stored valid token
}
