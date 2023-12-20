import React from 'react'
import styles from './ImageUploadContextMenu.module.css'
import { ImageUpload } from './ImageUpload'

interface ImageUploadContextMenuProps {
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    setLinkPopupVisible?: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuPosition: { top: number; left: number }
    selectedSlideId: string
}

const ImageUploadContextMenu: React.FC<ImageUploadContextMenuProps> = (
    props,
) => {
    const handleMenuItemClick = (action: 'upload' | 'insertLink') => {
        if (action === 'upload') {
            // Handle the upload action
        } else if (action === 'insertLink') {
            if (props.setLinkPopupVisible) {
                props.setLinkPopupVisible(true)
            }
            props.setContextMenuVisible(false)
        }
    }

    return (
        <div
            className={styles.contextMenu}
            style={{
                top: props.contextMenuPosition.top,
                left: props.contextMenuPosition.left,
            }}
        >
            <>
                <ImageUpload
                    handleFileChange={() => handleMenuItemClick('upload')}
                    selectedSlideId={props.selectedSlideId}
                    setContextMenuVisible={props.setContextMenuVisible}
                />
                <button
                    className={styles.contextMenuItem}
                    onClick={() => handleMenuItemClick('insertLink')}
                >
                    Вставить ссылку
                </button>
            </>
        </div>
    )
}

export { ImageUploadContextMenu }
