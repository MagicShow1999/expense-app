import React from 'react'
import Confetti from 'react-confetti'

export default ({disabled}) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (disabled) {
        return null;
    }
    return (
        <Confetti
        width={width}
        height={height}
        />
    )
}