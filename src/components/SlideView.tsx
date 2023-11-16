import React from 'react'
import { Image, ObjectType, Slide, TextBlock, Primitive } from '../types'
import { SlideTextBlock } from './SlideTextBlock'
import { ImageBlock } from './ImageBlock'
import { PrimitiveBlock } from './PrimitiveBlock'
import styles from './SlideView.module.css'

function SlideView(props: { slideData: Slide; selectionSlideClass?: string }) {
    const { id, objects, background } = props.slideData

    const textBlockElements = objects.filter(
        (slideObject) => slideObject.type === ObjectType.TEXTBLOCK,
    ) as TextBlock[]

    const imageBlockElements = objects.filter(
        (slideObject) => slideObject.type === ObjectType.IMAGE,
    ) as Image[]

    const primitiveElements = objects.filter(
        (primitive) => primitive.type === ObjectType.PRIMITIVE,
    ) as Primitive[]

    return (
        <div
            className={props.selectionSlideClass || styles.sideSlide}
            style={{ backgroundColor: background.color.hex }}
        >
            {textBlockElements.map((textBlock) => (
                <SlideTextBlock
                    textBlockData={textBlock}
                    key={id}
                ></SlideTextBlock>
            ))}
            {imageBlockElements.map((imageBlock) => (
                <ImageBlock imageBlockData={imageBlock} key={id}></ImageBlock>
            ))}
            {primitiveElements.map((primitive) => (
                <PrimitiveBlock
                    primitive={primitive}
                    key={primitive.id}
                ></PrimitiveBlock>
            ))}
        </div>
    )
}

export { SlideView }
