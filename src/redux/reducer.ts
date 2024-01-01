import { combineReducers } from 'redux'
import { NameActions, NameActionsType } from './name'
import { emptyPresentation, presentation } from '../testData3'
import { Selection, Slide } from '../types'
import { SlideActionsType, SlidesActions } from './slides'
import { createNewSlide } from '../tools'
import { SelectionActions, SelectionActionsType } from './selection'

const initName = presentation.name

const titleReducer = (state: string = initName, action: NameActionsType) => {
    switch (action.type) {
        case NameActions.CHANGE_NAME:
            return action.payload
        default:
            return state
    }
}

const initSlides = emptyPresentation.slides

const slidesReducer = (
    state: Slide[] = initSlides,
    action: SlideActionsType,
) => {
    switch (action.type) {
        case SlidesActions.ADD_SLIDE:
            return [...state, createNewSlide()]
        case SlidesActions.REMOVE_SLIDE:
            return state.filter((slide) => slide.id !== action.payload)
        case SlidesActions.CHANGE_ORDER_SLIDES:
            return action.payload
        case SlidesActions.SET_SLIDES:
            return action.payload
        case SlidesActions.ADD_OBJECT:
            return state.map((slide) => {
                if (slide.id === action.payload.slideId) {
                    slide.objects.push(action.payload.object)
                }
                return slide
            })
        case SlidesActions.DELETE_OBJECT:
            return state.map((slide) => {
                if (slide.id === action.payload.slideId) {
                    return {
                        ...slide,
                        objects: slide.objects.filter(
                            (obj) => obj.id !== action.payload.objectId,
                        ),
                    }
                }
                return slide
            })
        case SlidesActions.CHANGE_OBJECT:
            return state.map((slide) => {
                if (slide.id == action.payload.slideId) {
                    const newObjects = slide.objects.map((object) => {
                        if (action.payload.objectId == object.id) {
                            return {
                                ...object,
                                ...action.payload.newObjectData,
                            }
                        }
                        return object
                    })
                    return {
                        ...slide,
                        objects: newObjects,
                    }
                }
                return slide
            })
        case SlidesActions.CHANGE_BACKGROUND:
            return state.map((slide) => {
                if (slide.id === action.payload.slideId) {
                    return {
                        ...slide,
                        background: action.payload.background,
                    }
                }
                return slide
            })
        default:
            return state
    }
}

const initSelection: Selection = {
    slideId: emptyPresentation.slides[0].id,
    objectId: '',
}

const selectionReducer = (
    state: Selection = initSelection,
    action: SelectionActionsType,
) => {
    switch (action.type) {
        case SelectionActions.CHANGE_SELECTED_SLIDE:
            return { ...state, slideId: action.payload }
        case SelectionActions.CHANGE_SELECTED_OBJECT:
            return { ...state, objectId: action.payload }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    title: titleReducer,
    slides: slidesReducer,
    selection: selectionReducer,
})

export { rootReducer }
