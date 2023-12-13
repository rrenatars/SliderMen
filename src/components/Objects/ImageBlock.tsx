import React, { useEffect, useRef, useState } from 'react'
import { Image } from '../../types'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { usePresentationDataContext } from '../PresentationDataContext'

interface ImageBlockProps {
    imageBlockData: Image
    scale: number
    isSelected: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const ImageBlock: React.FC<ImageBlockProps> = (props) => {
    const { id, coordinates, width, height, base64, url } = props.imageBlockData

    const refBlock = useRef<HTMLDivElement>(null)
    const refSize = useRef<HTMLDivElement>(null)
    const [posBlock, setPosBlock] = useState({
        x: coordinates.x,
        y: coordinates.y,
    })

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
    }, [isDragging])

    const scalePercent = props.scale / 100

    console.log('base 64: ', base64 ? base64 : url)

    return (
        <div>
            <div
                ref={refBlock}
                onClick={props.onClick}
                style={{
                    width: posSize.x * scalePercent,
                    height: posSize.y * scalePercent,
                    top: posBlock.y * scalePercent,
                    left: posBlock.x * scalePercent,
                    position: 'absolute',
                    border: props.isSelected ? '2px solid blue' : 'none',
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
            >
                <img
                    src={base64 ? base64 : url}
                    alt=""
                    style={{
                        width: posSize.x * scalePercent,
                        height: posSize.y * scalePercent,
                    }}
                />
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
                    visibility: props.isSelected ? 'visible' : 'hidden',
                }}
            ></div>
        </div>
    )
}

export { ImageBlock }
