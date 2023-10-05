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
    value: "In today's fast-paced world, technology plays a pivotal role in shaping our lives. From the smartphones we carry in our pockets to the complex algorithms that power our favorite online services, innovation is all around us. However, as we embrace these advancements, it's essential to strike a balance between progress and human values.\n" +
        "\n" +
        "One of the most profound technological shifts of recent years has been the rise of artificial intelligence (AI). AI systems, like the one you're interacting with right now, are becoming increasingly capable of understanding and generating human-like text. They can assist with tasks ranging from language translation to medical diagnosis, revolutionizing various industries.\n" +
        "\n" +
        "Yet, this progress also raises important questions. How do we ensure that AI technologies are used ethically? How do we protect against bias and discrimination in AI algorithms? These are challenges that demand careful consideration and responsible development.\n" +
        "\n" +
        "Beyond AI, our planet faces pressing environmental issues. Climate change, deforestation, and plastic pollution threaten the very ecosystems that sustain life. Addressing these challenges requires global cooperation and a commitment to sustainable practices. Each of us can make a difference through our choices, whether it's reducing our carbon footprint or supporting conservation efforts.\n" +
        "\n" +
        "In the realm of healthcare, breakthroughs continue to improve our well-being. Vaccines have been developed at unprecedented speed to combat global health threats like the COVID-19 pandemic. Medical research is advancing, offering hope for previously untreatable conditions. As patients, we must advocate for our health and be informed advocates for our loved ones.\n" +
        "\n" +
        "Education is another vital aspect of our lives. The way we learn is evolving, with online courses and digital resources opening up new opportunities. Lifelong learning is increasingly essential in a rapidly changing job market. Embracing education can empower individuals and boost economies.\n" +
        "\n" +
        "Cultural diversity enriches our world. It's a source of art, music, cuisine, and traditions that make life more vibrant. Celebrating different cultures fosters understanding and promotes tolerance. In a world that sometimes seems divided, embracing diversity can bridge gaps and build connections.\n" +
        "\n" +
        "In conclusion, we live in a time of great promise and complex challenges. Technology, environmental issues, healthcare, education, and diversity are all intertwined in the fabric of our lives. How we navigate these issues will define our future. Let us remember the importance of responsible innovation, environmental stewardship, health advocacy, lifelong learning, and the celebration of our diverse global community as we shape the path forward.",
    color: color,
    fontSize: 10,
    fontFamily: "oxygen",
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
    base64: "0J/RgNC40LLQtdGC",
    type: types_1.ObjectType.IMAGE,
};
const background = {
    color: color,
    base64: "0J/RgNC40LLQtdGC",
};
const slide = {
    id: "slide",
    objects: [textBlock, primitive, image],
    background: background,
};
const slide1 = {
    id: "slide1",
    objects: [textBlock, primitive, image],
    background: background,
};
const slide2 = {
    id: "slide2",
    objects: [textBlock, primitive, image],
    background: background,
};
const history = {
    events: ["reset", "delete", "copy"],
};
const presentation = {
    id: "presentation1",
    name: "Моя презентация",
    history: history,
    slides: [slide, slide1, slide2],
    selection: {
        slideId: "1",
        objectId: "1",
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
