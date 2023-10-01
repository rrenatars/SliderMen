import {Background, Figures, Image, ObjectType, Presentation, Primitive, Slide, TextBlock} from "./types"

const textBlock: TextBlock = {
    id: "2",
    coordinates: {
        x: 12,
        y: 12,
    },
    width: 12,
    height: 12,
    type: ObjectType.TextBlock,
    value: 'привет',
    color: {
        hex: '12',
        opacity: 1.0,
    },
    fontSize: 12,
    fontFamily: 'Roboto',
}

const shape: Primitive = {
    id: "12",
    coordinates: {
        x: 12,
        y: 12,
    },
    width: 12,
    height: 12,
    type: ObjectType.Primitive,
    figure: Figures.Triangle,
    outlineColor: {
        hex: '12',
        opacity: 1,
    },
    fillColor: {
        hex: 'FF',
        opacity: 5.0,
    }
}

const background: Background = {
    color: {
        hex: "fff",
        opacity: 1,
    },
    base64: "fadfadsf",
}

const image: Image = {
    id: "3",
    coordinates: {
        x: 10,
        y: 120,
    },
    width: 100,
    height: 312,
    type: ObjectType.Image,
    base64: "fadca",
}

const slide1: Slide = {
    id: "4",
    objects: [textBlock, shape, image],
    background: background,
}

const presentation: Presentation = {
    id: "1",
    name: 'pres',
    slides: [slide1],
}

console.log("TextBlock: ", textBlock)
console.log("Primitive: ", shape)
console.log("Presentation: ", presentation)
console.log("Background: ", background)
console.log("Slide: ", slide1)
console.log("Presentation: ", presentation)