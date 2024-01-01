enum NameActions {
    CHANGE_NAME = 'CHANGE_NAME',
}

type ChangeNameAction = {
    type: NameActions.CHANGE_NAME
    payload: string
}

type NameActionsType = ChangeNameAction

export { NameActions, type NameActionsType }
