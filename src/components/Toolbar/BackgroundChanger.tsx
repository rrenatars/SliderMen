import React, { useEffect, useState } from 'react'
import styles from './BackgroundChanger.module.css'
import dropDownListIcon from '../../images/toolbar/drop-down-list-icon.png'
import cancelIcon from '../../images/toolbar/cancel-icon.png'
import { usePresentationDataContext } from '../PresentationDataContext'
import { ColorPicker } from './ColorPicker'
import { ObjectType } from '../../types'

interface BackgroundChangerProps {
    selectedSlideId: string
    setBackgroundChangerPopupVisible: React.Dispatch<
        React.SetStateAction<boolean>
    >
}

const BackgroundChanger: React.FC<BackgroundChangerProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const initialBackgroundColor =
        presentationData.slides.find(
            (slide) => slide.id === props.selectedSlideId,
        )?.background?.color.hex || 'white'

    const [colorPickerVisible, setColorPickerVisible] = useState(false)
    const [colorPickerPosition, setColorPickerPosition] = useState({
        top: 0,
        left: 0,
    })
    const [selectedColor, setSelectedColor] = useState(initialBackgroundColor)

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
                    },
                }
            }
            return slide
        })

        setPresentationData({
            ...presentationData,
            slides: updatedSlides,
        })

        console.log('slides: ', presentationData)
    }, [selectedColor])

    const handleCancelClick = () => {
        props.setBackgroundChangerPopupVisible(false)
    }

    const handleColorIconClick = (e: React.MouseEvent) => {
        setColorPickerVisible(!colorPickerVisible)
        const clickedElement = e.currentTarget
        const rect = clickedElement.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const left = rect.left + window.scrollX

        console.log('top: ', top, 'left: ', left)

        setColorPickerPosition({ top: top + 10, left: left + 20 })
    }

    const handleColorSelection = (color: string) => {
        setSelectedColor(color)
        console.log('color: ', selectedColor)
        setColorPickerVisible(false)
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
                            src={dropDownListIcon}
                            alt=""
                        />
                    </div>
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
