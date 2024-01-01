import React, { useEffect, useState } from 'react'
import { ObjectType, Primitive } from '../../../types'
import styles from './PrimitiveSettings.module.css'
import fillIcon from '../../../images/toolbar/fill-icon.png'
import { ColorPicker } from './ColorPicker'
import { usePresentationDataContext } from '../../PresentationDataContext'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

interface ToolbarSettingsProps {
    selectedObject: Primitive
    selectedSlideId: string
}

const PrimitiveSettings: React.FC<ToolbarSettingsProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const selection = useAppSelector((state) => state.selection)
    const { createChangeObjectAction } = useAppActions()

    const initialFillColor = props.selectedObject.fillColor.hex

    const [selectedFillColor, setSelectedFillColor] = useState(initialFillColor)
    const [fillColorPickerVisible, setFillColorPickerVisible] = useState(false)
    const [fillColorPickerPosition, setFillColorPickerPosition] = useState({
        top: 0,
        left: 0,
    })

    useEffect(() => {
        const updatedSlides = presentationData.slides.map((slide) => {
            if (slide.id === props.selectedSlideId) {
                const updatedObjects = slide.objects.map((obj) => {
                    if (
                        obj.id === props.selectedObject.id &&
                        obj.type === ObjectType.PRIMITIVE
                    ) {
                        return {
                            ...obj,
                            fillColor: {
                                ...obj.fillColor,
                                hex: selectedFillColor,
                            },
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

        if (selection.slideId && selection.objectId) {
            createChangeObjectAction(selection.slideId, selection.objectId, {
                fillColor: {
                    hex: selectedFillColor,
                },
            })
        }

        setPresentationData({
            ...presentationData,
            slides: updatedSlides,
        })
    }, [selectedFillColor])

    const handleFillColorIconClick = (e: React.MouseEvent) => {
        setFillColorPickerVisible(!fillColorPickerVisible)
        const clickedElement = e.currentTarget
        const rect = clickedElement.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const left = rect.left + window.scrollX

        setFillColorPickerPosition({ top: top + 30, left: left })
    }

    const handleFillColorSelection = (color: string) => {
        setSelectedFillColor(color)
        setFillColorPickerVisible(false)
    }

    return (
        <div>
            <div
                className={styles.iconContainer}
                onClick={handleFillColorIconClick}
                style={{
                    ...(fillColorPickerVisible && {
                        background: '#b4cfff',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img className={styles.icon} src={fillIcon} alt="" />
            </div>
            {fillColorPickerVisible && (
                <ColorPicker
                    position={fillColorPickerPosition}
                    handleColorSelection={handleFillColorSelection}
                    selectedColor={selectedFillColor}
                    setSelectedColor={setSelectedFillColor}
                ></ColorPicker>
            )}
        </div>
    )
}

export { PrimitiveSettings }
