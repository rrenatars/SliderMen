import React, { useRef, useState } from 'react'
import { generateUniqueId } from '../tools'
import { Image, ObjectType } from '../types'
import { usePresentationDataContext } from './PresentationDataContext'
import styles from './ContextMenu.module.css'
import { presentation } from '../testData3'

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
                const reader = new FileReader()

                reader.onload = (e) => {
                    try {
                        const base64String = e.target?.result as string

                        const newImageId = generateUniqueId()

                        const newImage: Image = {
                            id: newImageId,
                            coordinates: { x: 50, y: 250 },
                            width: 200,
                            height: 200,
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

                        console.log('updatedSlides: ', updatedSlides)

                        // Обновление состояния приложения
                        const updatedPresentationData = {
                            ...presentationData,
                            slides: updatedSlides,
                            selection: {
                                ...presentationData.selection,
                                slideId: presentationData.selection?.slideId,
                                objectId: newImageId,
                            },
                        }

                        setPresentationData((prevData) => ({
                            ...prevData,
                            slides: updatedSlides,
                            selection: {
                                ...prevData.selection,
                                slideId: prevData.selection?.slideId,
                                objectId: newImageId,
                            },
                        }))
                        console.log('presentationData: ', presentationData)
                    } catch (error) {
                        console.log('Не загружено:', error)
                    }
                }

                reader.readAsDataURL(file)
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
