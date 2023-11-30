import React from 'react'
import { Image } from '../types'

function ImageBlock(props: { imageBlockData: Image; scale: number }) {
    const { coordinates, width, height, base64 } = props.imageBlockData

    return (
        <div
            style={{
                width: (width * props.scale) / 100,
                height: (height * props.scale) / 100,
                top: (coordinates.y * props.scale) / 100,
                left: (coordinates.y * props.scale) / 100,
                position: 'absolute',
            }}
        >
            <img
                src={base64}
                alt=""
                style={{
                    width: (width * props.scale) / 100,
                    height: (height * props.scale) / 100,
                }}
            />
        </div>
    )
}

export { ImageBlock }
