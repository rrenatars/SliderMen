import styles from './Menu.module.css'
import React from 'react'
import { Image, Primitive, TextBlock } from '../../../types'
import { ObjectMenuButton } from './ObjectMenuButton'
import { useExportPresentationToJSON } from '../../../hooks/useExportPresentationToJSON'
import { usePresentationDataContext } from '../../PresentationDataContext'
import { useAppSelector } from '../../../redux/hooks'
import { generateUniqueId } from '../../../tools'

function Menu() {
    const slides = useAppSelector((state) => state.slides)
    const title = useAppSelector((state) => state.title)

    function handleClickExport() {
        useExportPresentationToJSON({
            id: generateUniqueId(),
            slides: slides,
            name: title,
        })
    }

    return (
        <div className={styles.menu}>
            <p>Файл</p>
            <p>Главная</p>
            <button className={styles.exportButton} onClick={handleClickExport}>
                Экспорт
            </button>
            <ObjectMenuButton></ObjectMenuButton>
        </div>
    )
}

export { Menu }
