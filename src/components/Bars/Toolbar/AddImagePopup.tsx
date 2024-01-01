import React, { useState } from 'react'
import styles from './AddImagePopup.module.css'
import { generateUniqueId } from '../../../tools'
import { usePresentationDataContext } from '../../PresentationDataContext'
import { Image, ObjectType } from '../../../types'
import { useAppActions, useAppSelector } from '../../../redux/hooks'

interface LinkInputProps {
    selectedSlideId: string
    setLinkPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AddImagePopup: React.FC<LinkInputProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const [imageUrl, setImageUrl] = useState('')

    const selection = useAppSelector((state) => state.selection)
    const { createAddObjectAction } = useAppActions()

    const handleInsertImage = () => {
        const newImageId = generateUniqueId()

        const img = new window.Image()

        img.src = imageUrl

        img.onload = () => {
            const newImage: Image = {
                id: newImageId,
                coordinates: { x: 200, y: 50 },
                width: img.width,
                height: img.height,
                type: ObjectType.IMAGE,
                url: imageUrl,
            }

            if (selection.slideId) {
                createAddObjectAction(selection.slideId, newImage)
            }

            const updatedSlides = presentationData.slides.map((slide) =>
                slide.id === props.selectedSlideId
                    ? {
                          ...slide,
                          objects: [...slide.objects, newImage],
                      }
                    : slide,
            )

            setPresentationData((prevData) => ({
                ...prevData,
                slides: updatedSlides,
                selection: {
                    ...prevData.selection,
                    slideId: prevData.selection?.slideId,
                    objectId: newImageId,
                },
            }))
        }

        props.setLinkPopupVisible(false)
    }

    const handleCancel = () => {
        props.setLinkPopupVisible(false)
    }

    return (
        <div>
            <div className={styles.overlay} />
            <div className={styles.popup}>
                <div className={styles.popupContainer}>
                    <p className={styles.popupText}>Вставка изображения</p>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Введите ссылку"
                        value={imageUrl}
                        autoFocus={true}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.button}
                            onClick={handleCancel}
                        >
                            Отмена
                        </button>
                        <button
                            className={styles.button}
                            onClick={handleInsertImage}
                            disabled={!imageUrl}
                            style={{
                                background: !imageUrl ? '#6a92b2' : '#3498db',
                                cursor: !imageUrl ? 'auto' : 'pointer',
                            }}
                        >
                            Вставить изображение
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AddImagePopup }
