import React from 'react'
import './App.css'
import { presentation } from './testData3'
import { PresentationView } from './components/PresentationView'

function App() {
    return (
        <div className="app">
            <PresentationView
                presentationData={presentation}
            ></PresentationView>
        </div>
    )
}

export default App
