import React from 'react'
import styles from './AddImageContextMenu.module.css'
import { ImageUpload } from './ImageUpload'

interface ImageUploadContextMenuProps {
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    setLinkPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuPosition: { top: number; left: number }
    selectedSlideId: string
}

const AddImageContextMenu: React.FC<ImageUploadContextMenuProps> = (props) => {
    const handleMenuItemClick = () => {
        props.setLinkPopupVisible(true)
        props.setContextMenuVisible(false)
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
                    selectedSlideId={props.selectedSlideId}
                    setContextMenuVisible={props.setContextMenuVisible}
                />
                <button
                    className={styles.contextMenuItem}
                    onClick={() => handleMenuItemClick()}
                >
                    Вставить ссылку
                </button>
            </>
        </div>
    )
}

export { AddImageContextMenu }
