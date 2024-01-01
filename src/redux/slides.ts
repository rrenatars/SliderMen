import { Background, Image, Primitive, Slide, TextBlock } from '../types'

enum SlidesActions {
    ADD_SLIDE = 'ADD_SLIDE',
    REMOVE_SLIDE = 'REMOVE_SLIDE',
    CHANGE_ORDER_SLIDES = 'CHANGE_ORDER_SLIDES',
    SET_SLIDES = 'SET_SLIDES',
    ADD_OBJECT = 'ADD_OBJECT',
    DELETE_OBJECT = 'DELETE_OBJECT',
    CHANGE_OBJECT = 'CHANGE_OBJECT',
    CHANGE_BACKGROUND = 'CHANGE_BACKGROUND',
}

type AddSlideAction = {
    type: SlidesActions.ADD_SLIDE
}

type RemoveSlideAction = {
    type: SlidesActions.REMOVE_SLIDE
    payload: string
}

type ChangeOrderSlidesAction = {
    type: SlidesActions.CHANGE_ORDER_SLIDES
    payload: Slide[]
}

type SetSlides = {
    type: SlidesActions.SET_SLIDES
    payload: Slide[]
}

type AddObjectAction = {
    type: SlidesActions.ADD_OBJECT
    payload: {
        object: Primitive | TextBlock | Image
        slideId: string
    }
}

type DeleteObjectAction = {
    type: SlidesActions.DELETE_OBJECT
    payload: {
        objectId: string
        slideId: string
    }
}

type ChangeObjectAction = {
    type: SlidesActions.CHANGE_OBJECT
    payload: {
        slideId: string
        objectId: string
        newObjectData: object
    }
}

type ChangeBackgroundAction = {
    type: SlidesActions.CHANGE_BACKGROUND
    payload: {
        slideId: string
        background: Background
    }
}

type SlideActionsType =
    | AddSlideAction
    | RemoveSlideAction
    | ChangeOrderSlidesAction
    | SetSlides
    | AddObjectAction
    | DeleteObjectAction
    | ChangeObjectAction
    | ChangeBackgroundAction

export { SlidesActions, type SlideActionsType }
