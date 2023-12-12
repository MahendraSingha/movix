import axios from "axios"


const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTlmZTMxOTg0MmNkZTBhODk2OTMyYTBkNGE5Yjg1NyIsInN1YiI6IjY1NzE2MDE2N2ViNWYyMDBhZDMzNTY2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8ZESkuWY-AAVllb9-67b05AM87ESGYOCe6UgFClgMhM"


const headers = {
    Authorization: "bearer " + TMDB_TOKEN
}


export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data
    }
    catch (error) {
        console.log(error, 'errorForGet')
        return error
    }
}