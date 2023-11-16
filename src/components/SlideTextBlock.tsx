import { TextBlock } from '../types'
import React from 'react'

function SlideTextBlock(props: { textBlockData: TextBlock }) {
    const { value, color, fontSize, fontFamily, coordinates, width, height } =
        props.textBlockData

    return (
        <div
            style={{
                position: 'absolute',
                color: color.hex,
                width: width,
                height: height,
                fontSize: fontSize,
                fontFamily: fontFamily,
                top: coordinates.y,
                left: coordinates.x,
                opacity: color.opacity,
            }}
        >
            {value}
        </div>
    )
}

export { SlideTextBlock }
