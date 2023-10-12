"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const color = {
    hex: '#FF0000',
    opacity: 0.5,
};
const textBlock = {
    id: 'textBlock1',
    coordinates: { x: 10, y: 20 },
    width: 100,
    height: 50,
    value: 'In todays fast-paced world, technology plays a pivotal role in shaping our lives. From the smartphones we carry in our pockets to the complex algorithms that power our favorite online services, innovation is all around us. However, as we embrace these advancements, its essential to strike a balance between progress and human values.\n',
    color: color,
    fontSize: 10,
    fontFamily: 'oxygen',
    type: types_1.ObjectType.TEXTBLOCK,
};
const primitive = {
    id: 'primitive1',
    coordinates: { x: 30, y: 40 },
    width: 80,
    height: 60,
    primitiveType: types_1.Figures.RECTANGLE,
    fillColor: color,
    type: types_1.ObjectType.PRIMITIVE,
};
const image = {
    id: 'image1',
    coordinates: { x: 50, y: 60 },
    width: 120,
    height: 90,
    base64: '0J/RgNC40LLQtdGC',
    type: types_1.ObjectType.IMAGE,
};
const background = {
    color,
};
const slide = {
    id: 'slide',
    objects: [textBlock, primitive, image],
    background,
};
const slide1 = {
    id: 'slide1',
    background,
    objects: [],
};
const slide2 = {
    id: 'slide2',
    objects: [textBlock, image],
    background,
};
const history = {
    events: [],
};
const presentation = {
    id: 'presentation1',
    name: 'Моя презентация',
    history,
    slides: [slide, slide1, slide2],
    selection: {
        slideId: 'slide1',
    },
};
console.log(presentation);
