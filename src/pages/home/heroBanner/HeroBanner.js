import React, { useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img.js'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper.js'


const HeroBanner = () => {
    const [background, setBackground] = useState("")
    const [querry, setQuerry] = useState("")
    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)
    const { data, loading } = useFetch("/movie/upcoming")
    console.log(data, 'data001')

    useEffect(() => {
        const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)].backdrop_path
        setBackground(bg)
        console.log(bg, 'bg')
    }, [data])

    const searchQuerryHandler = (event) => {
        if (event.key === 'Enter' && querry.length > 0) {
            console.log(querry, 'querry')
            navigate(`/search/${querry}`)
        }
    }

    return (
        <div className='heroBanner'>

            {!loading && <div className='backdrop-img'>
                <Img src={background} />
            </div>}

            <div className='opacity-layer'></div>

            <ContentWrapper>
                <div className='heroBannerContent'>
                    <span className='title'>Welcome.</span>
                    <span className='subTitle'>Millions of movies, TV shows and people to discover. Explore now.</span>
                    <div className='searchInput'>
                        <input
                            type='text'
                            placeholder='Search for a movie or tv shows....'
                            onChange={(e) => setQuerry(e.target.value)}
                            onKeyUp={searchQuerryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>

        </div>
    )
}

export default HeroBanner