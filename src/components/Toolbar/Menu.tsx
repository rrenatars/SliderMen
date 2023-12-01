import styles from './Menu.module.css'
import React from 'react'
import { Image, ObjectType, Primitive, TextBlock } from '../../types'

function Menu(props: {
    selectedObjectId?: string
    objects?: Array<Primitive | Image | TextBlock>
}) {
    const selectedObjectType =
        props.objects?.find((object) => object.id === props.selectedObjectId)
            ?.type || null

    console.log(selectedObjectType)

    return (
        <div className={styles.menu}>
            <p>Файл</p>
            <p>Главная</p>
            {(() => {
                switch (selectedObjectType) {
                    case ObjectType.PRIMITIVE:
                        return <p>Фигура</p>
                    case ObjectType.IMAGE:
                        return <p>Рисунок</p>
                    case ObjectType.TEXTBLOCK:
                        return <p>Текст</p>
                }
            })()}
        </div>
    )
}

export { Menu }
