export const ADD_SELECTION = 'ADD_SELECTION';
export const CLEAR_SELECTIONS = 'CLEAR_SELECTIONS';
export const UPDATE_SELECTION = 'UPDATE_SELECTION';
export const LOAD_HISTORY = 'LOAD_HISTORY';

export const addSelection = (payload) => ({
    type: ADD_SELECTION,
    payload,
});

export const updateSelection = (payload) => ({
    type: UPDATE_SELECTION,
    payload,
});

export const clearSelections = () => ({
    type: CLEAR_SELECTIONS,
});

export const loadHistory = (payload) => ({
    type: LOAD_HISTORY,
    payload,
});
