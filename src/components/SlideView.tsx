import React from 'react'
import { Image, ObjectType, Slide, TextBlock, Primitive } from '../types'
import { SlideTextBlock } from './Objects/SlideTextBlock'
import { ImageBlock } from './Objects/ImageBlock'
import { PrimitiveBlock } from './Objects/PrimitiveBlock'
import styles from './SlideView.module.css'

function SlideView(props: {
    slideData: Slide
    selectionSlideClass?: string
    scale?: number
    index?: number
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
    selectedSlide?: boolean
}) {
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
        <div className={styles.indexAndSideSlide}>
            <div className={styles.slideIndex}>{props.index}</div>
            <div
                className={props.selectionSlideClass || styles.sideSlide}
                style={{
                    backgroundColor: background.color.hex,
                    ...(props.selectedSlide && {
                        outlineColor: 'blue',
                        outlineWidth: '3px',
                    }),
                }}
                onClick={props.onClick}
            >
                {textBlockElements.map((textBlock) => (
                    <SlideTextBlock
                        textBlockData={textBlock}
                        key={id}
                        scale={props.scale || 100}
                    ></SlideTextBlock>
                ))}
                {imageBlockElements.map((imageBlock) => (
                    <ImageBlock
                        imageBlockData={imageBlock}
                        key={id}
                        scale={props.scale || 100}
                    ></ImageBlock>
                ))}
                {primitiveElements.map((primitive) => (
                    <PrimitiveBlock
                        primitive={primitive}
                        key={primitive.id}
                        scale={props.scale || 100}
                    ></PrimitiveBlock>
                ))}
            </div>
        </div>
    )
}

export { SlideView }
