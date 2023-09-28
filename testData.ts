import {TextBlock, Image, Primitive, SlideObject} from "./types"

const textBlock: TextBlock = {
    coordinates: {
        x: 12,
        y: 12,
    },
    width: 12,
    height: 12,
    type: 'text',
    value: 'привет',
    color: {
        hex: '12',
        opacity: 1.0,
    },
    fontSize: 12,
    fontFamily: 'Roboto',
}

const shape: Primitive = {
    coordinates: {
        x: 12,
        y: 12,
    },
    width: 12,
    height: 12,
    type: 'primitive',
    figure: 'triangle',
    outlineColor: {
        hex: '12',
        opacity: 1,
    },
    fillColor: {
        hex: 'FF',
        opacity: 5.0,
    }
}

const slideObject: SlideObject = {
    coordinates: {
        x: 12,
        y: 13,
    },
    width: 300,
    height: 100,
    type: 'image',
}

console.log("TextBlock: ", textBlock)
console.log("Primitive: ", shape)
console.log("SlideObject: ", slideObject)