import { Presentation } from '../types'
import React, { useState } from 'react'

function useImportFileHandler() {
    const [parsedPresentation, setParsedPresentation] =
        useState<Presentation | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        if (file) {
            const reader = new FileReader()

            reader.onload = (e) => {
                try {
                    const jsonData = e.target?.result as string
                    const parsedData: Presentation = JSON.parse(jsonData)
                    setParsedPresentation(parsedData)
                    setError(null)
                } catch (error) {
                    setParsedPresentation(null)
                    setError('Плохой файл')
                }
            }

            reader.readAsText(file)
        }
    }

    return { parsedPresentation, error, handleFileChange }
}

export { useImportFileHandler }
