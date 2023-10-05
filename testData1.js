"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const color = {
    hex: "#FF0000",
    opacity: 0.5,
};
const textBlock = {
    id: "textBlock1",
    coordinates: { x: 10, y: 20 },
    width: 100,
    height: 50,
    value: "",
    color: color,
    fontSize: 0,
    fontFamily: "",
    type: types_1.ObjectType.TEXTBLOCK,
};
const primitive = {
    id: "primitive1",
    coordinates: { x: 30, y: 40 },
    width: 80,
    height: 60,
    primitiveType: types_1.Figures.RECTANGLE,
    fillColor: color,
    type: types_1.ObjectType.PRIMITIVE,
};
const image = {
    id: "image1",
    coordinates: { x: 50, y: 60 },
    width: 120,
    height: 90,
    base64: "",
    type: types_1.ObjectType.IMAGE,
};
const background = {
    color: color,
    base64: "",
};
const slide = {
    id: "slide1",
    objects: [],
    background: background,
};
const history = {
    events: [],
};
const presentation = {
    id: "presentation1",
    name: "Моя презентация",
    history: history,
    slides: [],
    selection: {
        slideId: "",
    },
};
const slideObject = {
    id: "slideObject1",
    coordinates: { x: 10, y: 20 },
    width: 100,
    height: 50,
};
console.log("TextBlock: ", textBlock);
console.log("Primitive: ", primitive);
console.log("Presentation: ", presentation);
console.log("Background: ", background);
console.log("Slide: ", slide);
console.log("SlideObject: ", slideObject);
console.log("Color: ", color);
console.log("History: ", history);
console.log("Image: ", image);
