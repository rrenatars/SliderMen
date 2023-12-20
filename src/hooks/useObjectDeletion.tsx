import { useState } from 'react'
import { usePresentationDataContext } from '../components/PresentationDataContext'

function useObjectDeletion() {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const deleteObject = (slideId: string, objectId: string) => {
        const updatedSlides = presentationData.slides.map((slide) => {
            if (slide.id === slideId) {
                return {
                    ...slide,
                    objects: slide.objects.filter((obj) => obj.id !== objectId),
                }
            }
            return slide
        })

        setPresentationData({
            ...presentationData,
            slides: updatedSlides,
            selection: {
                slideId: slideId,
                objectId: undefined,
            },
        })
    }

    return { deleteObject }
}

export default useObjectDeletion
