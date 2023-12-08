import { SlideView } from './SlideView'
import styles from './PresentationView.module.css'
import React from 'react'
import { Slide } from '../types'

function SlideEditor(props: {
    selectedSlide: Slide
    selectedObjectId?: string
    onObjectClick: (objectId: string) => void
}) {
    return (
        <div>
            <SlideView
                selectionSlideClass={styles.selectionSlide}
                slideData={props.selectedSlide}
                key={props.selectedSlide.id}
                selectedObjectId={props.selectedObjectId}
                onObjectClick={props.onObjectClick}
            ></SlideView>
        </div>
    )
}

export { SlideEditor }
