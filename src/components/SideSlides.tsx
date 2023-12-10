import styles from './PresentationView.module.css'
import { SlideView } from './SlideView'
import { Presentation, Slide } from '../types'
import React from 'react'
import { presentation } from '../testData3'
import { usePresentationDataContext } from './PresentationDataContext'

function SideSlides(props: {
    presentationData: Presentation
    selectedSlideId?: string
    onSlideClick: (slideId: string) => void
}) {
    return (
        <div className={styles.slides}>
            {props.presentationData.slides.map((slide, index) => (
                <SlideView
                    slideData={slide}
                    key={slide.id}
                    scale={20}
                    index={index + 1}
                    onClick={() => props.onSlideClick(slide.id)}
                    isSlideSelected={props.selectedSlideId === slide.id}
                ></SlideView>
            ))}
        </div>
    )
}

export { SideSlides }
