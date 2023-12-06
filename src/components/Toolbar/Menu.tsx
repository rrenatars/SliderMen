import styles from './Menu.module.css'
import React from 'react'
import { Image, Presentation, Primitive, TextBlock } from '../../types'
import { ObjectMenuButton } from './ObjectMenuButton'
import { exportPresentationToJson } from './export'

function Menu(props: {
    selectedObjectId?: string
    objects?: Array<Primitive | Image | TextBlock>
    presentationData: Presentation
}) {
    const selectedObjectType =
        props.objects?.find((object) => object.id === props.selectedObjectId)
            ?.type || null

    function handleClickExport() {
        if (props.presentationData) {
            exportPresentationToJson(props.presentationData)
        }
    }

    return (
        <div className={styles.menu}>
            <p>Файл</p>
            <p>Главная</p>
            <button onClick={handleClickExport}>Экспорт</button>
            {selectedObjectType && (
                <ObjectMenuButton
                    selectedObjectType={selectedObjectType}
                ></ObjectMenuButton>
            )}
        </div>
    )
}

export { Menu }
