import React, { useRef } from 'react'
import { generateUniqueId } from '../tools'
import { Image, ObjectType } from '../types'
import { usePresentationDataContext } from './PresentationDataContext'
import styles from './ContextMenu.module.css'

function ContextMenu(props: {
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuPosition: { top: number; left: number }
    selectedSlideId?: string
}) {
    {
        const { presentationData, setPresentationData } =
            usePresentationDataContext()

        const fileInputRef = useRef<HTMLInputElement>(null)

        const handleMenuItemClick = (action: 'upload' | 'insertLink') => {
            if (action === 'upload') {
                if (fileInputRef.current) {
                    fileInputRef.current.click()
                }
            }
        }

        const handleFileChange = (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            const file = event.target.files?.[0]

            if (file) {
                try {
                    const img = new window.Image()

                    img.onload = () => {
                        const width = img.width
                        const height = img.height

                        const reader = new FileReader()
                        reader.onload = (e) => {
                            const base64String = e.target?.result as string

                            const newImageId = generateUniqueId()

                            const newImage: Image = {
                                id: newImageId,
                                coordinates: { x: 400, y: 150 },
                                width: width,
                                height: height,
                                type: ObjectType.IMAGE,
                                base64: base64String,
                            }

                            const updatedSlides = presentationData.slides.map(
                                (slide) =>
                                    slide.id === props.selectedSlideId
                                        ? {
                                              ...slide,
                                              objects: [
                                                  ...(slide.objects || []),
                                                  newImage,
                                              ],
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

                        reader.readAsDataURL(file)
                    }

                    // Устанавливаем источник изображения для предварительной загрузки
                    img.src = URL.createObjectURL(file)
                } catch (error) {
                    console.log('Не загружено:', error)
                }
            }

            props.setContextMenuVisible(false)
        }

        return (
            <div
                className={styles.contextMenu}
                style={{
                    top: props.contextMenuPosition.top,
                    left: props.contextMenuPosition.left,
                }}
            >
                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className={styles.entry}
                />
                <button
                    onClick={() => handleMenuItemClick('upload')}
                    className={styles.contextMenuItem}
                >
                    Загрузить картинку или гифку
                </button>
                <input type="file" className={styles.entry} />
                <button
                    className={styles.contextMenuItem}
                    onClick={() => handleMenuItemClick('insertLink')}
                >
                    Вставить ссылку
                </button>
            </div>
        )
    }
}

export { ContextMenu }
