import React from 'react'
import { PresentationView } from './components/PresentationView'
import { useImportFileHandler } from './hooks/useImportFileHandler'

function App() {
    const { parsedPresentation, error, handleFileChange } =
        useImportFileHandler()

    return (
        <div>
            {!parsedPresentation ? (
                <div>
                    <input type="file" onChange={handleFileChange} />
                    {error && <p>{error}</p>}
                </div>
            ) : (
                <PresentationView
                    presentationData={parsedPresentation}
                ></PresentationView>
            )}
        </div>
    )
}

export default App
