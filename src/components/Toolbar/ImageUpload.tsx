import React, { useRef } from 'react'
import { useImageUpload } from '../../hooks/useUploadFile'
import styles from './ImageUpload.module.css'

interface ImageUploadProps {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    selectedSlideId: string
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const { handleFileChange: uploadFileChange } = useImageUpload({
        selectedSlideId: props.selectedSlideId,
        setContextMenuVisible: props.setContextMenuVisible,
    })

    return (
        <>
            <input
                type="file"
                onChange={uploadFileChange}
                ref={fileInputRef}
                className={styles.entry}
            />
            <button
                onClick={handleUploadClick}
                className={styles.contextMenuItem}
            >
                Загрузить картинку или гифку
            </button>
        </>
    )
}

export { ImageUpload }
