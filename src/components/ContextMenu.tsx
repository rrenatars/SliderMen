import React, { useRef, useState } from 'react'
import { generateUniqueId } from '../tools'
import { Image, ObjectType } from '../types'
import { usePresentationDataContext } from './PresentationDataContext'
import styles from './ContextMenu.module.css'
import { useImageUpload } from '../hooks/useUploadFile'

function ContextMenu(props: {
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    setLinkPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuPosition: { top: number; left: number }
    selectedSlideId: string
}) {
    {
        const fileInputRef = useRef<HTMLInputElement>(null)

        const handleMenuItemClick = (action: 'upload' | 'insertLink') => {
            if (action === 'upload') {
                if (fileInputRef.current) {
                    fileInputRef.current.click()
                }
            } else {
                props.setLinkPopupVisible(true)
                props.setContextMenuVisible(false)
            }
        }

        const { handleFileChange } = useImageUpload({
            selectedSlideId: props.selectedSlideId,
            setContextMenuVisible: props.setContextMenuVisible,
        })

        return (
            <div
                className={styles.contextMenu}
                style={{
                    top: props.contextMenuPosition.top,
                    left: props.contextMenuPosition.left,
                }}
            >
                <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className={styles.entry}
                />
                <button
                    onClick={() => handleMenuItemClick('upload')}
                    className={styles.contextMenuItem}
                >
                    Загрузить картинку или гифку
                </button>
                <button
                    className={styles.contextMenuItem}
                    onClick={() => handleMenuItemClick('insertLink')}
                >
                    Вставить ссылку
                </button>
            </div>
        )
    }
}

export { ContextMenu }
