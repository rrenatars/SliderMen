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
    value: "In today's fast-paced world, technology plays a pivotal role in shaping our lives. From the smartphones we carry in our pockets to the complex algorithms that power our favorite online services, innovation is all around us. However, as we embrace these advancements, it's essential to strike a balance between progress and human values.\n",
    color: color,
    fontSize: 10,
    fontFamily: "oxygen",
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
    base64: "0J/RgNC40LLQtdGC",
    type: ObjectType.IMAGE,
};

const background: Background = {
    color: color,
};

const slide: Slide = {
    id: "slide",
    objects: [textBlock, primitive, image],
    background: background,
};

const slide1: Slide = {
    id: "slide1",
    background: background,
};

const slide2: Slide = {
    id: "slide2",
    objects: [textBlock, image],
    background: background,
};

const history: History = {
    events: ["reset"],
};

const presentation: Presentation = {
    id: "presentation1",
    name: "Моя презентация",
    slides: [slide, slide1, slide2],
    selection: {
        slideId: "1",
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