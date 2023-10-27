import React from 'react'
import { Image, ObjectType, Slide, TextBlock } from '../types'
import { SlideTextBlock } from './SlideTextBlock'
import { ImageBlock } from './ImageBlock'
import styles from './SlideView.module.css'

function SlideView(props: { slideData: Slide; className?: string }) {
    const { id, objects, background } = props.slideData

    const textBlockElements = objects.filter(
        (slideObject) => slideObject.type === ObjectType.TEXTBLOCK,
    ) as TextBlock[]

    const imageBlockElements = objects.filter(
        (slideObject) => slideObject.type === ObjectType.IMAGE,
    ) as Image[]

    return (
        <div
            className={props.className || styles.content}
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
        </div>
    )
}

export { SlideView }
