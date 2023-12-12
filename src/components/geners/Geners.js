import React from 'react'

import "./style.scss"
import { useSelector } from 'react-redux'

//data props imported from Carousel.js
const Geners = ({ data }) => {
    const { genres } = useSelector((state) => state.home)

    return (
        <div className='genres'>
            {data && data?.map((id) => {
                if (!genres[id]?.name) return;

                return (
                    <div key={id} className='genre'>
                        {genres[id]?.name}
                    </div>
                )

            })}
        </div>
    )
}

export default Geners 