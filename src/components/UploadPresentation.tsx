import styles from './InitPresentation.module.css'
import React, { ChangeEvent } from 'react'

interface UploadPresentationProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    fileInputRef: React.RefObject<HTMLInputElement>
    onButtonClick: () => void
}

function UploadPresentation(props: UploadPresentationProps) {
    return (
        <div>
            <input
                type="file"
                onChange={props.onChange}
                ref={props.fileInputRef}
                className={styles.entry}
            />
            <button
                onClick={props.onButtonClick}
                className={styles.uploadButton}
            >
                Загрузить презентацию
            </button>
        </div>
    )
}

export { UploadPresentation }
