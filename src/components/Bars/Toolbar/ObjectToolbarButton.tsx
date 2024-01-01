import { Image, ObjectType, Primitive, TextBlock } from '../../../types'
import React from 'react'
import { TextSettings } from './TextSettings/TextSettings'
import { PrimitiveSettings } from './PrimitiveSettings'

interface ObjectToolbarButtonProps {
    selectedObject: Primitive | Image | TextBlock
    contextMenuVisible: boolean
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuPosition: { top: number; left: number }
    setContextMenuPosition: React.Dispatch<
        React.SetStateAction<{ top: number; left: number }>
    >
    selectedSlideId: string
}

const ObjectToolbarButton: React.FC<ObjectToolbarButtonProps> = (props) => {
    switch (props.selectedObject.type) {
        case ObjectType.PRIMITIVE:
            return (
                <PrimitiveSettings
                    selectedObject={props.selectedObject}
                    selectedSlideId={props.selectedSlideId}
                ></PrimitiveSettings>
            )
        case ObjectType.TEXTBLOCK:
            return (
                <TextSettings
                    selectedSlideId={props.selectedSlideId}
                    contextMenuVisible={props.contextMenuVisible}
                    setContextMenuVisible={props.setContextMenuVisible}
                    contextMenuPosition={props.contextMenuPosition}
                    setContextMenuPosition={props.setContextMenuPosition}
                    selectedObject={props.selectedObject}
                ></TextSettings>
            )
        default:
            return null
    }
}

export { ObjectToolbarButton }
