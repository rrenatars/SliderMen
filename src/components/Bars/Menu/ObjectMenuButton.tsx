import styles from './ObjectMenuButton.module.css'
import { ObjectType } from '../../../types'
import React from 'react'
import { useAppSelector } from '../../../redux/hooks'
import { strictEqual } from 'node:assert'

function ObjectMenuButton() {
    const selection = useAppSelector((state) => state.selection)
    const slides = useAppSelector((state) => state.slides)

    const selectedObjectType =
        slides
            ?.find((slide) => slide.id === selection.slideId)
            ?.objects.find((object) => object.id === selection.objectId)
            ?.type || null

    switch (selectedObjectType) {
        case ObjectType.PRIMITIVE:
            console.log('type: ', selectedObjectType)
            return <p className={styles.text}>Фигура</p>
        case ObjectType.IMAGE:
            console.log('type: ', selectedObjectType)
            return <p className={styles.text}>Рисунок</p>
        case ObjectType.TEXTBLOCK:
            console.log('type: ', selectedObjectType)
            return <p className={styles.text}>Текст</p>
        default:
            console.log('type: ', selectedObjectType)
            return null
    }
}

export { ObjectMenuButton }
