import React, { useState } from 'react'
import { Image, ObjectType, Primitive, TextBlock } from '../../types'
import { SlideTextBlock } from './SlideTextBlock'
import { ImageBlock } from './ImageBlock'
import { PrimitiveBlock } from './PrimitiveBlock'
import { ContextMenu } from '../ContextMenu'
import useObjectDeletion from '../../hooks/useObjectDeletion'

function ObjectBlock(props: {
    objectData: Primitive | Image | TextBlock
    selectedSlideId: string
    scale: number
    isSelected: boolean
    onClick: () => void
}) {
    const [contextMenuVisible, setContextMenuVisible] = useState(false)
    const [contextMenuPosition, setContextMenuPosition] = useState({
        top: 0,
        left: 0,
    })
    const { deleteObject } = useObjectDeletion()

    const handleContextMenuClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setContextMenuVisible(!contextMenuVisible)

        const clickedElement = e.currentTarget
        const rect = clickedElement.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const left = rect.left + window.scrollX

        setContextMenuPosition({ top: e.clientY - 150, left: e.clientX - 320 })
    }

    const handleDelete = () => {
        deleteObject(props.selectedSlideId, props.objectData.id)
        props.onClick()
    }

    switch (props.objectData.type) {
        case ObjectType.TEXTBLOCK:
            return (
                <div
                    onContextMenu={handleContextMenuClick}
                    style={{ position: 'relative' }}
                >
                    <SlideTextBlock
                        textBlockData={props.objectData}
                        selectedSlideId={props.selectedSlideId}
                        scale={props.scale}
                        isSelected={props.isSelected}
                        onClick={props.onClick}
                    />
                    {contextMenuVisible && (
                        <ContextMenu
                            position={contextMenuPosition}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            )
        case ObjectType.IMAGE:
            return (
                <div
                    onContextMenu={handleContextMenuClick}
                    style={{ position: 'relative' }}
                >
                    <ImageBlock
                        imageBlockData={props.objectData}
                        scale={props.scale}
                        isSelected={props.isSelected}
                        onClick={props.onClick}
                    />
                    {contextMenuVisible && (
                        <ContextMenu
                            position={contextMenuPosition}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            )
        case ObjectType.PRIMITIVE:
            return (
                <div
                    onContextMenu={handleContextMenuClick}
                    style={{ position: 'relative' }}
                >
                    <PrimitiveBlock
                        primitiveBlockData={props.objectData}
                        scale={props.scale}
                        isSelected={props.isSelected}
                        onClick={props.onClick}
                    />
                    {contextMenuVisible && (
                        <ContextMenu
                            position={contextMenuPosition}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            )
        default:
            return null
    }
}

export { ObjectBlock }
