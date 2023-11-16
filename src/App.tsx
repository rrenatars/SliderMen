import React from 'react'
import { presentation } from './testData3'
import { PresentationView } from './components/PresentationView'
import styles from './App.module.css'

function App() {
    return (
        <div className={styles.app}>
            <PresentationView
                presentationData={presentation}
            ></PresentationView>
        </div>
    )
}

export default App
