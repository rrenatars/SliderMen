import { Slide } from './types'
import { background3, newTextBlock } from './testData3'

function generateUniqueId(): string {
    return Math.random().toString(36).substring(7)
}

function createNewSlide(): Slide {
    return {
        id: generateUniqueId(),
        objects: [newTextBlock],
        background: background3,
    }
}

export { generateUniqueId, createNewSlide }
