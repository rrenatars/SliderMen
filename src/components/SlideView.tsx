import React from 'react'
import { Slide } from '../types'
import styles from './SlideView.module.css'
import { ObjectBlock } from './Objects/ObjectBlock'

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
                {objects.map((object) => (
                    <ObjectBlock
                        key={object.id}
                        objectData={object}
                        scale={props.scale || 100}
                        isSelected={object.id === props.selectedObjectId}
                        onClick={() =>
                            props.onObjectClick &&
                            props.onObjectClick(object.id)
                        }
                    />
                ))}
            </div>
        </div>
    )
}

export { SlideView }
