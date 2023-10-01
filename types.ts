enum Figures {
    TRIANGLE = 'triangle',
    RECTANGLE = 'rectangle',
    CIRCLE = 'circle',
}

enum ObjectType {
    IMAGE = 'image',
    TEXTBLOCK = 'textBlock',
    PRIMITIVE = 'primitive',
}

type SlideObject = {
    id: string,
    coordinates: {
        x: number,
        y: number,
    },
    width: number,
    height: number,
}

type Color = {
    hex: string,
    opacity: number;
}

type TextBlock = SlideObject & {
    value: string,
    color: Color,
    fontSize: number,
    fontFamily: string,
    type: ObjectType.TEXTBLOCK,
}

type Primitive = SlideObject & {
    primitiveType: Figures,
    outlineColor?: Color,
    fillColor: Color,
    type: ObjectType.PRIMITIVE,
}

type Image = SlideObject & {
    type: ObjectType.IMAGE,
    base64: string,
}

const image: Image = {
    id: '2',
    coordinates: {
        x: 0,
        y: 0,
    },
    width: 100,
    height: 100,
    base64: '',
    type: ObjectType.IMAGE,
}

const primitive: Primitive = {
    id: '2',
    coordinates: {
        x: 12,
        y: 54,
    },
    width: 100,
    height: 100,
    type: ObjectType.PRIMITIVE,
    fillColor: {
        hex: "23",
        opacity: 1.0,
    },
    primitiveType: Figures.TRIANGLE,
}

console.log(image)
console.log(primitive)

type Background = {
    color: Color,
    base64?: string,
}

type Slide = {
    id: string,
    objects?: Array<Image|TextBlock|Primitive>,
    background: Background,
}

type History = {
    events: string[],
}

type Presentation = {
    id: string,
    name: string,
    history?: History,
    slides: Array<Slide>,
    selection: {
        slideId: string,
        objectId?: string,
    },
}

export {
    TextBlock,
    Image,
    Primitive,
    SlideObject,
    ObjectType,
    Presentation,
    Background,
    Slide,
    Figures,
}