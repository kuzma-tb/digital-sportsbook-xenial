import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {loadSport} from "../store/actions/sportActions";
import {fetchDataFromServer} from "../utils";
import {Coupons} from "../components";

export const SportPage = () => {
    const {sportId} = useParams();
    const dispatch = useDispatch();
    const {sports, coupons} = useSelector((state) => state.sport);
    const sport = sports.find((sport) => sport.id.toString() === sportId);

    useEffect(() => {
        if (!coupons[sportId]) {
            const getCoupons = async () => {
                const fetchedCoupons = await fetchDataFromServer(`/data/sport/${sportId}.json`);
                if (fetchedCoupons) {
                    dispatch(loadSport(sportId, fetchedCoupons));
                }
            };
            getCoupons();
        }
    }, [dispatch, sportId, coupons]);

    if (!sport) return <div>Sport not found</div>;

    return (
        <div>
            <h1>{sport.name}</h1>
            <Coupons coupons={coupons[sportId] || []} sportId={sportId}/>
        </div>
    );
};
