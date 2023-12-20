import { PresentationContextProvider } from './PresentationDataContext'
import { PresentationView } from './PresentationView'
import React from 'react'
import { Presentation } from '../types'

function ContextInit(props: { presentationData: Presentation }) {
    return (
        <PresentationContextProvider
            initialPresentationData={props.presentationData}
        >
            <PresentationView></PresentationView>
        </PresentationContextProvider>
    )
}

export { ContextInit }
