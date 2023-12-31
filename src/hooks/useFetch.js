import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api'

const useFetch = (url) => {
    console.log(url)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading("loading....")
        setData(null)
        setError(null)

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false)
                // console.log(res, 'res')
                setData(res)
            })
            .catch((err) => {
                setLoading(false)
                setError("Something went wrong!")
            })

    }, [url])

    return { data, loading, error };
}

export default useFetch