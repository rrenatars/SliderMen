import React, { useEffect, useState } from 'react'
import { Presentation } from '../types'
import { Bars } from './Toolbar/Bars'
import { SideSlides } from './SideSlides'
import styles from './PresentationView.module.css'
import { SlideEditor } from './SlideEditor'
import { background3, presentation } from '../testData3'
import { PresentationName } from './PresentationName'
import { generateUniqueId } from '../tools'
import { usePresentationDataContext } from './PresentationDataContext'

function PresentationView() {
    // const initialPresentationData = usePresentationDataContext()
    // const [presentationData, setPresentationData] = useState(
    //     initialPresentationData,
    // )

    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const { name, slides, selection } = presentationData

    const [selectedSlideId, setSelectedSlideId] = useState(
        presentationData.selection?.slideId,
    )

    function handleSlideClick(clickedSlideId: string): void {
        setSelectedSlideId(clickedSlideId)

        const updatedPresentationData = {
            ...presentationData,
            selection: {
                ...presentationData.selection,
                slideId: clickedSlideId,
            },
        }

        setPresentationData(updatedPresentationData)
    }

    const [slidesState, setSlidesState] = useState(presentationData.slides)

    function handleAddSlide(): void {
        const newSlideId = generateUniqueId()

        const newSlide = {
            id: newSlideId,
            objects: [],
            background: background3,
        }

        setSlidesState((prevSlides) => [...prevSlides, newSlide])
        const updatedPresentationData = {
            ...presentationData,
            slides: [...slides, newSlide],
        }

        setPresentationData(updatedPresentationData)

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

    console.log('presentationData: ', presentationData)
    const selectedSlide = presentationData.slides.find(
        (slide) => slide.id === selectedSlideId,
    )

    const handlePresentationNameChange = (newName: string) => {
        presentationData.name = newName
    }

    return (
        <div>
            <PresentationName
                name={name}
                onChange={handlePresentationNameChange}
            ></PresentationName>
            <Bars
                selectedObjectId={selectedObjectId}
                selectedSlideId={selectedSlideId}
                objects={selectedSlide?.objects}
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
