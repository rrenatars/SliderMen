import React, { ChangeEvent, useState } from 'react'
import styles from './PresentationName.module.css'

function PresentationName(props: {
    name: string
    onChange: (newName: string) => void
}) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedValue, setEditedValue] = useState(props.name)

    const handleClick = () => {
        setIsEditing(!isEditing)
    }

    const handleBlur = (e: ChangeEvent<HTMLDivElement>) => {
        setIsEditing(false)
        const newTextContent = e.target.textContent
        if (newTextContent !== null) {
            setEditedValue(newTextContent)
            props.onChange(newTextContent)
        }
    }

    return (
        <div
            contentEditable={isEditing}
            onDoubleClick={handleClick}
            onBlur={handleBlur}
            className={styles.name}
        >
            {editedValue}
        </div>
    )
}

export { PresentationName }
