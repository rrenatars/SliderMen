import { SlideView } from './SlideView'
import styles from './PresentationView.module.css'
import React from 'react'
import { Slide } from '../types'

function SlideEditor(props: {
    selectedSlide: Slide
    selectedObjectId?: string
    onObjectClick: (objectId: string) => void
    isAddingText: boolean
}) {
    return (
        <div>
            <SlideView
                selectionSlideClass={styles.selectionSlide}
                slideData={props.selectedSlide}
                key={props.selectedSlide.id}
                selectedObjectId={props.selectedObjectId}
                onObjectClick={props.onObjectClick}
                isAddingText={props.isAddingText}
            ></SlideView>
        </div>
    )
}

export { SlideEditor }
