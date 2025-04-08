import {LOAD_SPORTS, LOAD_SPORT} from '../actions/sportActions';

const initialState = {
    sports: [],
    coupons: {},
};

export const sportReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPORTS:
            return {
                ...state,
                sports: action.payload,
            };
        case LOAD_SPORT:
            return {
                ...state,
                coupons: {
                    ...state.coupons,
                    [action.payload.sportId]: action.payload.coupons,
                }
            };
        default:
            return state;
    }
};
