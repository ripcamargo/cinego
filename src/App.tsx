import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import { FavoritesProvider } from './contexts/FavoritesContext'
import Navbar from './components/Navbar'
import Footer from './components/footer'

function App() {

  return (
    <>
      <FavoritesProvider>
        <BrowserRouter>
        <Navbar />
        <div style={{ paddingTop: '70px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </FavoritesProvider>
      
    </>
    
  )
}

export default App
