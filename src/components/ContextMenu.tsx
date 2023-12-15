import React from 'react'
import { ImageUpload } from './Toolbar/ImageUpload'
import styles from './ContextMenu.module.css'
import { TextContextMenu } from './TextContextMenu'

function ContextMenu(props: {
    type: 'text' | 'image' | 'primitive'
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    setLinkPopupVisible?: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuPosition: { top: number; left: number }
    selectedSlideId: string
    handleFontSizeChange?: (fontSize: number) => void
    selectedFontSize?: number
}) {
    const handleMenuItemClick = (
        action: 'upload' | 'insertLink' | 'changeFontSize',
        value?: number,
    ) => {
        if (action === 'upload') {
            // Handle the upload action
        } else if (action === 'insertLink') {
            // Handle the insertLink action
            if (props.setLinkPopupVisible) {
                props.setLinkPopupVisible(true)
            }
            props.setContextMenuVisible(false)
        } else if (
            action === 'changeFontSize' &&
            value !== undefined &&
            props.handleFontSizeChange
        ) {
            // Handle the changeFontSize action
            props.handleFontSizeChange(value)
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
            {props.type === 'image' && (
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
            )}
            {props.type === 'text' && (
                <TextContextMenu
                    selectedFontSize={props.selectedFontSize || 12}
                    handleMenuItemClick={handleMenuItemClick}
                />
            )}
        </div>
    )
}

export { ContextMenu }
