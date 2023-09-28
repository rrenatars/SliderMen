type Coordinate = {
    x: number,
    y: number,
}

type SlideObject = {
    coordinates: Coordinate,
    width: number,
    height: number,
    type: ObjectType,
}

type Color = {
    hex: string,
    opacity: number & { >= 0: true, <= 1: true },
}

type TextBlock = SlideObject & {
    value: string,
    color: Color,
    fontSize: number,
    fontFamily: string,
}

type Figures = 'triangle'|'rectangle'|'circle'

type Primitive = SlideObject & {
    figure: Figures,
    outlineColor: Color,
    fillColor: Color,
}

type ObjectType = 'primitive'|'image'|'text'

type Image = SlideObject & {
    path: string,
}

export {
    TextBlock,
    Image,
    Primitive,
    SlideObject,
}