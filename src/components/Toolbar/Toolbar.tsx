import styles from './Toolbar.module.css'
import textFieldImage from '../../images/toolbar/text-field.png'
import iconImage from '../../images/toolbar/icon-image.png'
import figureIcon from '../../images/toolbar/figure-icon.png'
import newSlideButton from '../../images/toolbar/new-slide-button.png'
import React from 'react'
import { Image, Primitive, TextBlock } from '../../types'
import { ObjectToolbarButton } from './ObjectToolbarButton'

function Toolbar(props: {
    selectedObjectId?: string
    objects?: Array<Primitive | Image | TextBlock>
}) {
    const selectedObjectType =
        props.objects?.find((object) => object.id === props.selectedObjectId)
            ?.type || null

    return (
        <div className={styles.toolbar}>
            <img className={styles.toolbarIcon} src={textFieldImage} alt="" />
            <img className={styles.toolbarIcon} src={iconImage} alt="" />
            <img className={styles.toolbarIcon} src={figureIcon} alt="" />
            <img className={styles.toolbarIcon} src={newSlideButton} alt="" />
            {selectedObjectType && (
                <ObjectToolbarButton
                    selectedObjectType={selectedObjectType}
                ></ObjectToolbarButton>
            )}
        </div>
    )
}

export { Toolbar }
