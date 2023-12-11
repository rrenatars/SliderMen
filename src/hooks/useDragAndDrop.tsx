import React, { useEffect, useRef, useState } from 'react'

interface Position {
    x: number
    y: number
}

const useDragAndDrop = (
    ref: React.RefObject<HTMLElement>,
    setPos: React.Dispatch<React.SetStateAction<Position>>,
    initialPos: Position,
) => {
    const [isDragging, setIsDragging] = useState(false)
    const startPos = useRef<Position | null>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && startPos.current) {
                const delta = {
                    x: e.pageX - startPos.current.x,
                    y: e.pageY - startPos.current.y,
                }
                const newPos = {
                    x: initialPos.x + delta.x,
                    y: initialPos.y + delta.y,
                }
                setPos(newPos)
            }
        }

        const handleMouseUp = () => {
            if (isDragging) {
                startPos.current = null
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
                setIsDragging(false)
            }
        }

        const handleMouseDown = (e: MouseEvent) => {
            console.log('click down')
            e.preventDefault()
            startPos.current = { x: e.pageX, y: e.pageY }
            setIsDragging(true)
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        if (ref.current) {
            ref.current.addEventListener('mousedown', handleMouseDown)
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mousedown', handleMouseDown)
            }
        }
    }, [ref, isDragging, setPos, initialPos])

    return { isDragging }
}

export { useDragAndDrop }
