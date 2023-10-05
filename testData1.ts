import {Background, History, Figures, ObjectType, Image, Color, Presentation, SlideObject, Primitive, Slide, TextBlock} from "./types"

const color: Color = {
    hex: "#FF0000",
    opacity: 0.5,
};

const textBlock: TextBlock = {
    id: "textBlock1",
    coordinates: { x: 10, y: 20 },
    width: 100,
    height: 50,
    value: "",
    color: color,
    fontSize: 0,
    fontFamily: "",
    type: ObjectType.TEXTBLOCK,
};

const primitive: Primitive = {
    id: "primitive1",
    coordinates: { x: 30, y: 40 },
    width: 80,
    height: 60,
    primitiveType: Figures.RECTANGLE,
    fillColor: color,
    type: ObjectType.PRIMITIVE,
};

const image: Image = {
    id: "image1",
    coordinates: { x: 50, y: 60 },
    width: 120,
    height: 90,
    base64: "",
    type: ObjectType.IMAGE,
};

const background: Background = {
    color: color,
    base64: "",
};

const slide: Slide = {
    id: "slide1",
    objects: [],
    background: background,
};

const history: History = {
    events: [],
};

const presentation: Presentation = {
    id: "presentation1",
    name: "Моя презентация",
    history: history,
    slides: [],
    selection: {
        slideId: "",
    },
};

const slideObject: SlideObject = {
    id: "slideObject1",
    coordinates: { x: 10, y: 20 },
    width: 100,
    height: 50,
};


console.log("TextBlock: ", textBlock)
console.log("Primitive: ", primitive)
console.log("Presentation: ", presentation)
console.log("Background: ", background)
console.log("Slide: ", slide)
console.log("SlideObject: ", slideObject)
console.log("Color: ", color)
console.log("History: ", history)
console.log("Image: ", image)