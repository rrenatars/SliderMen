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

import { generateUniqueId } from './tools'

const color: Color = {
    hex: '#FF0000',
    opacity: 0.5,
}

const color2: Color = {
    hex: '#FF7600',
    opacity: 0.6,
}

const color3: Color = {
    hex: '#3179d7',
    opacity: 0.5,
}

const color4: Color = {
    hex: '#FFFFFF',
    opacity: 1.0,
}

const blackColor: Color = {
    hex: '#000000',
    opacity: 1.0,
}

const textBlock: TextBlock = {
    id: 'textBlock1',
    coordinates: { x: 589, y: 20 },
    width: 300,
    height: 500,
    value: 'In todays fast-paced world, technology plays a pivotal role in shaping our lives. From the smartphones we carry in our pockets to the complex algorithms that power our favorite online services, innovation all around us.',
    color: color4,
    fontSize: 20,
    fontFamily: 'Monocraft',
    bold: false,
    type: ObjectType.TEXTBLOCK,
}

const textBlock2: TextBlock = {
    id: 'textBlock2',
    coordinates: { x: 10, y: 50 },
    width: 800,
    height: 450,
    value:
        'In todays fast-paced world, technology plays a pivotal role in shaping our lives. From the smartphones we carry in our pockets to the complex algorithms that power our favorite online services, innovation is all around us. However, as we embrace these advancements, its essential to strike a balance between progress and human values.\n' +
        '\n' +
        'One of the most profound technological shifts of recent years has been the rise of artificial intelligence (AI). AI systems, like the one youre interacting with right now, are becoming increasingly capable of understanding and generating human-like text. They can assist with tasks ranging from language translation to medical diagnosis, revolutionizing various industries.\n' +
        '\n' +
        'Yet, this progress also raises important questions. How do we ensure that AI technologies are used ethically? How do we protect against bias and discrimination in AI algorithms? These are challenges that demand careful consideration and responsible development.',
    color: color4,
    fontSize: 24,
    fontFamily: 'Oxygen',
    bold: false,
    type: ObjectType.TEXTBLOCK,
}

const textBlock3: TextBlock = {
    id: 'textBlock3',
    coordinates: { x: 100, y: 20 },
    width: 400,
    height: 300,
    value:
        'In todays fast-paced world, technology plays a pivotal role in shaping our lives. From the smartphones we carry in our pockets to the complex algorithms that power our favorite online services, innovation is all around us. However, as we embrace these advancements, its essential to strike a balance between progress and human values.\n' +
        '\n' +
        'One of the most profound technological shifts of recent years has been the rise of artificial intelligence (AI). AI systems, like the one youre interacting with right now, are becoming increasingly capable of understanding and generating human-like text. They can assist with tasks ranging from language translation to medical diagnosis, revolutionizing various industries.\n' +
        '\n' +
        'Yet, this progress also raises important questions. How do we ensure that AI technologies are used ethically? How do we protect against bias and discri',
    color: color4,
    fontSize: 10,
    fontFamily: 'oxygen',
    bold: false,
    type: ObjectType.TEXTBLOCK,
}

const textBlock4: TextBlock = {
    id: 'textBlock4',
    coordinates: { x: 146, y: 70 },
    width: 500,
    height: 300,
    value:
        'In todays fast-paced world, technology plays a pivotal role in shaping our lives. From the smartphones we carry in our pockets to the complex algorithms that power our favorite online services, innovation is all around us. However, as we embrace these advancements, its essential to strike a balance between progress and human values.\n' +
        '\n' +
        'One of the most profound technological shifts of recent years has been the rise of artificial intelligence (AI). AI systems, like the one youre interacting with right now, are becoming increasingly capable of understanding and generating human-like text. They can assist with tasks ranging from language translation to medical diagnosis, revolutionizing various industries.\n' +
        '\n' +
        'Yet, this progress also raises important questions. How do we ensure that AI technologies are used ethically? How do we protect against bias and discrimination in AI algorithms? These are challenges that demand careful consideration and responsible development.\n',
    color: color2,
    fontSize: 15,
    fontFamily: 'oxygen',
    bold: false,
    type: ObjectType.TEXTBLOCK,
}

const newStartSlideTextBlock: TextBlock = {
    id: generateUniqueId(),
    coordinates: {
        x: 200,
        y: 125,
    },
    width: 600,
    height: 150,
    value: 'Введите заголовок',
    color: blackColor,
    fontSize: 52,
    fontFamily: 'Consolas',
    bold: false,
    type: ObjectType.TEXTBLOCK,
}

const newSlideTextBlock: TextBlock = {
    id: generateUniqueId(),
    coordinates: {
        x: 30,
        y: 40,
    },
    width: 300,
    height: 50,
    value: 'Введите заголовок',
    color: blackColor,
    fontSize: 25,
    fontFamily: 'Consolas',
    bold: false,
    type: ObjectType.TEXTBLOCK,
}

const newTextBlock: TextBlock = {
    id: generateUniqueId(),
    value: 'Новый текст',
    coordinates: { x: 100, y: 200 },
    width: 150,
    height: 50,
    color: blackColor,
    fontSize: 20,
    fontFamily: 'Consolas',
    bold: false,
    type: ObjectType.TEXTBLOCK,
}

const primitive: Primitive = {
    id: 'primitive1',
    coordinates: { x: 20, y: 30 },
    width: 80,
    height: 60,
    primitiveType: Figures.RECTANGLE,
    fillColor: color,
    outlineColor: color2,
    type: ObjectType.PRIMITIVE,
}

const primitive2: Primitive = {
    id: 'primitive2',
    coordinates: { x: 10, y: 100 },
    width: 70,
    height: 70,
    primitiveType: Figures.CIRCLE,
    fillColor: color2,
    outlineColor: color,
    type: ObjectType.PRIMITIVE,
}

const primitive3: Primitive = {
    id: 'primitive3',
    coordinates: { x: 100, y: 100 },
    width: 100,
    height: 120,
    primitiveType: Figures.TRIANGLE,
    fillColor: color,
    outlineColor: color2,
    type: ObjectType.PRIMITIVE,
}

const background: Background = {
    color,
    base64: '0J/RgNC40LLQtdGC',
}

const background2: Background = {
    color: color2,
    base64: '0J/RgNC40LLQtdGC',
}

const background3: Background = {
    color: color4,
}

const background5: Background = {
    color: color3,
}

const slide: Slide = {
    id: 'slide',
    objects: [textBlock, primitive],
    background: background5,
}

const slide1: Slide = {
    id: 'slide1',
    objects: [textBlock2, primitive],
    background: background2,
}

const slide2: Slide = {
    id: 'slide2',
    objects: [textBlock3, primitive2],
    background,
}

const slide3: Slide = {
    id: 'slide3',
    objects: [textBlock4, primitive3],
    background: background3,
}

const slide4: Slide = {
    id: 'slide4',
    objects: [textBlock2, primitive],
    background,
}

const history: History = {
    events: [],
}

const emptySlide: Slide = {
    id: '',
    objects: [],
    background: background3,
}

const startSlide: Slide = {
    id: '',
    objects: [newStartSlideTextBlock],
    background: background3,
}

const emptyPresentation: Presentation = {
    id: '',
    name: 'Презентация без названия',
    history,
    slides: [startSlide],
}

const presentation: Presentation = {
    id: 'presentation1',
    name: 'Моя презентация',
    history,
    slides: [slide, slide1, slide2, slide3, slide4],
    selection: {
        slideId: 'slide1',
        objectId: 'primitive1',
    },
}

export { presentation }

export { primitive2 }

export { background3 }

export { emptyPresentation }

export { history }

export { emptySlide }

export { blackColor }

export { newTextBlock }

export { newSlideTextBlock }
