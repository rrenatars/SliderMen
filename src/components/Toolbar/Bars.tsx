import { Menu } from './Menu'
import { Toolbar } from './Toolbar'
import React from 'react'
import { Primitive, TextBlock, Image, Presentation } from '../../types'
import { usePresentationDataContext } from '../PresentationDataContext'

function Bars(props: {
    selectedObjectId?: string
    selectedSlideId?: string
    objects?: Array<Primitive | Image | TextBlock>
    onAddSlide: () => void
    onRemoveSlide: (slideId: string) => void
}) {
    return (
        <div>
            <Menu
                selectedObjectId={props.selectedObjectId}
                objects={props.objects}
            ></Menu>
            <Toolbar
                selectedObjectId={props.selectedObjectId}
                selectedSlideId={props.selectedSlideId}
                objects={props.objects}
                onAddSlide={props.onAddSlide}
                onRemoveSlide={props.onRemoveSlide}
            ></Toolbar>
        </div>
    )
}

export { Bars }
