import React from 'react'
import { Image } from '../../types'

function ImageBlock(props: {
    imageBlockData: Image
    scale: number
    isSelected: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}) {
    const { coordinates, width, height, base64 } = props.imageBlockData

    const scalePercent = props.scale / 100

    return (
        <div
            onClick={props.onClick}
            style={{
                width: width * scalePercent,
                height: height * scalePercent,
                top: coordinates.y * scalePercent,
                left: coordinates.y * scalePercent,
                position: 'absolute',
                border: props.isSelected ? '2px solid blue' : 'none',
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
