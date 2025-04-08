import {combineReducers} from 'redux';
import {couponReducer} from './couponReducer';
import {eventReducer} from './eventReducer';
import {selectionReducer} from './selectionReducer';
import {sportReducer} from './sportReducer';
import {userReducer} from './userReducer';

const rootReducer = combineReducers({
    coupon: couponReducer,
    event: eventReducer,
    selection: selectionReducer,
    sport: sportReducer,
    user: userReducer,
});

export default rootReducer;
