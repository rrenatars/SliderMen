enum SelectionActions {
    CHANGE_SELECTED_SLIDE = 'CHANGE_SELECTED_SLIDE',
    CHANGE_SELECTED_OBJECT = 'CHANGE_SELECTED_OBJECT',
}

type ChangeSelectedSlideAction = {
    type: SelectionActions.CHANGE_SELECTED_SLIDE
    payload: string
}

type ChangeSelectedObjectAction = {
    type: SelectionActions.CHANGE_SELECTED_OBJECT
    payload: string
}

type SelectionActionsType =
    | ChangeSelectedSlideAction
    | ChangeSelectedObjectAction

export { SelectionActions, type SelectionActionsType }
