import React from 'react'
import { Presentation } from '../types'
import { SlideView } from './SlideView'
import styles from './PresentationView.module.css'

function PresentationView(props: { presentationData: Presentation }) {
    const { id, name, history, slides, selection } = props.presentationData

    return (
        <div>
            <h1>{name}</h1>
            <div className={styles.slides}>
                {slides.map((slide) =>
                    selection?.slideId === slide.id ? (
                        <SlideView
                            className={styles.selectionSlide}
                            slideData={slide}
                            key={slide.id}
                        ></SlideView>
                    ) : (
                        <SlideView slideData={slide} key={slide.id}></SlideView>
                    ),
                )}
            </div>
        </div>
    )
}

export { PresentationView }
