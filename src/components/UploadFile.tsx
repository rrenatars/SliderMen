import styles from './InitPresentation.module.css'
import React, { ChangeEvent } from 'react'

interface UploadFileProps {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    fileInputRef: React.RefObject<HTMLInputElement>
    onButtonClick: () => void
}

function UploadFile(props: UploadFileProps) {
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
                {props.value}
            </button>
        </div>
    )
}

export { UploadFile }
