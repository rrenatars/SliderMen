"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const textBlock = {
    id: "2",
    coordinates: {
        x: 12,
        y: 12,
    },
    width: 12,
    height: 12,
    type: types_1.ObjectType.TextBlock,
    value: 'привет',
    color: {
        hex: '12',
        opacity: 1.0,
    },
    fontSize: 12,
    fontFamily: 'Roboto',
};
const shape = {
    id: "12",
    coordinates: {
        x: 12,
        y: 12,
    },
    width: 12,
    height: 12,
    type: types_1.ObjectType.Primitive,
    figure: types_1.Figures.Triangle,
    outlineColor: {
        hex: '12',
        opacity: 1,
    },
    fillColor: {
        hex: 'FF',
        opacity: 5.0,
    }
};
const background = {
    color: {
        hex: "fff",
        opacity: 1,
    },
    base64: "fadfadsf",
};
const image = {
    id: "3",
    coordinates: {
        x: 10,
        y: 120,
    },
    width: 100,
    height: 312,
    type: types_1.ObjectType.Image,
    base64: "fadca",
};
const slide1 = {
    id: "4",
    objects: [textBlock, shape, image],
    background: background,
};
const presentation = {
    id: "1",
    name: 'pres',
    slides: [slide1],
};
console.log("TextBlock: ", textBlock);
console.log("Primitive: ", shape);
console.log("Presentation: ", presentation);
console.log("Background: ", background);
console.log("Slide: ", slide1);
console.log("Presentation: ", presentation);
