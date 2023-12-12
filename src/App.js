import { useEffect } from 'react';
import './App.css';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Explore from './pages/explore/Explore';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/404/PageNotFound';




function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)
  console.log(url, 'url')

  useEffect(() => {
    fetchApiConfig()
    genersCall()
  }, [])


  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        console.log(res, 'res_configuration')

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original"

        }

        dispatch(getApiConfiguration(url))
      })
      .catch((err) => console.log(err, 'err'))
  }


  const genersCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGeners = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises)
    console.log(data, 'data_promise')
    data.map(({ genres }) => {
      return genres.map((item) => (allGeners[item.id] = item))

    });
    console.log(allGeners, 'allGeners')
    dispatch(getGenres(allGeners))
  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/:mediaType/:id' element={<Details />} />
        <Route exact path='/search/:querry' element={<SearchResult />} />
        <Route exact path='/explore/:mediaType' element={<Explore />} />
        <Route exact path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
