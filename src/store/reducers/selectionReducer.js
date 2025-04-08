import {LOAD_SELECTION} from '../actions/selectionActions';

const initialState = {
    selections: {},
};

export const selectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SELECTION:
            return {
                ...state,
                selections: {
                    ...state.selections,
                    [action.payload.id]: action.payload,
                }
            };
        default:
            return state;
    }
};
