import styles from './Toolbar.module.css'
import textFieldImage from '../../images/toolbar/text-field.png'
import iconImage from '../../images/toolbar/icon-image.png'
import figureIcon from '../../images/toolbar/figure-icon.png'
import fillIcon from '../../images/toolbar/fill-icon.png'
import React from 'react'
import { Image, ObjectType, Primitive, TextBlock } from '../../types'

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

            {(() => {
                switch (selectedObjectType) {
                    case ObjectType.PRIMITIVE:
                        return (
                            <img
                                className={styles.toolbarIcon}
                                src={fillIcon}
                                alt=""
                            />
                        )
                    case ObjectType.IMAGE:
                        return <p>Рисунок</p>
                    case ObjectType.TEXTBLOCK:
                        return <p>Текст</p>
                }
            })()}
        </div>
    )
}

export { Toolbar }
