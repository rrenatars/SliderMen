import styles from './SideSlides.module.css'
import { SlideView } from './SlideView'
import React, { useEffect } from 'react'
import { usePresentationDataContext } from './PresentationDataContext'
import { useDraggableList } from '../hooks/useDraggableList'
import { Slide } from '../types'

function SideSlides(props: {
    slides: Slide[]
    selectedSlideId?: string
    onSlideClick: (slideId: string) => void
}) {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const { dragAndDrop, onDragStart, onDragOver, onDrop, list } =
        useDraggableList({
            slides: props.slides,
        })

    useEffect(() => {
        setPresentationData({
            ...presentationData,
            slides: list,
        })
    }, [dragAndDrop])

    return (
        <div className={styles.slides}>
            {list.map((slide, index) => (
                <div
                    key={slide.id}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragStart={onDragStart}
                    draggable
                    data-position={index}
                >
                    <SlideView
                        slideData={slide}
                        key={slide.id}
                        scale={20}
                        index={index + 1}
                        onClick={() => props.onSlideClick(slide.id)}
                        isSlideSelected={props.selectedSlideId === slide.id}
                    ></SlideView>
                </div>
            ))}
        </div>
    )
}

export { SideSlides }
