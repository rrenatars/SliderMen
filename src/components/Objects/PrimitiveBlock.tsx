import React, { useEffect, useRef, useState } from 'react'
import { Primitive } from '../../types'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { usePresentationDataContext } from '../PresentationDataContext'
import { useAppActions, useAppSelector } from '../../redux/hooks'

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

    const refBlock = useRef<HTMLDivElement>(null)
    const refSize = useRef<HTMLDivElement>(null)
    const [posBlock, setPosBlock] = useState({
        x: coordinates.x,
        y: coordinates.y,
    })

    const { createChangeSelectedObjectAction } = useAppActions()

    const [posSize, setPosSize] = useState({
        x: width,
        y: height,
    })

    const { isDragging } = useDragAndDrop(
        refBlock,
        setPosBlock,
        posBlock,
        'pos',
    )
    const { isDragging: isDraggingSize } = useDragAndDrop(
        refSize,
        setPosSize,
        posSize,
        'size',
    )

    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const selection = useAppSelector((state) => state.selection)
    const { createChangeObjectAction } = useAppActions()

    useEffect(() => {
        const updatedSlides = presentationData.slides.map((slide) => {
            return {
                ...slide,
                objects: slide.objects.map((obj) => {
                    if (obj.id === id) {
                        return {
                            ...obj,
                            coordinates: posBlock,
                            width: posSize.x,
                            height: posSize.y,
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

        if (selection.slideId && selection.objectId) {
            createChangeObjectAction(selection.slideId, selection.objectId, {
                coordinates: posBlock,
                width: posSize.x,
                height: posSize.y,
            })
        }
    }, [isDragging, isDraggingSize])

    const scalePercent = props.scale / 100

    let shapeElement = null

    if (primitiveType === 'circle') {
        shapeElement = (
            <ellipse
                cx={(posSize.x / 2) * scalePercent}
                cy={(posSize.y / 2) * scalePercent}
                rx={(posSize.x / 2) * scalePercent}
                ry={(posSize.y / 2) * scalePercent}
                fill={fillColor.hex}
                stroke={outlineColor?.hex || 'transparent'}
                strokeWidth={2 * scalePercent}
            />
        )
    } else if (primitiveType === 'triangle') {
        shapeElement = (
            <polygon
                points={`0,${posSize.y * scalePercent} ${
                    (posSize.x / 2) * scalePercent
                },${0} ${posSize.x * scalePercent},${posSize.y * scalePercent}`}
                fill={fillColor.hex}
            />
        )
    } else if (primitiveType === 'rectangle') {
        shapeElement = (
            <rect
                width={posSize.x * scalePercent}
                height={posSize.y * scalePercent}
                fill={fillColor.hex}
                stroke={outlineColor?.hex || 'transparent'}
                strokeWidth={2 * scalePercent}
            />
        )
    }

    const handleClick = () => {
        if (id == selection.objectId) {
            createChangeSelectedObjectAction('')
        } else {
            createChangeSelectedObjectAction(id)
        }
    }

    return (
        <div>
            <div ref={refBlock} key={id}>
                <svg
                    onClick={handleClick}
                    style={{
                        position: 'absolute',
                        width: posSize.x * scalePercent,
                        height: posSize.y * scalePercent,
                        top: posBlock.y * scalePercent,
                        left: posBlock.x * scalePercent,
                        border:
                            scalePercent === 1 && id === selection.objectId
                                ? '2px solid blue'
                                : 'none',
                        cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                >
                    {shapeElement}
                </svg>
            </div>
            <div
                ref={refSize}
                style={{
                    position: 'absolute',
                    width: '10px',
                    height: '10px',
                    top: posBlock.y * scalePercent - 7,
                    left: posBlock.x * scalePercent - 8,
                    background: 'blue',
                    cursor: 'nwse-resize',
                    border: '1px solid white',
                    visibility:
                        scalePercent === 1 && id === selection.objectId
                            ? 'visible'
                            : 'hidden',
                }}
            ></div>
        </div>
    )
}

export { PrimitiveBlock }
