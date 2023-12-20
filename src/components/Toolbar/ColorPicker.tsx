import React from 'react'
import styles from './ColorPicker.module.css'

interface ColorPickerProps {
    position: { top: number; left: number }
    handleColorSelection: (color: string) => void
    selectedColor: string
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const colors = [
        '#FF0000',
        '#00FF00',
        '#0000FF',
        '#FFFF00',
        '#FF00FF',
        '#00FFFF',
    ]

    return (
        <div
            className={styles.container}
            style={{ top: props.position.top, left: props.position.left }}
        >
            {colors.map((color, index) => (
                <div
                    className={styles.square}
                    key={index}
                    onClick={() => props.handleColorSelection(color)}
                    style={{
                        backgroundColor: color,
                    }}
                ></div>
            ))}
        </div>
    )
}

export { ColorPicker }
