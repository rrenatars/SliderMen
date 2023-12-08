import { TextBlock } from '../../types'
import React, { ChangeEvent, useState } from 'react'

function SlideTextBlock(props: {
    textBlockData: TextBlock
    scale: number
    isSelected: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}) {
    const { value, color, fontSize, fontFamily, coordinates, width, height } =
        props.textBlockData

    const scalePercent = props.scale / 100

    const [isEditing, setIsEditing] = useState(false)
    const [editedValue, setEditedValue] = useState(value)

    const handleClick = () => {
        setIsEditing(!isEditing)
    }

    const handleBlur = (e: ChangeEvent<HTMLDivElement>) => {
        setIsEditing(false)
        const newTextContent = e.target.textContent
        if (newTextContent !== null) {
            setEditedValue(newTextContent)
        }
    }

    return (
        <div
            onClick={props.onClick}
            onDoubleClick={handleClick}
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
        >
            {editedValue}
        </div>
    )
}

export { SlideTextBlock }
