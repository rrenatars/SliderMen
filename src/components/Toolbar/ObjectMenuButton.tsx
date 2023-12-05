import { ObjectType } from '../../types'
import React from 'react'

function ObjectMenuButton(props: { selectedObjectType: ObjectType }) {
    switch (props.selectedObjectType) {
        case ObjectType.PRIMITIVE:
            return <p>Фигура</p>
        case ObjectType.IMAGE:
            return <p>Рисунок</p>
        case ObjectType.TEXTBLOCK:
            return <p>Текст</p>
        default:
            return null
    }
}

export { ObjectMenuButton }
