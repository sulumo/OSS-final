import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import Explore from './pages/Explore'
import Favorites from './pages/Favorites'
import HomePage from './pages/HomePage'
import Viewer from './pages/Viewer'
import Layout from './components/Layout'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/viewer/:query" element={<Viewer />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
