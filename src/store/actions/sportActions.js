export const LOAD_SPORTS = 'LOAD_SPORTS';
export const LOAD_SPORT = 'LOAD_SPORT';

export const loadSports = (payload) => ({
    type: LOAD_SPORTS,
    payload,
});

export const loadSport = (sportId, coupons) => ({
    type: LOAD_SPORT,
    payload: {sportId, coupons},
});

