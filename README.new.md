# SpottyTunes: A Music Streaming Web Application

## Project Overview

SpottyTunes is a modern music streaming web application that allows users to discover new music releases, search for tracks, and create personalized playlists. The app integrates Spotify's Web API to fetch real-time data and uses MockAPI to manage the user's favorite tracks with CRUD functionality.

### Features

- **Home Page:** Displays the latest music releases fetched from Spotify's API.
- **Search Page:** Enables users to search for music and filter results based on genre, artist, or popularity.
- **Playlist Page:** Allows users to save, view, edit, and delete their favorite tracks using MockAPI.
- **Seamless Integration:** Combines real-time data from Spotify with user-specific data stored in MockAPI.

### Technologies Used

- React (Frontend)
- Spotify Web API (External Data)
- MockAPI (User Data Management)
- ESLint and Prettier (Code Linting and Formatting)

## Installation and Setup

### Prerequisites

- Node.js (>=16.x.x)
- npm (>=8.x.x)
- Spotify Developer Account (for API keys)
- MockAPI account (for managing mock datasets)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository-name.git
   cd your-repository-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Spotify API credentials:

   ```env
   REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret
   REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000).

## Setting Up ESLint and Prettier

### Install Dependencies

To set up ESLint and Prettier in the project, run the following commands:

```bash
npm install --save-dev eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier
```

### Configure ESLint

1. Create an `.eslintrc.json` file in the root directory:

   ```json
   {
     "env": {
       "browser": true,
       "es2021": true
     },
     "extends": [
       "eslint:recommended",
       "plugin:react/recommended",
       "plugin:prettier/recommended"
     ],
     "parserOptions": {
       "ecmaFeatures": {
         "jsx": true
       },
       "ecmaVersion": 12,
       "sourceType": "module"
     },
     "plugins": ["react", "prettier"],
     "rules": {
       "prettier/prettier": "error",
       "react/react-in-jsx-scope": "off"
     }
   }
   ```

2. Add a `lint` script to your `package.json`:
   ```json
   "scripts": {
     "lint": "eslint ."
   }
   ```

### Configure Prettier

1. Create a `.prettierrc` file in the root directory:

   ```json
   {
     "semi": true,
     "singleQuote": true,
     "printWidth": 80
   }
   ```

2. Add a `format` script to your `package.json`:
   ```json
   "scripts": {
     "format": "prettier --write ."
   }
   ```

### Running ESLint and Prettier

- To check for linting errors:
  ```bash
  npm run lint
  ```
- To auto-format the code:
  ```bash
  npm run format
  ```

## Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [MockAPI](https://mockapi.io/)
- [ESLint and Prettier Guide](https://medium.com/@sindhujad6/setting-up-eslint-and-prettier-in-a-node-js-project-f2577ee2126f)
