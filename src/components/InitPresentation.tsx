import { useImportFileHandler } from '../hooks/useImportFileHandler'
import React, { useRef } from 'react'
import styles from './InitPresentation.module.css'
import { emptyPresentation } from '../testData3'
import { UploadFile } from './UploadFile'
import { ContextInit } from './ContextInit'
import { generateUniqueId } from '../tools'

function InitPresentation() {
    const { presentationData, error, handleFileChange, setPresentationData } =
        useImportFileHandler()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleNewPresentationClick = () => {
        const startSlideId = generateUniqueId()

        const newPresentation = {
            ...emptyPresentation,
            id: generateUniqueId(),
            slides: [
                {
                    ...emptyPresentation.slides[0],
                    id: startSlideId,
                },
            ],
            selection: {
                slideId: startSlideId,
            },
        }

        setPresentationData(newPresentation)
    }

    return (
        <div>
            {!presentationData ? (
                <div className={styles.entryContainer}>
                    <UploadFile
                        value={'Загрузить презентацию'}
                        onChange={handleFileChange}
                        fileInputRef={fileInputRef}
                        onButtonClick={handleButtonClick}
                    ></UploadFile>
                    <button
                        onClick={handleNewPresentationClick}
                        className={styles.newPresentationButton}
                    >
                        Создать новую презентацию
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            ) : (
                <ContextInit presentationData={presentationData}></ContextInit>
            )}
        </div>
    )
}

export { InitPresentation }
