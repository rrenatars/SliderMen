import { ObjectType } from '../../types'
import fillIcon from '../../images/toolbar/fill-icon.png'
import styles from './Toolbar.module.css'
import React from 'react'

function ObjectToolbarButton(props: { selectedObjectType: ObjectType }) {
    switch (props.selectedObjectType) {
        case ObjectType.PRIMITIVE:
            return <img className={styles.toolbarIcon} src={fillIcon} alt="" />
        case ObjectType.IMAGE:
            return <p>Рисунок</p>
        case ObjectType.TEXTBLOCK:
            return <p>Текст</p>
        default:
            return null
    }
}

export { ObjectToolbarButton }
