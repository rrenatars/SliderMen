import React, { useEffect, useState } from 'react'
import { usePresentationDataContext } from '../components/PresentationDataContext'
import { Slide } from '../types'
import { useAppSelector } from '../redux/hooks'

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

const useDraggableList: () => {
    onDrop: () => void
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void
    list: Slide[]
    dragAndDrop: DragAndDropState
} = () => {
    const { presentationData } = usePresentationDataContext()

    const [dragAndDrop, setDragAndDrop] =
        useState<DragAndDropState>(initialDnDState)

    const slides = useAppSelector((state) => state.slides)

    const [list, setList] = useState<Slide[]>(slides)

    useEffect(() => {
        setList(slides)
    }, [slides])

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
