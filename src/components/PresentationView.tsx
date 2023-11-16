import React from 'react'
import { Presentation } from '../types'
import { SlideView } from './SlideView'
import styles from './PresentationView.module.css'

function PresentationView(props: { presentationData: Presentation }) {
    const { name, slides, selection } = props.presentationData

    return (
        <div>
            <h1>{name}</h1>
            <div className={styles.slides}>
                {slides.map((slide) => (
                    <SlideView slideData={slide} key={slide.id}></SlideView>
                ))}
            </div>
            <div>
                {slides.map(
                    (slide) =>
                        selection?.slideId === slide.id && (
                            <SlideView
                                selectionSlideClass={styles.selectionSlide}
                                slideData={slide}
                                key={slide.id}
                            ></SlideView>
                        ),
                )}
            </div>
        </div>
    )
}

export { PresentationView }
