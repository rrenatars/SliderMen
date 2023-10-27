import React from 'react'
import './App.css'
import {
    Background,
    Color,
    Figures,
    History,
    Image,
    ObjectType,
    Presentation,
    Primitive,
    Slide,
    TextBlock,
} from './types'
import { PrimitiveBlock } from './components/PrimitiveBlock'
import { primitive2 } from './testData3'

function App() {
    return (
        <div>
            <PrimitiveBlock primitive={primitive2}></PrimitiveBlock>
        </div>
    )
}

export default App
