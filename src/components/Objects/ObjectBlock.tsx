import React from 'react'
import { Image, ObjectType, Primitive, TextBlock } from '../../types'
import { SlideTextBlock } from './SlideTextBlock'
import { ImageBlock } from './ImageBlock'
import { PrimitiveBlock } from './PrimitiveBlock'

function ObjectBlock(props: {
    objectData: Primitive | Image | TextBlock
    scale: number
    isSelected: boolean
    onClick: () => void
}) {
    switch (props.objectData.type) {
        case ObjectType.TEXTBLOCK:
            return (
                <SlideTextBlock
                    textBlockData={props.objectData}
                    scale={props.scale}
                    isSelected={props.isSelected}
                    onClick={props.onClick}
                />
            )
        case ObjectType.IMAGE:
            return (
                <ImageBlock
                    imageBlockData={props.objectData}
                    scale={props.scale}
                    isSelected={props.isSelected}
                    onClick={props.onClick}
                />
            )
        case ObjectType.PRIMITIVE:
            return (
                <PrimitiveBlock
                    primitiveBlockData={props.objectData}
                    scale={props.scale}
                    isSelected={props.isSelected}
                    onClick={props.onClick}
                />
            )
        default:
            return null
    }
}

export { ObjectBlock }
