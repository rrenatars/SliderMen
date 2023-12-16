import { TextBlock } from '../../types'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { usePresentationDataContext } from '../PresentationDataContext'
import styles from './SlideTextBlock.module.css'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'

interface SlideTextBlockProps {
    textBlockData: TextBlock
    selectedSlideId: string
    scale: number
    isSelected: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const SlideTextBlock: React.FC<SlideTextBlockProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const {
        id,
        value,
        color,
        fontSize,
        fontFamily,
        coordinates,
        width,
        height,
        bold,
        italic,
    } = props.textBlockData

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
    useDragAndDrop(refSize, setPosSize, posSize, 'size')

    const scalePercent = props.scale / 100

    const [isEditing, setIsEditing] = useState(false)
    const [editedValue, setEditedValue] = useState(value)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (scalePercent === 1) {
            setIsEditing(true)
            if (props.onClick && !props.isSelected) {
                props.onClick(e)
            }
        }
    }

    const handleBlur = (e: React.SyntheticEvent<HTMLDivElement>) => {
        if (!isDragging) {
            setIsEditing(false)
            const newTextContent = e.currentTarget.textContent
            if (newTextContent !== null) {
                setEditedValue(newTextContent)

                const updatedSlides = presentationData.slides.map((slide) => {
                    return {
                        ...slide,
                        objects: slide.objects.map((obj) => {
                            if (obj.id === id) {
                                return {
                                    ...obj,
                                    value: newTextContent,
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
                    selection: {
                        ...presentationData.selection,
                        slideId: props.selectedSlideId,
                        objectId: undefined,
                    },
                })
            }

            if (props.onClick) {
                props.onClick(e as React.MouseEvent<HTMLDivElement>)
            }
        }
    }

    useEffect(() => {
        if (!props.isSelected) {
            setIsEditing(false)
        }
    }, [props.isSelected])

    return (
        <div>
            <div
                ref={refBlock}
                style={{
                    position: 'absolute',
                    width: posSize.x * scalePercent + 4,
                    height: posSize.y * scalePercent + 2,
                    top: posBlock.y * scalePercent - 4,
                    left: posBlock.x * scalePercent - 5,
                    border: '4px solid blue',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    visibility: isEditing ? 'visible' : 'hidden',
                }}
            ></div>
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
                    visibility: isEditing ? 'visible' : 'hidden',
                }}
            ></div>
            <div
                className={styles.textBlock}
                onClick={handleClick}
                contentEditable={isEditing}
                onBlur={handleBlur}
                suppressContentEditableWarning={true}
                style={{
                    position: 'absolute',
                    color: color.hex,
                    width: posSize.x * scalePercent + 4,
                    height: posSize.y * scalePercent + 2,
                    fontSize: fontSize * scalePercent,
                    fontFamily: fontFamily,
                    fontWeight: bold ? 'bold' : 'normal',
                    fontStyle: italic ? 'italic' : 'normal',
                    lineHeight: (fontSize + 10) * scalePercent + 'px',
                    top: posBlock.y * scalePercent,
                    left: posBlock.x * scalePercent,
                    opacity: color.opacity,
                }}
            >
                {editedValue}
            </div>
        </div>
    )
}

export { SlideTextBlock }
