import { Menu } from './Menu'
import { Toolbar } from './Toolbar'
import React from 'react'
import { Primitive, TextBlock, Image, Presentation } from '../../types'

function Bars(props: {
    selectedObjectId?: string
    objects?: Array<Primitive | Image | TextBlock>
    presentationData: Presentation
}) {
    console.log('selectedObjectId: ', props.selectedObjectId)

    return (
        <div>
            <Menu
                selectedObjectId={props.selectedObjectId}
                objects={props.objects}
                presentationData={props.presentationData}
            ></Menu>
            <Toolbar
                selectedObjectId={props.selectedObjectId}
                objects={props.objects}
            ></Toolbar>
        </div>
    )
}

export { Bars }
