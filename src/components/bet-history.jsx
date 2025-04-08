import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Badge} from "react-bootstrap";
import {loadHistory} from "../store/actions/userActions";
import {fetchDataFromServer, formatDate} from "../utils";

const THEME = {
    won: {
        color: 'success',
        text: 'Won',
    },
    lost: {
        color: 'danger',
        text: 'Lost',
    },
    open: {
        color: 'secondary',
        text: 'Open',
    },
}

const Status = ({status}) => {
    const {color, text} = THEME[status];
    return (
        <Badge bg={color}>{text}</Badge>
    );
}

export const BetHistory = () => {
    const dispatch = useDispatch();
    const {history} = useSelector((state) => state.user);

    useEffect(() => {
        if (history.length === 0) {
            const getHistory = async () => {
                const fetchedHistory = await fetchDataFromServer("/data/bet-history.json");
                if (fetchedHistory.length > 0) {
                    dispatch(loadHistory(fetchedHistory));
                }
            };
            getHistory();
        }
    }, [dispatch, history]);

    if (history.length === 0) {
        return <p>Loading bets...</p>;
    }

    return (
        <div>
            <h3>My Bet History</h3>
            <Container>
                {history.map((bet) => (
                    <div key={bet.id} className="border p-3 my-2">
                        <div className="fw-bold"><Status status={bet.status}/> {bet.description}</div>
                        <div>{bet.marketName}</div>
                        <div><small className="text-muted">{bet.eventName}</small></div>
                        <div><small className="text-muted">{formatDate(bet.eventDate)}</small></div>
                        <div>Odds: {parseFloat(bet.odds).toFixed(2)}</div>
                        <div>Stake: ${parseFloat(bet.stake).toFixed(2)}</div>
                        <div><strong>Potential returns: ${parseFloat(bet.potentialReturns).toFixed(2)}</strong></div>
                    </div>
                ))}
            </Container>
        </div>
    );
};
