import React, {useEffect, useState} from 'react'

const Card = ({title}) => {
    const [count, setCount] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(() => {
        console.log(`${title} has been liked: ${hasLiked}`)
    }, [hasLiked, title])

    useEffect(() => {
        console.log('CARD RENDERED')
    }, [])

    return(
        <div className="card" onClick={() => setCount(count + 1)}>
            <h3>{title} <br/> {count || null}</h3>

            <button onClick={() => setHasLiked(!hasLiked)}>
                {hasLiked ? '❤️' : '🤍'}
            </button>
        </div>
    )
}
export default Card
