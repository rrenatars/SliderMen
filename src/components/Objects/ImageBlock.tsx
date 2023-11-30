import React from 'react'
import { Image } from '../../types'

function ImageBlock(props: { imageBlockData: Image; scale: number }) {
    const { coordinates, width, height, base64 } = props.imageBlockData

    const scalePercent = props.scale / 100

    return (
        <div
            style={{
                width: width * scalePercent,
                height: height * scalePercent,
                top: coordinates.y * scalePercent,
                left: coordinates.y * scalePercent,
                position: 'absolute',
            }}
        >
            <img
                src={base64}
                alt=""
                style={{
                    width: width * scalePercent,
                    height: height * scalePercent,
                }}
            />
        </div>
    )
}

export { ImageBlock }
