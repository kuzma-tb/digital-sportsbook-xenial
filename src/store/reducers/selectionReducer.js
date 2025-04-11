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
                    // Merge the old selection data with the new one from action.payload
                    [action.payload.id]: {
                        ...(state.selections[action.payload.id] || {}),
                        ...action.payload
                    },
                }
            };
        default:
            return state;
    }
};
