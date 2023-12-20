import React from 'react'
import styles from './FiguresContextMenu.module.css'
import { Color, Figures, ObjectType, Primitive } from '../../types'
import { generateUniqueId } from '../../tools'
import { usePresentationDataContext } from '../PresentationDataContext'

function FiguresContextMenu(props: {
    setContextMenuFiguresVisible: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuFiguresPosition: { top: number; left: number }
    selectedSlideId: string
}) {
    const { setPresentationData } = usePresentationDataContext()

    const color: Color = {
        hex: '#FF7600',
        opacity: 0.6,
    }
    const handleFigureClick = (figureType: Figures) => {
        try {
            const primitive: Primitive = {
                id: generateUniqueId(),
                primitiveType: figureType,
                fillColor: color,
                coordinates: { x: 100, y: 100 },
                width: 50,
                height: 50,
                type: ObjectType.PRIMITIVE,
            }

            setPresentationData((prevData) => {
                const updatedSlides = prevData.slides.map((slide) =>
                    slide.id === props.selectedSlideId
                        ? {
                              ...slide,
                              objects: [...slide.objects, primitive],
                          }
                        : slide,
                )

                return {
                    ...prevData,
                    slides: updatedSlides,
                    selection: {
                        ...prevData.selection,
                        slideId: props.selectedSlideId,
                        objectId: primitive.id,
                    },
                }
            })

            props.setContextMenuFiguresVisible(false)
        } catch (error) {
            console.error('Ошибка при добавлении примитива:', error)
        }
    }

    return (
        <div
            className={styles.contextMenu}
            style={{
                top: props.contextMenuFiguresPosition.top,
                left: props.contextMenuFiguresPosition.left,
            }}
        >
            <button
                className={styles.contextMenuItem}
                onClick={() => handleFigureClick(Figures.RECTANGLE)}
            >
                Прямоугольник
            </button>
            <button
                className={styles.contextMenuItem}
                onClick={() => handleFigureClick(Figures.CIRCLE)}
            >
                Круг
            </button>
            <button
                className={styles.contextMenuItem}
                onClick={() => handleFigureClick(Figures.TRIANGLE)}
            >
                Треугольник
            </button>
        </div>
    )
}

export { FiguresContextMenu }
