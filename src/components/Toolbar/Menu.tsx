import styles from './Menu.module.css'
import React from 'react'
import { Image, Primitive, TextBlock } from '../../types'
import { ObjectMenuButton } from './ObjectMenuButton'
import { useExportPresentationToJSON } from '../../hooks/useExportPresentationToJSON'
import { usePresentationDataContext } from '../PresentationDataContext'

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
        useExportPresentationToJSON(presentationData)
    }

    return (
        <div className={styles.menu}>
            <p>Файл</p>
            <p>Главная</p>
            <button className={styles.exportButton} onClick={handleClickExport}>
                Экспорт
            </button>
            {selectedObjectType && (
                <ObjectMenuButton
                    selectedObjectType={selectedObjectType}
                ></ObjectMenuButton>
            )}
        </div>
    )
}

export { Menu }
