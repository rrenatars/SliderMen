import styles from './Toolbar.module.css'
import textFieldImage from '../../images/toolbar/text-field.png'
import iconImage from '../../images/toolbar/icon-image.png'
import figureIcon from '../../images/toolbar/figure-icon.png'
import newSlideButton from '../../images/toolbar/new-slide-button.png'
import binIcon from '../../images/toolbar/bin-icon.png'
import React from 'react'
import { Image, Primitive, TextBlock } from '../../types'
import { ObjectToolbarButton } from './ObjectToolbarButton'

function Toolbar(props: {
    selectedObjectId?: string
    selectedSlideId?: string
    objects?: Array<Primitive | Image | TextBlock>
    onAddSlide: () => void
    onRemoveSlide: (slideId: string) => void
}) {
    const selectedObjectType =
        props.objects?.find((object) => object.id === props.selectedObjectId)
            ?.type || null

    return (
        <div className={styles.toolbar}>
            <img className={styles.toolbarIcon} src={textFieldImage} alt="" />
            <img className={styles.toolbarIcon} src={iconImage} alt="" />
            <img className={styles.toolbarIcon} src={figureIcon} alt="" />
            <img
                onClick={props.onAddSlide}
                className={styles.toolbarIcon}
                src={newSlideButton}
                alt=""
            />
            <img
                onClick={() =>
                    props.selectedSlideId &&
                    props.onRemoveSlide(props.selectedSlideId)
                }
                className={styles.toolbarIcon}
                src={binIcon}
                alt="Удалить слайд"
                title="Удалить слайд"
            />
            {selectedObjectType && (
                <ObjectToolbarButton
                    selectedObjectType={selectedObjectType}
                ></ObjectToolbarButton>
            )}
        </div>
    )
}

export { Toolbar }
