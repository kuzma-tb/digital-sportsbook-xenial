import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Alert, Button, Container, Form, Row, Col} from "react-bootstrap";
import {clearSelections, updateSelection} from "../store/actions/userActions";
import {formatDate, fetchDataFromServer} from "../utils";
import {useUser} from "../hooks";

export const Betslip = () => {
    const {updateBalance} = useUser();
    const dispatch = useDispatch();
    const {selections} = useSelector((state) => state.user);
    const [totalStake, setTotalStake] = useState(0);
    const [isPlaced, setIsPlaced] = useState(false);

    const submitBetslip = async () => {
        const placeBet = async () => {
            const response = await fetchDataFromServer('/data/place-bet.json', selections);
            if (response.status === 'OK') {
                dispatch(clearSelections());
                updateBalance(-totalStake);
                setIsPlaced(true);
            }
        };
        placeBet();
    }

    const handleChange = ({target: {value}}, selectionId) => {
        const stake = !value ? 0 : parseFloat(value);
        dispatch(updateSelection({selectionId, stake}));
    };

    const handleReset = () => {
        dispatch(clearSelections());
    };

    useEffect(() => {
        if (selections.length > 0) {
            setTotalStake(selections.reduce((acc, {stake}) => acc + stake, 0));
        } else if (totalStake > 0) {
            setTotalStake(0);
        }
    }, [selections, setTotalStake, totalStake]);

    useEffect(() => {
        let timeout;
        if (isPlaced) {
            timeout = setTimeout(() => setIsPlaced(false), 3000);
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [isPlaced]);

    return (
        <Form onSubmit={e => e.preventDefault()}>
            <h3>Betslip</h3>
            {isPlaced ? <Alert variant="success">Bet has been placed.</Alert> : (selections.length === 0 &&
                <div>Betslip is empty.</div>)}
            {selections.map(({eventDate, eventName, marketName, selection: {id: selectionId, odds, description}, stake}) => (
                <Container key={selectionId} className="mt-2 p-2 bg-light rounded">
                    <div className="fs-6 fw-bold">{description}</div>
                    <div><small><strong>{marketName}</strong></small></div>
                    <div><small>Odds: <strong>{odds}</strong></small></div>
                    <div><small className="text-muted">{eventName}</small></div>
                    <div><small className="text-muted">{formatDate(eventDate)}</small></div>
                    <Row>
                        <Col sm="3" className="d-flex align-items-center">
                            <small>Stake:</small>
                        </Col>
                        <Col sm="7">
                            <Form.Control type="number" onChange={(event) => handleChange(event, selectionId)}
                                          value={stake} placeholder="Enter a stake"/>
                        </Col>
                    </Row>
                    {stake > 0 && <div className="mt-3 border-top pt-2"><small>Potential
                        Return: <strong>${parseFloat(stake * odds).toFixed(2)}</strong></small></div>}
                </Container>
            ))}
            <div className="d-flex mt-2">
                <Button className="flex-grow-1 m-1" variant="primary" type="submit" onClick={submitBetslip}
                        disabled={isPlaced || totalStake === 0}>Place a bet</Button>
                <Button className="flex-grow-1 m-1" variant="secondary" onClick={handleReset}
                        disabled={selections.length === 0}>Clear Betslip</Button>
            </div>
        </Form>
    )
};
