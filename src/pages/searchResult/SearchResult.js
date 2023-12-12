import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import './style.scss'

import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/MovieCard'


const SearchResult = () => {
    const [data, setData] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const { querry } = useParams()



    const fetchInitialData = () => {
        setLoading(true)
        fetchDataFromApi(`/search/multi?query=${querry}&page=${pageNum}`)
            .then((res) => {
                console.log(res, 'query_res')
                setData(res)
                setPageNum((prev) => prev + 1)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchInitialData()
    }, [querry])

    const fetchNextPageData = () => {
        console.log(pageNum, 'pageNum')
        setLoading(true)
        fetchDataFromApi(`/search/multi?query=${querry}&page=${pageNum}`)
            .then((res) => {
                if (data.results) {
                    setData({
                        ...data, results: [...data?.results, ...res?.results]
                        // ...data?.results, ...res?.results
                    })
                } else {
                    setData(res)
                }
                setPageNum((prev) => prev + 1)
            })
    }


    return (
        <div className='searchResultsPage'>
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className='pageTitle'>
                                {`Search ${data.total_results > 1 ? "results" : 'result'} of ${querry} `}
                            </div>
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.result?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard key={index} data={item} fromSearch={true} />
                                    )
                                })}

                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className='resultNotFound'>
                            Sorry, Results not found
                        </span>
                    )}

                </ContentWrapper>
            )}
        </div>

    )
}

export default SearchResult