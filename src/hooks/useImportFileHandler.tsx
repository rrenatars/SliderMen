import { Presentation } from '../types'
import React, { useState } from 'react'
import { useAppActions } from '../redux/hooks'

function useImportFileHandler() {
    const [presentationData, setPresentationData] =
        useState<Presentation | null>(null)
    const [error, setError] = useState<string | null>(null)

    const {
        createSetSlidesAction,
        createChangeNameAction,
        createChangeSelectedSlideAction,
    } = useAppActions()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            const reader = new FileReader()

            reader.onload = (e) => {
                try {
                    const jsonData = e.target?.result as string
                    const parsedData: Presentation = JSON.parse(jsonData)
                    setPresentationData(parsedData)
                    createSetSlidesAction(parsedData.slides)
                    createChangeNameAction(parsedData.name)
                    createChangeSelectedSlideAction(parsedData.slides[0].id)
                    setError(null)
                } catch (error) {
                    setPresentationData(null)
                    setError('Плохой файл')
                }
            }

            reader.readAsText(file)
        }
    }

    return { presentationData, error, handleFileChange, setPresentationData }
}

export { useImportFileHandler }
