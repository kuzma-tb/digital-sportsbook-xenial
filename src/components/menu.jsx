import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
import {loadSports} from "../store/actions/sportActions";
import {fetchDataFromServer} from "../utils";

export const Menu = () => {
    const dispatch = useDispatch();
    const {sports} = useSelector((state) => state.sport);

    useEffect(() => {
        if (sports.length === 0) {
            const getSports = async () => {
                const fetchedSports = await fetchDataFromServer('/data/sports.json');
                dispatch(loadSports(fetchedSports));
            };
            getSports();
        }
    }, [dispatch, sports]);

    if (sports.length === 0) {
        return <div>Loading sports...</div>;
    }

    return (
        <Nav defaultActiveKey="/" className="flex-column">
            {sports.map((sport) => (
                <Nav.Link key={sport.id} as={Link} to={`/${sport.id}`} className="p-2">
                    {sport.title}
                </Nav.Link>
            ))}
        </Nav>
    );
};
