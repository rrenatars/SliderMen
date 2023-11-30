import React, { useState } from 'react'
import { Presentation } from '../types'
import { SlideView } from './SlideView'
import { Toolbar } from './Toolbar/Toolbar'
import styles from './PresentationView.module.css'

function PresentationView(props: { presentationData: Presentation }) {
    const { name, slides, selection } = props.presentationData

    const [selectionId, setSelectionId] = useState(selection?.slideId)

    function handleSlideClick(clickedSlideId: string): void {
        setSelectionId(clickedSlideId)
    }

    return (
        <div>
            <h1 className={styles.presentationName}>{name}</h1>
            <Toolbar selectedObjectId={selection?.objectId}></Toolbar>
            <div className={styles.workfield}>
                <div className={styles.slides}>
                    {slides.map((slide, index) => (
                        <SlideView
                            slideData={slide}
                            key={slide.id}
                            scale={20}
                            index={index + 1}
                            onClick={() => handleSlideClick(slide.id)}
                            selectedSlide={selectionId === slide.id}
                        ></SlideView>
                    ))}
                </div>
                <div>
                    {slides.map(
                        (slide) =>
                            selectionId === slide.id && (
                                <SlideView
                                    selectionSlideClass={styles.selectionSlide}
                                    slideData={slide}
                                    key={slide.id}
                                ></SlideView>
                            ),
                    )}
                </div>
            </div>
        </div>
    )
}

export { PresentationView }
