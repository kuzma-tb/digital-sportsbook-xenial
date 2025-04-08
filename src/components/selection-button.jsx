import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {loadSelection} from "../store/actions/selectionActions";
import {addSelection} from "../store/actions/userActions";
import {fetchDataFromServer} from "../utils";

export const SelectionButton = ({eventDate, eventName, marketName, selectionId, showDescription = false, ...other}) => {
    const dispatch = useDispatch();
    const selection = useSelector((state) => state.selection).selections[selectionId];
    const {selections: userSelections} = useSelector((state) => state.user);
    const isSelected = userSelections.findIndex(s => s.selection.id === selectionId) > -1;

    const handleClick = () => {
        if (isSelected) {
            return;
        }
        dispatch(addSelection({eventDate, eventName, marketName, selection}));
    }

    useEffect(() => {
        const getSelection = async () => {
            const fetchedSelection = await fetchDataFromServer(`/data/selection/${selectionId}.json`);
            if (fetchedSelection) {
                dispatch(loadSelection(fetchedSelection));
            }
        };

        if (!selection) {
            getSelection();
        }

    }, [dispatch, selection, selectionId]);

    if (!selection) {
        return <div>Loading selection...</div>;
    }

    return (
        <Button {...other} variant={isSelected ? "primary" : "secondary"} onClick={handleClick}>
            {showDescription ? <span className="opacity-75 mx-2">{selection.description}</span> : ''}
            {parseFloat(selection.odds).toFixed(2)}
        </Button>
    );
};