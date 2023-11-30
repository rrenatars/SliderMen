import React from 'react'
import { presentation } from './testData3'
import { PresentationView } from './components/PresentationView'

function App() {
    return (
        <div>
            <PresentationView
                presentationData={presentation}
            ></PresentationView>
        </div>
    )
}

export default App
