import { Menu } from './Menu'
import { Toolbar } from './Toolbar'
import React from 'react'
import { Primitive, TextBlock, Image, Presentation } from '../../types'

function Bars(props: {
    selectedObjectId?: string
    selectedSlideId?: string
    objects?: Array<Primitive | Image | TextBlock>
    presentationData: Presentation
    onAddSlide: () => void
    onRemoveSlide: (slideId: string) => void
}) {
    return (
        <div>
            <Menu
                selectedObjectId={props.selectedObjectId}
                objects={props.objects}
                presentationData={props.presentationData}
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
