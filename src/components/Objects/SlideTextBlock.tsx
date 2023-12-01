import { TextBlock } from '../../types'
import React from 'react'

function SlideTextBlock(props: {
    textBlockData: TextBlock
    scale: number
    isSelected: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}) {
    const { value, color, fontSize, fontFamily, coordinates, width, height } =
        props.textBlockData

    const scalePercent = props.scale / 100

    return (
        <div
            onClick={props.onClick}
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
                border: props.isSelected ? '2px solid blue' : 'none',
            }}
        >
            {value}
        </div>
    )
}

export { SlideTextBlock }
