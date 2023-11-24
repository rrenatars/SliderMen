import React from 'react'
import { Primitive } from '../types'

function PrimitiveBlock(props: { primitive: Primitive; scale: number }) {
    const {
        primitiveType,
        outlineColor,
        fillColor,
        coordinates,
        width,
        height,
    } = props.primitive

    const scalePercent = props.scale / 100

    let shapeElement = null

    if (primitiveType === 'circle') {
        shapeElement = (
            <circle
                cx={(width / 2) * scalePercent}
                cy={(height / 2) * scalePercent}
                r={(width / 2) * scalePercent}
                fill={fillColor.hex}
                stroke={outlineColor?.hex || 'transparent'}
                strokeWidth={2 * scalePercent}
            />
        )
    } else if (primitiveType === 'triangle') {
        shapeElement = (
            <polygon
                points={`${coordinates.x * scalePercent},${
                    coordinates.y * scalePercent
                } ${(coordinates.x - width / 2) * scalePercent},${
                    (coordinates.y - height) * scalePercent
                } ${(coordinates.x - width) * scalePercent},${
                    coordinates.y * scalePercent
                }`}
                fill={fillColor.hex}
            />
        )
    } else if (primitiveType === 'rectangle') {
        shapeElement = (
            <rect
                width={width * scalePercent}
                height={height * scalePercent}
                fill={fillColor.hex}
                stroke={outlineColor?.hex || 'transparent'}
                strokeWidth={2 * scalePercent}
            />
        )
    }

    return (
        <svg
            style={{
                position: 'relative',
                left: coordinates.x * scalePercent,
                top: coordinates.y * scalePercent,
                width: width * scalePercent,
                height: height * scalePercent,
            }}
        >
            {shapeElement}
        </svg>
    )
}

export { PrimitiveBlock }
