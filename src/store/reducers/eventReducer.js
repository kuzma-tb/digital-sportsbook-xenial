import {LOAD_EVENT} from '../actions/eventActions';

const initialState = {
    events: {},
};

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENT:
            return {
                ...state,
                events: {
                    ...state.events,
                    [action.payload.id]: action.payload,
                }
            };
        default:
            return state;
    }
};
