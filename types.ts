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
    opacity: number;
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

type History = {
    events: string[] | null | undefined
}

type Presentation = {
    name: string,
    history?: History,
}

export {
    TextBlock,
    Image,
    Primitive,
    SlideObject,
    ObjectType,
    Presentation,
}