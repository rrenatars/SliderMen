import React from 'react'
import styles from './TextContextMenu.module.css'

interface TextContextMenuProps {
    selectedFontSize: number
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuPosition: { top: number; left: number }
    selectedSlideId: string
    handleFontSizeChange: (fontSize: number) => void
}

const TextContextMenu: React.FC<TextContextMenuProps> = (props) => {
    const fontSizes = [12, 14, 16, 18, 20] // Добавьте нужные размеры шрифтов

    const handleMenuItemClick = (value: number) => {
        props.handleFontSizeChange(value)
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
            {fontSizes.map((fontSize) => (
                <button
                    key={fontSize}
                    className={`${styles.contextMenuItem} ${
                        props.selectedFontSize === fontSize
                            ? styles.selected
                            : ''
                    }`}
                    onClick={() => handleMenuItemClick(fontSize)}
                >
                    {fontSize}
                </button>
            ))}
        </div>
    )
}

export { TextContextMenu }
