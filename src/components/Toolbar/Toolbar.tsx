import styles from './Toolbar.module.css'
import textFieldImage from '../../images/toolbar/text-field.png'
import iconImage from '../../images/toolbar/icon-image.png'
import figureIcon from '../../images/toolbar/figure-icon.png'
import newSlideButton from '../../images/toolbar/new-slide-button.png'
import binIcon from '../../images/toolbar/bin-icon.png'
import React, { useEffect, useRef, useState } from 'react'
import {
    Image,
    ObjectType,
    Presentation,
    Primitive,
    TextBlock,
} from '../../types'
import { ObjectToolbarButton } from './ObjectToolbarButton'
import { blackColor, newTextBlock } from '../../testData3'
import { generateUniqueId } from '../../tools'
import { usePresentationDataContext } from '../PresentationDataContext'
import { UploadFile } from '../UploadFile'
import { ContextMenu } from '../ContextMenu'

interface ToolbarProps {
    selectedObjectId?: string
    selectedSlideId?: string
    objects?: Array<Primitive | Image | TextBlock>
    onAddSlide: () => void
    onRemoveSlide: (slideId: string) => void
    isAddingText: boolean
    setIsAddingText: (isAddingText: boolean) => void
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const [contextMenuVisible, setContextMenuVisible] = useState(false)
    const [contextMenuPosition, setContextMenuPosition] = useState({
        top: 0,
        left: 0,
    })
    // const [isAddingText, setIsAddingText] = useState(props.isAddingText)

    const selectedObjectType =
        props.objects?.find((object) => object.id === props.selectedObjectId)
            ?.type || null

    const handleNewTextButton = () => {
        // Изменение стиля курсора при первом клике
        props.setIsAddingText(true)
    }

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (props.isAddingText) {
                // Check if the click occurred on the toolbar icon
                const toolbarIcon = document.querySelector(
                    `.${styles.toolbarIconContainer}`,
                )
                if (toolbarIcon && toolbarIcon.contains(e.target as Node)) {
                    // Clicked on the toolbar icon, prevent adding text
                    return
                }

                const clickedElement = e.target as HTMLElement

                // Get the parent container of the clicked element
                const container = clickedElement.parentNode as HTMLElement

                if (container) {
                    // Calculate the offset within the container
                    const containerRect = container.getBoundingClientRect()
                    const offsetX = e.clientX - containerRect.left - 5
                    const offsetY = e.clientY - containerRect.top - 5

                    // ... rest of your logic

                    const updatedSlides = presentationData.slides.map(
                        (slide) => {
                            if (slide.id === props.selectedSlideId) {
                                const newCoordinates = {
                                    x: offsetX,
                                    y: offsetY,
                                }

                                const updatedObjects = [
                                    ...(slide.objects || []),
                                    {
                                        ...newTextBlock,
                                        id: generateUniqueId(),
                                        coordinates: newCoordinates,
                                    },
                                ]
                                return { ...slide, objects: updatedObjects }
                            }
                            return slide
                        },
                    )

                    const updatedPresentationData = {
                        ...presentationData,
                        slides: updatedSlides,
                    }

                    setPresentationData(updatedPresentationData)
                    // Reset the flag after adding text
                    props.setIsAddingText(false)
                }
            }
        }

        if (props.isAddingText) {
            document.addEventListener('click', handleDocumentClick)
        }

        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [props.isAddingText])

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        setContextMenuPosition({ top: e.clientY + 8, left: e.clientX - 11 })
        setContextMenuVisible(!contextMenuVisible)
    }

    return (
        <div className={styles.toolbar}>
            <div
                className={styles.toolbarIconContainer}
                style={{
                    ...(props.isAddingText && {
                        background: '#A1C5FF',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img
                    onClick={handleNewTextButton}
                    className={styles.toolbarIcon}
                    src={textFieldImage}
                    alt=""
                />
            </div>
            <div
                className={styles.toolbarIconContainer}
                style={{
                    ...(contextMenuVisible && {
                        background: '#A1C5FF',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img
                    onClick={handleContextMenu}
                    className={styles.toolbarIcon}
                    src={iconImage}
                    alt=""
                />
            </div>
            <div className={styles.toolbarIconContainer}>
                <img className={styles.toolbarIcon} src={figureIcon} alt="" />
            </div>
            <div className={styles.toolbarIconContainer}>
                <img
                    onClick={props.onAddSlide}
                    className={styles.toolbarIcon}
                    src={newSlideButton}
                    alt="Добавить слайд"
                    title="Добавить слайд"
                />
            </div>
            <div className={styles.toolbarIconContainer}>
                <img
                    onClick={() =>
                        props.selectedSlideId &&
                        props.onRemoveSlide(props.selectedSlideId)
                    }
                    className={styles.toolbarIcon}
                    src={binIcon}
                    alt="Удалить слайд"
                    title="Удалить слайд"
                />
            </div>
            {contextMenuVisible && (
                <ContextMenu
                    setContextMenuVisible={setContextMenuVisible}
                    contextMenuPosition={contextMenuPosition}
                    selectedSlideId={props.selectedSlideId}
                />
            )}
            {selectedObjectType && (
                <ObjectToolbarButton
                    selectedObjectType={selectedObjectType}
                ></ObjectToolbarButton>
            )}
        </div>
    )
}

export { Toolbar }
