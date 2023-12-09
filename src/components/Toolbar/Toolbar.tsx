import styles from './Toolbar.module.css'
import textFieldImage from '../../images/toolbar/text-field.png'
import iconImage from '../../images/toolbar/icon-image.png'
import figureIcon from '../../images/toolbar/figure-icon.png'
import newSlideButton from '../../images/toolbar/new-slide-button.png'
import binIcon from '../../images/toolbar/bin-icon.png'
import React from 'react'
import { Image, ObjectType, Primitive, TextBlock } from '../../types'
import { ObjectToolbarButton } from './ObjectToolbarButton'
import { blackColor } from '../../testData3'
import { generateUniqueId } from '../../tools'
import { usePresentationDataContext } from '../PresentationDataContext'

function Toolbar(props: {
    selectedObjectId?: string
    selectedSlideId?: string
    objects?: Array<Primitive | Image | TextBlock>
    onAddSlide: () => void
    onRemoveSlide: (slideId: string) => void
}) {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const selectedObjectType =
        props.objects?.find((object) => object.id === props.selectedObjectId)
            ?.type || null

    function handleNewTextButton() {
        const newText: TextBlock = {
            id: generateUniqueId(),
            value: 'Новый текст',
            coordinates: { x: 10, y: 50 },
            width: 100,
            height: 100,
            color: blackColor,
            fontSize: 12,
            fontFamily: 'Roboto',
            type: ObjectType.TEXTBLOCK,
        }

        const updatedSlides = presentationData.slides.map((slide) => {
            if (slide.id === props.selectedSlideId) {
                const updatedObjects = [...(slide.objects || []), newText]
                return { ...slide, objects: updatedObjects }
            }
            return slide
        })

        const updatedPresentationData = {
            ...presentationData,
            slides: updatedSlides,
        }

        setPresentationData(updatedPresentationData)
    }

    return (
        <div className={styles.toolbar}>
            <img
                onClick={handleNewTextButton}
                className={styles.toolbarIcon}
                src={textFieldImage}
                alt=""
            />
            <img className={styles.toolbarIcon} src={iconImage} alt="" />
            <img className={styles.toolbarIcon} src={figureIcon} alt="" />
            <img
                onClick={props.onAddSlide}
                className={styles.toolbarIcon}
                src={newSlideButton}
                alt=""
            />
            <img
                onClick={() =>
                    props.selectedSlideId &&
                    props.onRemoveSlide(props.selectedSlideId)
                }
                className={styles.toolbarIcon}
                src={binIcon}
                alt="Удалить слайд"
                title="Удалить слайд"
            />
            {selectedObjectType && (
                <ObjectToolbarButton
                    selectedObjectType={selectedObjectType}
                ></ObjectToolbarButton>
            )}
        </div>
    )
}

export { Toolbar }
