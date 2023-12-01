import styles from './Toolbar.module.css'
import textFieldImage from '../../images/toolbar/text-field.png'
import iconImage from '../../images/toolbar/icon-image.png'
import figureIcon from '../../images/toolbar/figure-icon.png'
import fillIcon from '../../images/toolbar/fill-icon.png'
import React from 'react'
import { Image, Primitive, TextBlock } from '../../types'

function Toolbar(props: {
    selectedObjectId?: string
    objects?: Array<Primitive | Image | TextBlock>
}) {
    return (
        <div className={styles.toolbar}>
            <img className={styles.toolbarIcon} src={textFieldImage} alt="" />
            <img className={styles.toolbarIcon} src={iconImage} alt="" />
            <img className={styles.toolbarIcon} src={figureIcon} alt="" />

            {props.selectedObjectId && (
                <img className={styles.toolbarIcon} src={fillIcon} alt="" />
            )}
        </div>
    )
}

export { Toolbar }
