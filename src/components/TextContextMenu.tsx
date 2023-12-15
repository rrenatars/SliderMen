import React from 'react'
import styles from './TextContextMenu.module.css'

interface TextContextMenuProps {
    selectedFontSize: number
    handleMenuItemClick: (action: 'changeFontSize', value: number) => void
}

const TextContextMenu: React.FC<TextContextMenuProps> = (props) => {
    const fontSizes = [12, 14, 16, 18, 20] // Добавьте нужные размеры шрифтов

    return (
        <>
            {fontSizes.map((fontSize) => (
                <button
                    key={fontSize}
                    className={`${styles.contextMenuItem} ${
                        props.selectedFontSize === fontSize
                            ? styles.selected
                            : ''
                    }`}
                    onClick={() =>
                        props.handleMenuItemClick('changeFontSize', fontSize)
                    }
                >
                    {fontSize}
                </button>
            ))}
        </>
    )
}

export { TextContextMenu }
