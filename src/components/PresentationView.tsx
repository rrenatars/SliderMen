import React, { useEffect, useState } from 'react'
import { Bars } from './Toolbar/Bars'
import { SideSlides } from './SideSlides'
import styles from './PresentationView.module.css'
import { SlideEditor } from './SlideEditor'
import { emptySlide, newSlideTextBlock } from '../testData3'
import { PresentationName } from './PresentationName'
import { generateUniqueId } from '../tools'
import { usePresentationDataContext } from './PresentationDataContext'

function PresentationView() {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()
    const { name, slides, selection } = presentationData

    const [selectedSlideId, setSelectedSlideId] = useState(
        presentationData.selection?.slideId,
    )
    const [selectedObjectId, setSelectedObjectId] = useState(
        selection?.objectId,
    )
    const [slidesState, setSlidesState] = useState(presentationData.slides)
    const [isAddingText, setIsAddingText] = useState(false)

    function handleSlideClick(clickedSlideId: string): void {
        setSelectedSlideId(clickedSlideId)
    }

    function handleAddSlide(): void {
        const newSlideId = generateUniqueId()
        const newSlide = {
            ...emptySlide,
            id: newSlideId,
            objects: [newSlideTextBlock],
        }

        setSlidesState((prevSlides) => [...prevSlides, newSlide])
        const updatedPresentationData = {
            ...presentationData,
            slides: [...slides, newSlide],
            selection: {
                slideId: newSlideId,
            },
        }

        setPresentationData(updatedPresentationData)

        setSelectedSlideId(newSlideId)
    }

    function handleRemoveSlide(slideId: string): void {
        setSlidesState((prevSlidesState) =>
            prevSlidesState.filter((slide) => slide.id !== slideId),
        )

        const removedIndex = slidesState.findIndex(
            (slide) => slide.id === slideId,
        )

        const newSelectedSlideId =
            removedIndex === 0 && slidesState.length > 1
                ? slidesState[1].id
                : removedIndex > 0
                ? slidesState[removedIndex - 1].id
                : undefined

        const updatedPresentationData = {
            ...presentationData,
            slides: slidesState.filter((slide) => slide.id !== slideId),
        }

        setPresentationData(updatedPresentationData)

        setSelectedSlideId(newSelectedSlideId)
    }

    function handleObjectClick(clickedObjectId: string): void {
        if (clickedObjectId === selectedObjectId) {
            setSelectedObjectId(undefined)
        } else {
            setSelectedObjectId(clickedObjectId)
        }
    }

    const selectedSlide = presentationData.slides.find(
        (slide) => slide.id === selectedSlideId,
    )

    const handlePresentationNameChange = (newName: string) => {
        setPresentationData({ ...presentationData, name: newName })
    }

    useEffect(() => {
        setSlidesState(presentationData.slides)
    }, [presentationData])

    return (
        <div
            style={{
                zIndex: 11,
            }}
        >
            <PresentationName
                name={name}
                onChange={handlePresentationNameChange}
            ></PresentationName>
            <div className={styles.icon}></div>
            <Bars
                selectedObjectId={selectedObjectId}
                selectedSlideId={selectedSlideId}
                objects={selectedSlide?.objects}
                onAddSlide={handleAddSlide}
                onRemoveSlide={handleRemoveSlide}
                isAddingText={isAddingText}
                setIsAddingText={setIsAddingText}
            ></Bars>
            <div className={styles.workfield}>
                <SideSlides
                    slides={presentationData.slides}
                    selectedSlideId={selectedSlideId}
                    onSlideClick={handleSlideClick}
                />
                {selectedSlide && (
                    <SlideEditor
                        selectedSlide={selectedSlide}
                        selectedObjectId={selectedObjectId}
                        onObjectClick={handleObjectClick}
                        isAddingText={isAddingText}
                    ></SlideEditor>
                )}
            </div>
        </div>
    )
}

export { PresentationView }
