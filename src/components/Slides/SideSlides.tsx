import styles from './SideSlides.module.css'
import { SlideView } from './SlideView'
import React, { useEffect } from 'react'
import { usePresentationDataContext } from '../PresentationDataContext'
import { useDraggableList } from '../../hooks/useDraggableList'
import { Slide } from '../../types'
import { useAppActions, useAppSelector } from '../../redux/hooks'

function SideSlides(props: {
    selectedSlideId?: string
    onSlideClick: (slideId: string) => void
}) {
    const slides = useAppSelector((state) => state.slides)
    const { createChangeOrderSlidesAction } = useAppActions()

    const { dragAndDrop, onDragStart, onDragOver, onDrop, list } =
        useDraggableList()

    useEffect(() => {
        // setPresentationData({
        //     ...presentationData,
        //     slides: list,
        // })
        createChangeOrderSlidesAction(list)
    }, [dragAndDrop])

    return (
        <div className={styles.slides}>
            {slides.map((slide, index) => (
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
