import {LOAD_COUPON} from '../actions/couponActions';

const initialState = {
    coupons: {},
};

export const couponReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COUPON:
            return {
                ...state,
                coupons: {
                    ...state.coupons,
                    [action.payload.id]: action.payload,
                },
            };

        default:
            return state;
    }
};
