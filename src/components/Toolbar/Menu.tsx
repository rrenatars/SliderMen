import styles from './Menu.module.css'
import React from 'react'
import { Image, Primitive, TextBlock } from '../../types'
import { ObjectMenuButton } from './ObjectMenuButton'

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
            {selectedObjectType && (
                <ObjectMenuButton
                    selectedObjectType={selectedObjectType}
                ></ObjectMenuButton>
            )}
        </div>
    )
}

export { Menu }
