import styles from './TextSettings.module.css'
import React, { useEffect, useState } from 'react'
import { usePresentationDataContext } from '../PresentationDataContext'
import { Image, Primitive, TextBlock } from '../../types'
import { ContextMenu } from '../ContextMenu'
import dropDownListIcon from '../../images/toolbar/drop-down-list-icon.png'
import boldIcon from '../../images/toolbar/bold-icon.png'
import italicIcon from '../../images/toolbar/italic-text-icon.png'

interface TextSettingsProps {
    selectedObject: TextBlock
    contextMenuVisible: boolean
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuPosition: { top: number; left: number }
    setContextMenuPosition: React.Dispatch<
        React.SetStateAction<{ top: number; left: number }>
    >
    selectedSlideId: string
}

const TextSettings: React.FC<TextSettingsProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const initialFont = props.selectedObject.fontFamily
    const initialFontSize = props.selectedObject.fontSize
    const inititalIsBold = props.selectedObject.bold
    const inititalIsItalic = props.selectedObject.italic

    const [selectedFont, setSelectedFont] = useState(initialFont)
    const [selectedFontSize, setSelectedFontSize] = useState(initialFontSize)
    const [isBold, setIsBold] = useState(inititalIsBold)
    const [isItalic, setIsItalic] = useState(inititalIsItalic)

    const handleFontChange = (font: string) => {
        setSelectedFont(font)
    }

    const handleFontSizeChange = (fontSize: number) => {
        setSelectedFontSize(fontSize)
    }

    const handleSetBold = () => {
        setIsBold(!isBold)
    }

    const handleSetItalic = () => {
        setIsItalic(!isItalic)
    }

    const handleCustomFontSizeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newSize = parseInt(e.target.value)
        setSelectedFontSize(isNaN(newSize) ? initialFontSize : newSize)
    }
    const [textContextMenuVisible, setTextContextMenuVisible] = useState(false)

    const handleContextMenuClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setTextContextMenuVisible(!textContextMenuVisible)

        const clickedElement = e.currentTarget
        const rect = clickedElement.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const left = rect.left + window.scrollX

        props.setContextMenuPosition({ top: top + 30, left: left - 63 })
    }

    useEffect(() => {
        const updatedSlides = presentationData.slides.map((slide) => {
            if (slide.id === props.selectedSlideId) {
                const updatedObjects = slide.objects.map((obj) => {
                    if (obj.id === props.selectedObject.id) {
                        return {
                            ...obj,
                            fontFamily: selectedFont,
                            fontSize: selectedFontSize,
                            bold: isBold,
                            italic: isItalic,
                        }
                    }
                    return obj
                })

                return {
                    ...slide,
                    objects: updatedObjects,
                }
            }
            return slide
        })

        setPresentationData({
            ...presentationData,
            slides: updatedSlides,
        })
    }, [selectedFont, selectedFontSize, isBold, isItalic])

    return (
        <div className={styles.textSettings}>
            <div className={styles.fontChange}>
                <select
                    className={styles.fontChangeSelect}
                    value={selectedFont}
                    onChange={(e) => handleFontChange(e.target.value)}
                >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Consolas">Consolas</option>
                </select>
                <div className={styles.fontSizeContainer}>
                    <input
                        type="text"
                        className={styles.entry}
                        placeholder="Font Size"
                        value={selectedFontSize}
                        onChange={handleCustomFontSizeChange}
                    />
                    <button
                        className={styles.button}
                        onClick={handleContextMenuClick}
                    >
                        <img
                            className={styles.icon}
                            src={dropDownListIcon}
                            alt=""
                        />
                    </button>
                </div>
                {textContextMenuVisible && (
                    <ContextMenu
                        type={'text'}
                        contextMenuPosition={props.contextMenuPosition}
                        setContextMenuVisible={setTextContextMenuVisible}
                        selectedSlideId={props.selectedSlideId}
                        handleFontSizeChange={handleFontSizeChange}
                        selectedFontSize={selectedFontSize}
                    />
                )}
            </div>
            <div
                className={styles.iconContainer}
                onClick={handleSetBold}
                style={{
                    ...(isBold && {
                        background: '#b4cfff',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img
                    className={styles.icon}
                    src={boldIcon}
                    alt="Полужирный текст"
                    title="Полужирный текст"
                />
            </div>
            <div
                className={styles.iconContainer}
                onClick={handleSetItalic}
                style={{
                    ...(isItalic && {
                        background: '#b4cfff',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img
                    className={styles.icon}
                    src={italicIcon}
                    alt="Итальянский текст"
                    title="Итальянский текст"
                />
            </div>
        </div>
    )
}

export { TextSettings }
