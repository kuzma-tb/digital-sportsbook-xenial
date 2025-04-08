import {
    ADD_SELECTION,
    CLEAR_SELECTIONS,
    UPDATE_SELECTION,
    REMOVE_SELECTION,
    LOAD_HISTORY
} from '../actions/userActions';

const initialState = {
    selections: [],
    history: [],
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SELECTION:
            return {
                ...state,
                selections: [
                    ...state.selections,
                    {
                        selection: action.payload.selection,
                        eventDate: action.payload.eventDate,
                        eventName: action.payload.eventName,
                        marketName: action.payload.marketName,
                        stake: 0,
                    },
                ],
            };
        case UPDATE_SELECTION:
            return {
                ...state,
                selections: state.selections.map((selection) => {
                    if (selection.selection.id === action.payload.selectionId) {
                        selection.stake = action.payload.stake;
                    }
                    return selection;
                }),
            };
        case REMOVE_SELECTION:
            return {
                ...state,
                selections: state.selections.filter(
                    (sel) => sel.selection.id !== action.payload.selectionId
                ),
            };
        case CLEAR_SELECTIONS:
            return {
                ...state,
                selections: [],
            };
        case LOAD_HISTORY:
            return {
                ...state,
                history: action.payload,
            };
        default:
            return state;
    }
};
