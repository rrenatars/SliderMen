import React from 'react'
import { usePresentationDataContext } from '../components/PresentationDataContext'
import { generateUniqueId } from '../tools'
import { Image, ObjectType } from '../types'
import { useAppActions, useAppSelector } from '../redux/hooks'

interface ImageUploadProps {
    selectedSlideId: string
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const useImageUpload = ({
    selectedSlideId,
    setContextMenuVisible,
}: ImageUploadProps) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const selection = useAppSelector((state) => state.selection)
    const { createAddObjectAction } = useAppActions()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

                        if (selection.slideId) {
                            createAddObjectAction(selection.slideId, newImage)
                        }

                        const updatedSlides = presentationData.slides.map(
                            (slide) =>
                                slide.id === selectedSlideId
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

                    reader.readAsDataURL(file)
                }

                img.src = URL.createObjectURL(file)
            } catch (error) {
                console.log('Не загружено:', error)
            }
        }

        setContextMenuVisible(false)
    }

    return { handleFileChange }
}

export { useImageUpload }
