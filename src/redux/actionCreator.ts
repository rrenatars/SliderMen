import { NameActions } from './name'
import { SlidesActions } from './slides'
import { SelectionActions } from './selection'
import { Background, Image, Primitive, Slide, TextBlock } from '../types'

function createChangeNameAction(newTitle: string) {
    return {
        type: NameActions.CHANGE_NAME,
        payload: newTitle,
    }
}

function createAddSlideAction() {
    return {
        type: SlidesActions.ADD_SLIDE,
    }
}

function createRemoveSlideAction(slideId: string) {
    return {
        type: SlidesActions.REMOVE_SLIDE,
        payload: slideId,
    }
}

function createChangeOrderSlidesAction(newSlidesOrder: Slide[]) {
    return {
        type: SlidesActions.CHANGE_ORDER_SLIDES,
        payload: newSlidesOrder,
    }
}

function createChangeSelectedSlideAction(slideId: string) {
    return {
        type: SelectionActions.CHANGE_SELECTED_SLIDE,
        payload: slideId,
    }
}

function createChangeSelectedObjectAction(objectId: string) {
    return {
        type: SelectionActions.CHANGE_SELECTED_OBJECT,
        payload: objectId,
    }
}

function createSetSlidesAction(slides: Slide[]) {
    return {
        type: SlidesActions.SET_SLIDES,
        payload: slides,
    }
}

function createAddObjectAction(
    slideId: string,
    object: TextBlock | Image | Primitive,
) {
    return {
        type: SlidesActions.ADD_OBJECT,
        payload: {
            slideId,
            object,
        },
    }
}

function createDeleteObjectAction(objectId: string, slideId: string) {
    return {
        type: SlidesActions.DELETE_OBJECT,
        payload: {
            objectId,
            slideId,
        },
    }
}

function createChangeObjectAction(
    slideId: string,
    objectId: string,
    newObjectData: object,
) {
    return {
        type: SlidesActions.CHANGE_OBJECT,
        payload: {
            slideId,
            objectId,
            newObjectData,
        },
    }
}

function createChangeBackgroundAction(slideId: string, background: Background) {
    return {
        type: SlidesActions.CHANGE_BACKGROUND,
        payload: {
            slideId,
            background,
        },
    }
}

export {
    createChangeNameAction,
    createAddSlideAction,
    createRemoveSlideAction,
    createChangeOrderSlidesAction,
    createSetSlidesAction,
    createChangeSelectedSlideAction,
    createChangeSelectedObjectAction,
    createAddObjectAction,
    createDeleteObjectAction,
    createChangeObjectAction,
    createChangeBackgroundAction,
}
