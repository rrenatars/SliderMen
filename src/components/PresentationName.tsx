import React, { ChangeEvent, useState } from 'react'
import styles from './PresentationName.module.css'
import { useAppSelector, useAppActions } from '../redux/hooks' // Подставьте путь к вашему настройщику Redux

function PresentationName() {
    const name = useAppSelector((state) => state.title)
    const { createChangeNameAction } = useAppActions()

    const [isEditing, setIsEditing] = useState(false)
    const [editedValue, setEditedValue] = useState(name)

    const handleClick = () => {
        setIsEditing(true)
    }

    const handleBlur = (e: ChangeEvent<HTMLDivElement>) => {
        setIsEditing(false)
        // const newTextContent = e.currentTarget.textContent
        // if (newTextContent !== null && newTextContent !== name) {
        //     setEditedValue(newTextContent)
        //     createChangeTitleAction(newTextContent)
        // } else {
        //     // Если текст не изменился, восстановите предыдущее значение
        //     setEditedValue(name)
        // }
        if (e.currentTarget.textContent) {
            createChangeNameAction(e.currentTarget.textContent)
        }
    }

    return (
        <div
            contentEditable={isEditing}
            onClick={handleClick}
            onBlur={handleBlur}
            className={styles.name}
        >
            {editedValue}
        </div>
    )
}

export { PresentationName }
