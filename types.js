"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Figures = exports.ObjectType = void 0;
var Figures;
(function (Figures) {
    Figures["TRIANGLE"] = "triangle";
    Figures["RECTANGLE"] = "rectangle";
    Figures["CIRCLE"] = "circle";
})(Figures || (exports.Figures = Figures = {}));
var ObjectType;
(function (ObjectType) {
    ObjectType["IMAGE"] = "image";
    ObjectType["TEXTBLOCK"] = "textBlock";
    ObjectType["PRIMITIVE"] = "primitive";
})(ObjectType || (exports.ObjectType = ObjectType = {}));
var image = {
    id: '2',
    coordinates: {
        x: 0,
        y: 0,
    },
    width: 100,
    height: 100,
    base64: '',
    type: ObjectType.IMAGE,
};
var primitive = {
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
};
console.log(image);
console.log(primitive);
