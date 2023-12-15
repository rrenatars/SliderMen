import styles from './ObjectMenuButton.module.css'
import { ObjectType } from '../../types'
import React from 'react'

function ObjectMenuButton(props: { selectedObjectType: ObjectType }) {
    switch (props.selectedObjectType) {
        case ObjectType.PRIMITIVE:
            return <p className={styles.text}>Фигура</p>
        case ObjectType.IMAGE:
            return <p className={styles.text}>Рисунок</p>
        case ObjectType.TEXTBLOCK:
            return <p className={styles.text}>Текст</p>
        default:
            return null
    }
}

export { ObjectMenuButton }
