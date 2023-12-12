import React from 'react'
import Carousel from '../../../components/carousel/Carousel'
import useFetch from '../../../hooks/useFetch'


//props are imported from Details.js
const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`)

    console.log(data, 'data_similar')

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies"


    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    )
}

export default Similar