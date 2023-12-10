import { TextBlock } from '../../types'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { usePresentationDataContext } from '../PresentationDataContext'
import styles from './SlideTextBlock.module.css'

function SlideTextBlock(props: {
    textBlockData: TextBlock
    selectedSlideId: string
    scale: number
    isSelected: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}) {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const { value, color, fontSize, fontFamily, coordinates, width, height } =
        props.textBlockData

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
        setIsEditing(false)
        const newTextContent = e.currentTarget.textContent
        if (newTextContent !== null) {
            setEditedValue(newTextContent)
            const updatedPresentationData = {
                ...presentationData,
                slides: presentationData.slides.map((slide) =>
                    slide.id === props.selectedSlideId
                        ? {
                              ...slide,
                              objects: slide.objects.map((object) =>
                                  object.id === props.textBlockData.id
                                      ? { ...object, value: newTextContent }
                                      : object,
                              ),
                          }
                        : slide,
                ),
                selection: {
                    ...presentationData.selection,
                    slideId: props.selectedSlideId,
                    objectId: undefined,
                },
            }

            setPresentationData(updatedPresentationData)
        }

        if (props.onClick) {
            props.onClick(e as React.MouseEvent<HTMLDivElement>)
        }
    }

    return (
        <div
            className={styles.textBlock}
            onClick={handleClick}
            contentEditable={isEditing}
            onBlur={handleBlur}
            style={{
                position: 'absolute',
                color: color.hex,
                width: width * scalePercent,
                height: height * scalePercent,
                fontSize: fontSize * scalePercent,
                fontFamily: fontFamily,
                lineHeight: (fontSize + 10) * scalePercent + 'px',
                top: coordinates.y * scalePercent,
                left: coordinates.x * scalePercent,
                opacity: color.opacity,
                outline:
                    isEditing || props.isSelected ? '2px solid blue' : 'none',
            }}
            dangerouslySetInnerHTML={{
                __html: isEditing ? editedValue : editedValue,
            }}
        />
    )
}

export { SlideTextBlock }
