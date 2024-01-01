import React, { useEffect, useState } from 'react'
import { Bars } from './Bars/Bars'
import { SideSlides } from './Slides/SideSlides'
import styles from './PresentationView.module.css'
import { SlideEditor } from './Slides/SlideEditor'
import { emptySlide, newSlideTextBlock } from '../testData3'
import { PresentationName } from './PresentationName'
import { generateUniqueId } from '../tools'
import { usePresentationDataContext } from './PresentationDataContext'
import { useAppActions, useAppSelector } from '../redux/hooks'

function PresentationView() {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const slides = useAppSelector((state) => state.slides)

    const selection = useAppSelector((state) => state.selection)
    console.log('selection: ', selection)
    const {
        createChangeSelectedSlideAction,
        createChangeSelectedObjectAction,
    } = useAppActions()

    const [selectedObjectId, setSelectedObjectId] = useState(
        selection?.objectId,
    )
    const [slidesState, setSlidesState] = useState(presentationData.slides)
    const [isAddingTextBlock, setIsAddingTextBlock] = useState(false)

    function handleSlideClick(clickedSlideId: string): void {
        createChangeSelectedSlideAction(clickedSlideId)
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
    }

    function handleObjectClick(clickedObjectId: string): void {
        if (clickedObjectId === selectedObjectId) {
            createChangeSelectedObjectAction('')
        } else {
            createChangeSelectedObjectAction(clickedObjectId)
        }
    }

    const selectedSlide = slides.find((slide) => slide.id === selection.slideId)

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
            <PresentationName></PresentationName>
            <div className={styles.icon}></div>
            <Bars
                selectedObjectId={selectedObjectId}
                selectedSlideId={selection.slideId}
                objects={selectedSlide?.objects}
                onAddSlide={handleAddSlide}
                onRemoveSlide={handleRemoveSlide}
                isAddingTextBlock={isAddingTextBlock}
                setIsAddingTextBlock={setIsAddingTextBlock}
            ></Bars>
            <div className={styles.workfield}>
                <SideSlides
                    // slides={presentationData.slides}
                    selectedSlideId={selection.slideId}
                    onSlideClick={handleSlideClick}
                />
                {selectedSlide && (
                    <SlideEditor
                        selectedSlide={selectedSlide}
                        selectedObjectId={selectedObjectId}
                        onObjectClick={handleObjectClick}
                        isAddingText={isAddingTextBlock}
                    ></SlideEditor>
                )}
            </div>
        </div>
    )
}

export { PresentationView }
