import React from 'react'
import { Figures, Primitive } from '../types'

function PrimitiveBlock(props: { primitive: Primitive }) {
    const {
        primitiveType,
        outlineColor,
        fillColor,
        coordinates,
        width,
        height,
    } = props.primitive

    let shapeStyle = {} // Начальный стиль для фигуры

    if (primitiveType === 'circle') {
        shapeStyle = {
            borderRadius: '50%',
            backgroundColor: fillColor.hex,
            border: `2px solid ${outlineColor?.hex || 'transparent'}`,
        }
    } else if (primitiveType === 'triangle') {
        shapeStyle = {
            width: 0,
            height: 0,
            borderLeft: `${width / 2}px solid transparent`,
            borderRight: `${width / 2}px solid transparent`,
            borderBottom: `${height}px solid ${fillColor.hex}`,
        }
    } else if (primitiveType === 'rectangle') {
        shapeStyle = {
            backgroundColor: fillColor.hex,
            border: `2px solid ${outlineColor?.hex || 'transparent'}`,
        }
    }

    return (
        <div
            style={{
                position: 'absolute',
                left: coordinates.x,
                top: coordinates.y,
                width: width,
                height: height,
                ...shapeStyle,
            }}
        ></div>
    )
}

export { PrimitiveBlock }
