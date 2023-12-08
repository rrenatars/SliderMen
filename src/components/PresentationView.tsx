import React, { useState } from 'react'
import { Presentation } from '../types'
import { Bars } from './Toolbar/Bars'
import { SideSlides } from './SideSlides'
import styles from './PresentationView.module.css'
import { SlideEditor } from './SlideEditor'
import { background3 } from '../testData3'

function generateUniqueId(): string {
    return Math.random().toString(36).substring(7)
}

function PresentationView(props: { presentationData: Presentation }) {
    const { name, slides, selection } = props.presentationData

    const [selectedSlideId, setSelectedSlideId] = useState(selection?.slideId)

    function handleSlideClick(clickedSlideId: string): void {
        setSelectedSlideId(clickedSlideId)
    }

    const [slidesState, setSlidesState] = useState(slides)

    function handleAddSlide(): void {
        const newSlideId = generateUniqueId()

        setSlidesState((prevSlides) => [
            ...prevSlides,
            {
                id: newSlideId,
                objects: [],
                background: background3,
            },
        ])

        setSelectedSlideId(newSlideId)
    }

    function handleRemoveSlide(slideId: string): void {
        const removedIndex = slidesState.findIndex(
            (slide) => slide.id === slideId,
        )

        const newSelectedSlideId =
            removedIndex === 0 && slidesState.length > 1
                ? slidesState[1].id
                : removedIndex > 0
                ? slidesState[removedIndex - 1].id
                : undefined

        setSlidesState(slidesState.filter((slide) => slide.id !== slideId))
        setSelectedSlideId(newSelectedSlideId)
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

    const selectedSlide = slidesState.find(
        (slide) => slide.id === selectedSlideId,
    )

    return (
        <div>
            <h1 className={styles.presentationName}>{name}</h1>
            <Bars
                selectedObjectId={selectedObjectId}
                selectedSlideId={selectedSlideId}
                objects={selectedSlide?.objects}
                presentationData={props.presentationData}
                onAddSlide={handleAddSlide}
                onRemoveSlide={handleRemoveSlide}
            ></Bars>
            <div className={styles.workfield}>
                <SideSlides
                    slides={slidesState}
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
