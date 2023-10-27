import React from 'react'
import { Image } from '../types'

function ImageBlock(props: { imageBlockData: Image }) {
    const { id, coordinates, width, height, type, base64 } =
        props.imageBlockData

    return (
        <div>
            <img
                style={{
                    position: 'absolute',
                    width: width,
                    height: height,
                    top: coordinates.y,
                    left: coordinates.x,
                }}
                src={base64}
                alt=""
            />
        </div>
    )
}

export { ImageBlock }
