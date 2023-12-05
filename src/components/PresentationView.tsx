import React, { useState } from 'react'
import { Presentation } from '../types'
import { Bars } from './Toolbar/Bars'
import { SideSlides } from './SideSlides'
import styles from './PresentationView.module.css'
import { SlideEditor } from './SlideEditor'

function PresentationView(props: { presentationData: Presentation }) {
    const { name, slides, selection } = props.presentationData

    const [selectedSlideId, setSelectedSlideId] = useState(selection?.slideId)

    function handleSlideClick(clickedSlideId: string): void {
        setSelectedSlideId(clickedSlideId)
    }

    const [selectedObjectId, setSelectedObjectId] = useState(
        selection?.objectId,
    )

    function handleObjectClick(clickedObjectId: string): void {
        if (clickedObjectId === selectedObjectId) {
            setSelectedObjectId(undefined)
        } else {
            setSelectedObjectId(clickedObjectId)
        }
    }

    const selectedSlide = slides.find((slide) => slide.id === selectedSlideId)

    return (
        <div>
            <h1 className={styles.presentationName}>{name}</h1>
            <Bars
                selectedObjectId={selectedObjectId}
                objects={selectedSlide?.objects}
            ></Bars>
            <div className={styles.workfield}>
                <SideSlides
                    slides={slides}
                    selectedSlideId={selectedSlideId}
                    onSlideClick={handleSlideClick}
                ></SideSlides>
                {selectedSlide && (
                    <SlideEditor
                        selectedSlide={selectedSlide}
                        selectedObjectId={selectedObjectId}
                        onObjectClick={handleObjectClick}
                    ></SlideEditor>
                )}
            </div>
        </div>
    )
}

export { PresentationView }
