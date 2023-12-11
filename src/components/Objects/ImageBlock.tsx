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
    const { id, coordinates, width, height, base64 } = props.imageBlockData

    const ref = useRef<HTMLDivElement>(null)
    const [pos, setPos] = useState({ x: coordinates.x, y: coordinates.y })

    const { isDragging } = useDragAndDrop(ref, setPos, pos)

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

    return (
        <div
            ref={ref}
            onClick={props.onClick}
            style={{
                width: width * scalePercent,
                height: height * scalePercent,
                top: pos.y * scalePercent,
                left: pos.x * scalePercent,
                position: 'absolute',
                border: props.isSelected ? '2px solid blue' : 'none',
                cursor: 'move',
            }}
        >
            <img
                src={base64}
                alt=""
                style={{
                    width: width * scalePercent,
                    height: height * scalePercent,
                    resize: 'both',
                }}
            />
        </div>
    )
}

export { ImageBlock }
