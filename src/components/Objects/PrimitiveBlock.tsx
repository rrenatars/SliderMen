import React, { useEffect, useRef, useState } from 'react'
import { Primitive } from '../../types'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { usePresentationDataContext } from '../PresentationDataContext'

function PrimitiveBlock(props: {
    primitiveBlockData: Primitive
    scale: number
    isSelected: boolean
    onClick?: React.MouseEventHandler<SVGSVGElement> | undefined
}) {
    const {
        id,
        primitiveType,
        outlineColor,
        fillColor,
        coordinates,
        width,
        height,
    } = props.primitiveBlockData

    const ref = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState({ x: coordinates.x, y: coordinates.y })

    const { isDragging } = useDragAndDrop(ref, setPos, pos, 'pos')

    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    useEffect(() => {
        const updatedSlides = presentationData.slides.map((slide) => {
            return {
                ...slide,
                objects: slide.objects.map((obj) => {
                    if (obj.id === id) {
                        return {
                            ...obj,
                            coordinates: pos,
                        }
                    }
                    return obj
                }),
            }
        })

        setPresentationData({
            ...presentationData,
            slides: updatedSlides,
        })
    }, [isDragging])

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
                points={`0,${height * scalePercent} ${
                    (width / 2) * scalePercent
                },${0} ${width * scalePercent},${height * scalePercent}`}
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
        <div ref={ref}>
            <svg
                onClick={props.onClick}
                style={{
                    position: 'absolute',
                    left: pos.x * scalePercent,
                    top: pos.y * scalePercent,
                    width: width * scalePercent,
                    height: height * scalePercent,
                    border: props.isSelected ? '2px solid blue' : 'none',
                    cursor: 'move',
                }}
            >
                {shapeElement}
            </svg>
        </div>
    )
}

export { PrimitiveBlock }
