import styles from './Toolbar.module.css'
import textFieldImage from '../../../images/toolbar/text-field.png'
import iconImage from '../../../images/toolbar/icon-image.png'
import figureIcon from '../../../images/toolbar/figure-icon.png'
import newSlideButton from '../../../images/toolbar/new-slide-button.png'
import binIcon from '../../../images/toolbar/bin-icon.png'
import React, { useEffect, useState } from 'react'
import { Coordinates, Image, Primitive, TextBlock } from '../../../types'
import { ObjectToolbarButton } from './ObjectToolbarButton'
import { newTextBlock } from '../../../testData3'
import { generateUniqueId } from '../../../tools'
import { usePresentationDataContext } from '../../PresentationDataContext'
import { AddImagePopup } from './AddImagePopup'
import { FiguresContextMenu } from './FiguresContextMenu'
import { AddImageContextMenu } from './AddImageContextMenu'
import { BackgroundChanger } from './BackgroundChanger'
import { createAddSlideAction } from '../../../redux/actionCreator'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

interface ToolbarProps {
    selectedObjectId?: string
    selectedSlideId?: string
    objects?: Array<Primitive | Image | TextBlock>
    onAddSlide: () => void
    onRemoveSlide: (slideId: string) => void
    isAddingTextBlock: boolean
    setIsAddingTextBlock: (isAddingText: boolean) => void
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const slides = useAppSelector((state) => state.slides)
    const selection = useAppSelector((state) => state.selection)
    const {
        createAddSlideAction,
        createRemoveSlideAction,
        createChangeSelectedSlideAction,
        createAddObjectAction,
    } = useAppActions()

    const [contextMenuVisible, setContextMenuVisible] = useState(false)
    const [contextMenuFiguresVisible, setContextMenuFiguresVisible] =
        useState(false)
    const [contextMenuPosition, setContextMenuPosition] = useState({
        top: 0,
        left: 0,
    })
    const [contextMenuFiguresPosition, setContextMenuFiguresPosition] =
        useState({
            top: 0,
            left: 0,
        })
    const [linkPopupVisible, setLinkPopupVisible] = useState(false)
    const [backgroundChangerVisible, setBackgroundChangerPopupVisible] =
        useState(false)

    const selectedObject = props.objects?.find(
        (object) => object.id === selection.objectId,
    )

    const handleRemoveSlide = () => {
        if (selection.slideId) {
            const removedIndex = slides.findIndex(
                (slide) => slide.id === selection.slideId,
            )

            const newSelectedSlideId =
                removedIndex === 0 && slides.length > 1
                    ? slides[1].id
                    : removedIndex > 0
                    ? slides[removedIndex - 1].id
                    : undefined

            createRemoveSlideAction(selection.slideId)
            if (newSelectedSlideId) {
                createChangeSelectedSlideAction(newSelectedSlideId)
            }
        }
    }

    const handleNewTextButton = () => {
        props.setIsAddingTextBlock(true)
    }

    function createNewTextBlock(coordinates: Coordinates) {
        return {
            ...newTextBlock,
            id: generateUniqueId(),
            coordinates: coordinates,
        }
    }

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const isToolbarIcon = (e.target as HTMLElement).closest(
                `.${styles.toolbarIconContainer}`,
            )
            const isToolbar = (e.target as HTMLElement).closest(
                `.${styles.toolbar}`,
            )

            if (props.isAddingTextBlock && !isToolbarIcon && !isToolbar) {
                const clickedElement = e.target as HTMLElement
                const container = clickedElement.parentNode as HTMLElement

                if (container) {
                    const containerRect = container.getBoundingClientRect()
                    const offsetX = e.clientX - containerRect.left - 5
                    const offsetY = e.clientY - containerRect.top - 5

                    const newCoordinates: Coordinates = {
                        x: offsetX,
                        y: offsetY,
                    }

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

                    if (selection.slideId) {
                        createAddObjectAction(
                            selection.slideId,
                            createNewTextBlock(newCoordinates),
                        )
                    }

                    setPresentationData(updatedPresentationData)
                    props.setIsAddingTextBlock(false)
                }
            }
        }

        if (props.isAddingTextBlock) {
            document.addEventListener('click', handleDocumentClick)
        }

        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [props.isAddingTextBlock])

    const handleContextMenuClick = (e: React.MouseEvent) => {
        e.preventDefault()

        const clickedElement = e.currentTarget
        const rect = clickedElement.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const left = rect.left + window.scrollX

        setContextMenuPosition({ top: top + 38, left: left })
        setContextMenuVisible(!contextMenuVisible)
    }

    const handleContextMenuFiguresClick = (e: React.MouseEvent) => {
        e.preventDefault()

        const clickedElement = e.currentTarget
        const rect = clickedElement.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const left = rect.left + window.scrollX

        setContextMenuFiguresPosition({ top: top + 38, left: left })
        setContextMenuFiguresVisible(!contextMenuFiguresVisible)
    }

    const handleBackgroundButtonClick = () => {
        setBackgroundChangerPopupVisible(true)
    }

    return (
        <div className={styles.toolbar}>
            <div
                // onClick={props.onAddSlide}
                onClick={() => createAddSlideAction()}
                className={styles.toolbarIconContainer}
            >
                <img
                    className={styles.toolbarIcon}
                    src={newSlideButton}
                    alt="Добавить слайд"
                    title="Добавить слайд"
                />
            </div>
            <div
                // onClick={() =>
                //     props.selectedSlideId &&
                //     props.onRemoveSlide(props.selectedSlideId)
                // }
                onClick={() => selection.slideId && handleRemoveSlide()}
                className={styles.toolbarIconContainer}
            >
                <img
                    className={styles.toolbarIcon}
                    src={binIcon}
                    alt="Удалить слайд"
                    title="Удалить слайд"
                />
            </div>
            {selectedObject && props.selectedSlideId && (
                <ObjectToolbarButton
                    selectedObject={selectedObject}
                    contextMenuVisible={contextMenuVisible}
                    setContextMenuVisible={setContextMenuVisible}
                    contextMenuPosition={contextMenuPosition}
                    setContextMenuPosition={setContextMenuPosition}
                    selectedSlideId={props.selectedSlideId}
                ></ObjectToolbarButton>
            )}
            <div
                onClick={handleNewTextButton}
                className={styles.toolbarIconContainer}
                style={{
                    ...(props.isAddingTextBlock && {
                        background: '#A1C5FF',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img
                    className={styles.toolbarIcon}
                    src={textFieldImage}
                    alt=""
                />
            </div>
            <div
                onClick={handleContextMenuClick}
                className={styles.toolbarIconContainer}
                style={{
                    ...(contextMenuVisible && {
                        background: '#A1C5FF',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img className={styles.toolbarIcon} src={iconImage} alt="" />
            </div>
            <div
                onClick={handleContextMenuFiguresClick}
                className={styles.toolbarIconContainer}
                style={{
                    ...(contextMenuFiguresVisible && {
                        background: '#A1C5FF',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img className={styles.toolbarIcon} src={figureIcon} alt="" />
            </div>
            <button
                className={styles.button}
                onClick={handleBackgroundButtonClick}
                style={{
                    ...(backgroundChangerVisible && {
                        background: '#b4cfff',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                Фон
            </button>
            {props.selectedSlideId && backgroundChangerVisible && (
                <BackgroundChanger
                    selectedSlideId={props.selectedSlideId}
                    setBackgroundChangerPopupVisible={
                        setBackgroundChangerPopupVisible
                    }
                ></BackgroundChanger>
            )}
            {props.selectedSlideId && contextMenuVisible && (
                <AddImageContextMenu
                    setContextMenuVisible={setContextMenuVisible}
                    setLinkPopupVisible={setLinkPopupVisible}
                    contextMenuPosition={contextMenuPosition}
                    selectedSlideId={props.selectedSlideId}
                />
            )}
            {props.selectedSlideId && contextMenuFiguresVisible && (
                <FiguresContextMenu
                    setContextMenuFiguresVisible={setContextMenuFiguresVisible}
                    contextMenuFiguresPosition={contextMenuFiguresPosition}
                    selectedSlideId={props.selectedSlideId}
                />
            )}
            {props.selectedSlideId && linkPopupVisible && (
                <AddImagePopup
                    selectedSlideId={props.selectedSlideId}
                    setLinkPopupVisible={setLinkPopupVisible}
                ></AddImagePopup>
            )}
        </div>
    )
}

export { Toolbar }
