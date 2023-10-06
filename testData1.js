"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const history = {
    events: [],
};
const presentation = {
    id: `presentation1`,
    name: `Моя презентация`,
    history: history,
    slides: [],
    selection: {
        slideId: `12`,
    },
};
console.log(`Presentation: `, presentation);
