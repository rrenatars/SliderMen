import styles from './Menu.module.css'
import React from 'react'
import { Image, Primitive, TextBlock } from '../../types'
import { ObjectMenuButton } from './ObjectMenuButton'
import { useExportPresentationToJson } from './export'
import { usePresentationDataContext } from '../PresentationDataContext'
import { presentation } from '../../testData3'

function Menu(props: {
    selectedObjectId?: string
    objects?: Array<Primitive | Image | TextBlock>
}) {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const selectedObjectType =
        props.objects?.find((object) => object.id === props.selectedObjectId)
            ?.type || null

    function handleClickExport() {
        useExportPresentationToJson(presentationData)
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
