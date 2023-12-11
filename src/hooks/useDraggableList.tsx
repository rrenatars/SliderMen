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

    // The initial state of "list"
    // is going to be the static "items" array
    const [list, setList] = useState<Slide[]>(presentationData.slides)

    useEffect(() => {
        setList(presentationData.slides)
    }, [presentationData])

    const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        // event.preventDefault()
        // We'll access the "data-position" attribute
        // of the current element dragged
        const initialPosition = Number(event.currentTarget.dataset.position)

        setDragAndDrop({
            // we spread the previous content
            // of the hook variable
            // so we don't override the properties
            // not being updated
            ...dragAndDrop,

            draggedFrom: initialPosition, // set the draggedFrom position
            isDragging: true,
            originalOrder: list, // store the current state of "list"
            updatedOrder: [], // initialize updatedOrder
        })
    }

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()

        // Store the content of the original list
        // in this variable that we'll update
        let newList = dragAndDrop.originalOrder

        // index of the item being dragged
        const draggedFrom = dragAndDrop.draggedFrom

        // index of the drop area being hovered
        const draggedTo = Number(event.currentTarget.dataset.position)

        // get the element that's at the position of "draggedFrom"
        const itemDragged = newList[draggedFrom]

        // filter out the item being dragged
        const remainingItems = newList.filter(
            (item, index) => index !== draggedFrom,
        )

        // update the list
        newList = [
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo),
        ]

        if (dragAndDrop.updatedOrder.length > 0) {
            setList(dragAndDrop.updatedOrder)
        }

        // since this event fires many times
        // we check if the targets are actually
        // different:
        if (draggedTo !== dragAndDrop.draggedTo) {
            setDragAndDrop({
                ...dragAndDrop,

                // save the updated list state
                // we will render this onDrop
                updatedOrder: newList,
                draggedTo: draggedTo,
            })
        }
    }

    const onDrop = () => {
        // we use the updater function
        // for the "list" hook
        if (dragAndDrop.updatedOrder.length > 0) {
            setList(dragAndDrop.updatedOrder)
        }

        // and reset the state of
        // the DnD
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
