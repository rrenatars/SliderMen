import React, { useState } from 'react'
import styles from './LinkInput.module.css'
import { generateUniqueId } from '../../tools'
import { usePresentationDataContext } from '../PresentationDataContext'
import { Image, ObjectType } from '../../types'

interface LinkInputProps {
    selectedSlideId: string
    setLinkPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const LinkInput: React.FC<LinkInputProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const [imageUrl, setImageUrl] = useState('')

    const handleInsertImage = () => {
        const newImageId = generateUniqueId()

        const img = new window.Image()

        img.src = imageUrl

        img.onload = () => {
            const newImage: Image = {
                id: newImageId,
                coordinates: { x: 400, y: 150 },
                width: img.width,
                height: img.height,
                type: ObjectType.IMAGE,
                url: imageUrl,
            }

            const updatedSlides = presentationData.slides.map((slide) =>
                slide.id === props.selectedSlideId
                    ? {
                          ...slide,
                          objects: [...slide.objects, newImage],
                      }
                    : slide,
            )

            console.log('updatedSlides: ', updatedSlides)

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
                    <button className={styles.button} onClick={handleCancel}>
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
    )
}

export { LinkInput }
