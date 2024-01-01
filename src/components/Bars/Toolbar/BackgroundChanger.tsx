import React, { useEffect, useRef, useState } from 'react'
import styles from './BackgroundChanger.module.css'
import dropDownListIcon from '../../../images/toolbar/drop-down-list-icon.png'
import cancelIcon from '../../../images/toolbar/cancel-icon.png'
import { usePresentationDataContext } from '../../PresentationDataContext'
import { ColorPicker } from './ColorPicker'
import { useAppActions, useAppSelector } from '../../../redux/hooks'
import { createChangeBackgroundAction } from '../../../redux/actionCreator'

interface BackgroundChangerProps {
    selectedSlideId: string
    setBackgroundChangerPopupVisible: React.Dispatch<
        React.SetStateAction<boolean>
    >
}

const BackgroundChanger: React.FC<BackgroundChangerProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const fileInputRef = useRef<HTMLInputElement>(null)

    const slides = useAppSelector((state) => state.slides)
    const selection = useAppSelector((state) => state.selection)
    const { createChangeBackgroundAction } = useAppActions()
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const initialBackgroundColor =
        presentationData.slides.find(
            (slide) => slide.id === props.selectedSlideId,
        )?.background?.color.hex || 'white'
    const initialBackgroundImage =
        presentationData.slides.find(
            (slide) => slide.id === props.selectedSlideId,
        )?.background?.base64 || undefined

    const [colorPickerVisible, setColorPickerVisible] = useState(false)
    const [colorPickerPosition, setColorPickerPosition] = useState({
        top: 0,
        left: 0,
    })
    const [selectedColor, setSelectedColor] = useState(initialBackgroundColor)
    const [selectedImage, setSelectedImage] = useState(initialBackgroundImage)

    useEffect(() => {
        const updatedSlides = presentationData.slides.map((slide) => {
            if (slide.id === props.selectedSlideId) {
                return {
                    ...slide,
                    background: {
                        color: {
                            ...slide.background.color,
                            hex: selectedColor,
                        },
                        base64: selectedImage,
                    },
                }
            }
            return slide
        })

        setPresentationData({
            ...presentationData,
            slides: updatedSlides,
        })

        slides.forEach((slide) => {
            if (selection.slideId) {
                createChangeBackgroundAction(selection.slideId, {
                    color: {
                        ...slide.background.color,
                        hex: selectedColor,
                    },
                    base64: selectedImage,
                })
            }
        })
    }, [selectedColor, selectedImage])

    const handleCancelClick = () => {
        props.setBackgroundChangerPopupVisible(false)
    }

    const handleColorIconClick = (e: React.MouseEvent) => {
        setColorPickerVisible(!colorPickerVisible)
        const clickedElement = e.currentTarget
        const rect = clickedElement.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const left = rect.left + window.scrollX

        setColorPickerPosition({ top: top + 30, left: left })
    }

    const handleColorSelection = (color: string) => {
        setSelectedColor(color)
        setSelectedImage(undefined)
        setColorPickerVisible(false)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            try {
                const img = new window.Image()

                img.onload = () => {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        const base64String = e.target?.result as string

                        setSelectedImage(base64String)
                    }

                    reader.readAsDataURL(file)
                }

                img.src = URL.createObjectURL(file)
            } catch (error) {
                console.log('Не загружено:', error)
            }
        }
    }

    return (
        <div>
            <div className={styles.overlay} />
            <div className={styles.popup}>
                <div className={styles.headline}>
                    <div>
                        <p className={styles.headlineText}>Фон</p>
                    </div>
                    <div
                        onClick={handleCancelClick}
                        className={styles.cancelIconContainer}
                    >
                        <img
                            className={styles.cancelIcon}
                            src={cancelIcon}
                            alt="Закрыть"
                            title="Закрыть"
                        />
                    </div>
                </div>
                <div className={styles.optionContainer}>
                    <p className={styles.optionText}>Цвет</p>
                    <div
                        className={styles.colorButton}
                        onClick={handleColorIconClick}
                    >
                        <div
                            className={styles.colorCircle}
                            style={{
                                background: selectedColor,
                            }}
                        ></div>
                        <img
                            className={styles.icon}
                            style={{
                                transform: colorPickerVisible
                                    ? 'rotate(180deg)'
                                    : 'none',
                            }}
                            src={dropDownListIcon}
                            alt=""
                        />
                    </div>
                </div>
                <div className={styles.optionContainer}>
                    <p className={styles.optionText}>Изображение</p>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className={styles.entry}
                    />
                    <button
                        onClick={handleUploadClick}
                        className={styles.uploadButton}
                    >
                        Загрузить картинку или гифку
                    </button>
                </div>
            </div>
            {colorPickerVisible && (
                <ColorPicker
                    position={colorPickerPosition}
                    handleColorSelection={handleColorSelection}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                ></ColorPicker>
            )}
        </div>
    )
}

export { BackgroundChanger }
