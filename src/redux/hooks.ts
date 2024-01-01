import { rootReducer } from './reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import * as ActionCreators from './actionCreator'
import { bindActionCreators } from 'redux'

type RootState = ReturnType<typeof rootReducer>
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useAppActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(ActionCreators, dispatch)
}

export { useAppSelector, useAppActions }
