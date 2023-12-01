import { Menu } from './Menu'
import { Toolbar } from './Toolbar'
import React from 'react'
import { Primitive, TextBlock, Image } from '../../types'

function Bars(props: {
    selectedObjectId?: string
    objects?: Array<Primitive | Image | TextBlock>
}) {
    console.log('selectedObjectId: ', props.selectedObjectId)

    return (
        <div>
            <Menu
                selectedObjectId={props.selectedObjectId}
                objects={props.objects}
            ></Menu>
            <Toolbar
                selectedObjectId={props.selectedObjectId}
                objects={props.objects}
            ></Toolbar>
        </div>
    )
}

export { Bars }
