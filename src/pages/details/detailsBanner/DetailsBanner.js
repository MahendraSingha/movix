import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img.js'

import './style.scss'
import { useSelector } from 'react-redux'
import posterFallBack from '../../../assets/no-poster.png'
import dayjs from 'dayjs'
import Geners from '../../../components/geners/Geners.js'
import CircleRating from '../../../components/circleRating/CircleRating.js'
import { PlayIcon } from '../Playbtn.js'
import VideoPopup from '../../../components/videoPopup/VideoPopup.js'


//video and crew props are imported from Details.js
const DetailsBanner = ({ video, crew }) => {
    console.log(video, 'video')


    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)
    console.log(videoId, 'kkk')



    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    console.log(data, 'data_detailsBanner')

    const { url } = useSelector((state) => state.home)
    console.log(url, 'url_ditailsBanner')

    const _genres = data?.genres?.map((x) => x.id)

    const director = crew?.filter((f) => f.job === 'Director')
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer")


    const toHoursAndMInutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return `${hours}h${minutes > 0 ? `${minutes}m` : ""}`
    }

    return (
        <div className='detailsBanner'>
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className='backdrop-img'>
                                <Img src={url.backdrop + data?.backdrop_path} />
                            </div>
                            <div className='opacity-layer'></div>
                            <ContentWrapper>
                                <div className='content'>
                                    <div className='left'>
                                        {data.poster_path ? (
                                            <Img className='posterImg' src={url.backdrop + data.poster_path} />
                                        ) : (<Img className='posterImg' src={posterFallBack} />)}
                                    </div>
                                    <div className='right'>
                                        <div className='title'>
                                            {`${data.name || data.title} (${dayjs(data.release_date).format('YYYY')})`}
                                        </div>
                                        <div className='subtitle'>
                                            {data?.tagline}
                                        </div>
                                        <Geners data={_genres} />
                                        <div className='row'>
                                            <CircleRating rating={data.vote_average.toFixed(1)} />
                                            <div
                                                className='playbtn' onClick={() => {
                                                    setShow(true)
                                                    setVideoId(video.key)
                                                }}>
                                                <PlayIcon />
                                                <span className='text'>
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>
                                        <div className='overview'>
                                            <div className='heading'>
                                                Overview
                                            </div>
                                            <div className='description'>
                                                {data.overview
                                                }
                                            </div>
                                        </div>
                                        <div className='info'>
                                            {data.status && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Status: {" "}
                                                    </span>
                                                    <span className='text'>
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}

                                            {/* release date */}
                                            {data.release_date && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Release Date: {" "}
                                                    </span>
                                                    <span className='text'>
                                                        {dayjs(data.release_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}

                                            {/* runtime */}
                                            {data.runtime && (
                                                <div className='infoItem'>
                                                    <span className='text bold'>
                                                        Runtime: {" "}
                                                    </span>
                                                    <span className='text'>
                                                        {toHoursAndMInutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* director */}
                                        {director?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Director:{" "}
                                                </span>
                                                <span className='text'>
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {director.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}

                                                </span>
                                            </div>
                                        )}

                                        {/* Writer */}
                                        {writer?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Writer:{" "}
                                                </span>
                                                <span className='text'>
                                                    {writer?.map((w, i) => (
                                                        <span key={i}>
                                                            {w.name}
                                                            {writer.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}

                                                </span>
                                            </div>
                                        )}

                                        {/* Created By */}
                                        {data?.created_by?.length > 0 && (
                                            <div className='info'>
                                                <span className='text bold'>
                                                    Creator:{" "}
                                                </span>
                                                <span className='text'>
                                                    {data?.created_by?.map((w, i) => (
                                                        <span key={i}>
                                                            {w.name}
                                                            {data?.created_by?.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {show ? (
                                    <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                                ) : null
                                }

                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className='detailsBannerSkeleton'>
                    <ContentWrapper>
                        <div className='left skeleton'></div>
                        <div className='right'>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                            <div className='row skeleton'></div>
                        </div>

                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner