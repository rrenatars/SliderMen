import React from 'react'
import { ObjectType, Slide } from '../types'
import { SlideTextBlock } from './Objects/SlideTextBlock'
import { ImageBlock } from './Objects/ImageBlock'
import styles from './SlideView.module.css'
import { PrimitiveBlock } from './Objects/PrimitiveBlock'

function SlideView(props: {
    slideData: Slide
    selectionSlideClass?: string
    scale?: number
    index?: number
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
    isSlideSelected?: boolean
    selectedObjectId?: string
    onObjectClick?: (objectId: string) => void
}) {
    const { objects, background } = props.slideData

    return (
        <div className={styles.indexAndSideSlide}>
            <div className={styles.slideIndex}>{props.index}</div>
            <div
                className={props.selectionSlideClass || styles.sideSlide}
                style={{
                    backgroundColor: background.color.hex,
                    ...(props.isSlideSelected && {
                        outlineColor: 'blue',
                        outlineWidth: '3px',
                    }),
                }}
                onClick={props.onClick}
            >
                {objects.map((object) => {
                    switch (object.type) {
                        case ObjectType.TEXTBLOCK:
                            return (
                                <SlideTextBlock
                                    textBlockData={object}
                                    key={object.id}
                                    scale={props.scale || 100}
                                    isSelected={
                                        object.id === props.selectedObjectId
                                    }
                                    onClick={() =>
                                        props.onObjectClick &&
                                        props.onObjectClick(object.id)
                                    }
                                ></SlideTextBlock>
                            )
                        case ObjectType.IMAGE:
                            return (
                                <ImageBlock
                                    imageBlockData={object}
                                    key={object.id}
                                    scale={props.scale || 100}
                                    isSelected={
                                        object.id === props.selectedObjectId
                                    }
                                    onClick={() =>
                                        props.onObjectClick &&
                                        props.onObjectClick(object.id)
                                    }
                                ></ImageBlock>
                            )
                        case ObjectType.PRIMITIVE:
                            return (
                                <PrimitiveBlock
                                    primitiveBlockData={object}
                                    key={object.id}
                                    scale={props.scale || 100}
                                    isSelected={
                                        object.id === props.selectedObjectId
                                    }
                                    onClick={() =>
                                        props.onObjectClick &&
                                        props.onObjectClick(object.id)
                                    }
                                ></PrimitiveBlock>
                            )
                        default:
                            return null
                    }
                })}
            </div>
        </div>
    )
}

export { SlideView }
