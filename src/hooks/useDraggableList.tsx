import React, { useEffect, useState } from 'react'
import { usePresentationDataContext } from '../components/PresentationDataContext'
import { Slide } from '../types'

interface DragAndDropState {
    draggedFrom: number
    draggedTo: number
    isDragging: boolean
    originalOrder: Slide[]
    updatedOrder: Slide[]
}

const initialDnDState: DragAndDropState = {
    draggedFrom: 0,
    draggedTo: 0,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
}

interface useDraggableListProps {
    slides: Slide[]
}

const useDraggableList: (props: useDraggableListProps) => {
    onDrop: () => void
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void
    list: Slide[]
    dragAndDrop: DragAndDropState
} = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const [dragAndDrop, setDragAndDrop] =
        useState<DragAndDropState>(initialDnDState)

    const [list, setList] = useState<Slide[]>(presentationData.slides)

    useEffect(() => {
        setList(presentationData.slides)
    }, [presentationData])

    const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const initialPosition = Number(event.currentTarget.dataset.position)

        setDragAndDrop({
            ...dragAndDrop,

            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: list,
            updatedOrder: [],
        })
    }

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()

        let newList = dragAndDrop.originalOrder

        const draggedFrom = dragAndDrop.draggedFrom

        const draggedTo = Number(event.currentTarget.dataset.position)

        const itemDragged = newList[draggedFrom]

        const remainingItems = newList.filter(
            (item, index) => index !== draggedFrom,
        )

        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo),
        ]

        if (dragAndDrop.updatedOrder.length > 0) {
            setList(dragAndDrop.updatedOrder)
        }

        if (draggedTo !== dragAndDrop.draggedTo) {
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo,
            })
        }
    }

    const onDrop = () => {
        if (dragAndDrop.updatedOrder.length > 0) {
            setList(dragAndDrop.updatedOrder)
        }

        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: 0,
            draggedTo: 0,
            isDragging: false,
        })
    }

    return { dragAndDrop, onDragStart, onDragOver, onDrop, list }
}

export { useDraggableList }
