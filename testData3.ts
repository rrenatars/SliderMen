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

const color: Color = {
    hex: '#FF0000',
    opacity: 0.5,
}

const color2: Color = {
    hex: '#FF7600',
    opacity: 1.0,
}

const textBlock: TextBlock = {
    id: 'textBlock1',
    coordinates: { x: 10, y: 20 },
    width: 100,
    height: 50,
    value:
        'In todays fast-paced world, technology plays a pivotal role in shaping our lives. From the smartphones we carry in our pockets to the complex algorithms that power our favorite online services, innovation is all around us. However, as we embrace these advancements, its essential to strike a balance between progress and human values.\n' +
        '\n' +
        'One of the most profound technological shifts of recent years has been the rise of artificial intelligence (AI). AI systems, like the one youre interacting with right now, are becoming increasingly capable of understanding and generating human-like text. They can assist with tasks ranging from language translation to medical diagnosis, revolutionizing various industries.\n' +
        '\n' +
        'Yet, this progress also raises important questions. How do we ensure that AI technologies are used ethically? How do we protect against bias and discrimination in AI algorithms? These are challenges that demand careful consideration and responsible development.\n' +
        '\n' +
        'Beyond AI, our planet faces pressing environmental issues. Climate change, deforestation, and plastic pollution threaten the very ecosystems that sustain life. Addressing these challenges requires global cooperation and a commitment to sustainable practices. Each of us can make a difference through our choices, whether its reducing our carbon footprint or supporting conservation efforts.\n' +
        '\n' +
        'In the realm of healthcare, breakthroughs continue to improve our well-being. Vaccines have been developed at unprecedented speed to combat global health threats like the COVID-19 pandemic. Medical research is advancing, offering hope for previously untreatable conditions. As patients, we must advocate for our health and be informed advocates for our loved ones.\n' +
        '\n' +
        'Education is another vital aspect of our lives. The way we learn is evolving, with online courses and digital resources opening up new opportunities. Lifelong learning is increasingly essential in a rapidly changing job market. Embracing education can empower individuals and boost economies.\n' +
        '\n' +
        'Cultural diversity enriches our world. Its a source of art, music, cuisine, and traditions that make life more vibrant. Celebrating different cultures fosters understanding and promotes tolerance. In a world that sometimes seems divided, embracing diversity can bridge gaps and build connections.\n' +
        '\n' +
        'In conclusion, we live in a time of great promise and complex challenges. Technology, environmental issues, healthcare, education, and diversity are all intertwined in the fabric of our lives. How we navigate these issues will define our future. Let us remember the importance of responsible innovation, environmental stewardship, health advocacy, lifelong learning, and the celebration of our diverse global community as we shape the path forward.',
    color,
    fontSize: 10,
    fontFamily: 'oxygen',
    type: ObjectType.TEXTBLOCK,
}

const textBlock2: TextBlock = {
    id: 'textBlock2',
    coordinates: { x: 20, y: 20 },
    width: 12,
    height: 55,
    value:
        'In todays fast-paced world, technology plays a pivotal role in shaping our lives. From the smartphones we carry in our pockets to the complex algorithms that power our favorite online services, innovation is all around us. However, as we embrace these advancements, its essential to strike a balance between progress and human values.\n' +
        '\n' +
        'One of the most profound technological shifts of recent years has been the rise of artificial intelligence (AI). AI systems, like the one youre interacting with right now, are becoming increasingly capable of understanding and generating human-like text. They can assist with tasks ranging from language translation to medical diagnosis, revolutionizing various industries.\n' +
        '\n' +
        'Yet, this progress also raises important questions. How do we ensure that AI technologies are used ethically? How do we protect against bias and discrimination in AI algorithms? These are challenges that demand careful consideration and responsible development.\n' +
        '\n' +
        'Beyond AI, our planet faces pressing environmental issues. Climate change, deforestation, and plastic pollution threaten the very ecosystems that sustain life. Addressing these challenges requires global cooperation and a commitment to sustainable practices. Each of us can make a difference through our choices, whether its reducing our carbon footprint or supporting conservation efforts.\n' +
        '\n' +
        'In the realm of healthcare, breakthroughs continue to improve our well-being. Vaccines have been developed at unprecedented speed to combat global health threats like the COVID-19 pandemic. Medical research is advancing, offering hope for previously untreatable conditions. As patients, we must advocate for our health and be informed advocates for our loved ones.\n' +
        '\n' +
        'Education is another vital aspect of our lives. The way we learn is evolving, with online courses and digital resources opening up new opportunities. Lifelong learning is increasingly essential in a rapidly changing job market. Embracing education can empower individuals and boost economies.\n' +
        '\n' +
        'Cultural diversity enriches our world. Its a source of art, music, cuisine, and traditions that make life more vibrant. Celebrating different cultures fosters understanding and promotes tolerance. In a world that sometimes seems divided, embracing diversity can bridge gaps and build connections.\n' +
        '\n' +
        'In conclusion, we live in a time of great promise and complex challenges. Technology, environmental issues, healthcare, education, and diversity are all intertwined in the fabric of our lives. How we navigate these issues will define our future. Let us remember the importance of responsible innovation, environmental stewardship, health advocacy, lifelong learning, and the celebration of our diverse global community as we shape the path forward.',
    color: color2,
    fontSize: 24,
    fontFamily: 'Oxygen',
    type: ObjectType.TEXTBLOCK,
}

const primitive: Primitive = {
    id: 'primitive1',
    coordinates: { x: 30, y: 40 },
    width: 80,
    height: 60,
    primitiveType: Figures.RECTANGLE,
    fillColor: color,
    outlineColor: color2,
    type: ObjectType.PRIMITIVE,
}

const primitive2: Primitive = {
    id: 'primitive2',
    coordinates: { x: 30, y: 50 },
    width: 70,
    height: 65,
    primitiveType: Figures.CIRCLE,
    fillColor: color2,
    outlineColor: color,
    type: ObjectType.PRIMITIVE,
}

const primitive3: Primitive = {
    id: 'primitive3',
    coordinates: { x: 40, y: 60 },
    width: 50,
    height: 80,
    primitiveType: Figures.TRIANGLE,
    fillColor: color,
    outlineColor: color,
    type: ObjectType.PRIMITIVE,
}

const image: Image = {
    id: 'image1',
    coordinates: { x: 50, y: 60 },
    width: 120,
    height: 90,
    base64: '0J/RgNC40LLQtdGC',
    type: ObjectType.IMAGE,
}

const background: Background = {
    color,
    base64: '0J/RgNC40LLQtdGC',
}

const slide: Slide = {
    id: 'slide',
    objects: [textBlock, primitive, image],
    background,
}

const slide1: Slide = {
    id: 'slide1',
    objects: [textBlock, primitive, image],
    background,
}

const slide2: Slide = {
    id: 'slide2',
    objects: [textBlock, primitive3, image],
    background,
}

const slide3: Slide = {
    id: 'slide3',
    objects: [textBlock2, primitive2, image],
    background,
}

const history: History = {
    events: [],
}

const presentation: Presentation = {
    id: 'presentation1',
    name: 'Моя презентация',
    history,
    slides: [slide, slide1, slide2, slide3],
    selection: {
        slideId: 'slide1',
        objectId: 'primitive1',
    },
}

console.log(presentation)
