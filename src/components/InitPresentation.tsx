import { useImportFileHandler } from '../hooks/useImportFileHandler'
import { PresentationView } from './PresentationView'
import React, { useRef } from 'react'
import styles from './InitPresentation.module.css'
import { emptyPresentation } from '../testData3'
import { UploadPresentation } from './UploadPresentation'
import { ContextInit } from './ContextInit'

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
        setPresentationData(emptyPresentation)
    }

    return (
        <div>
            {!presentationData ? (
                <div className={styles.entryContainer}>
                    <UploadPresentation
                        onChange={handleFileChange}
                        fileInputRef={fileInputRef}
                        onButtonClick={handleButtonClick}
                    ></UploadPresentation>
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
