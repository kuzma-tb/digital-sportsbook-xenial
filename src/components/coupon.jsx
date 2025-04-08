import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import {loadCoupon} from "../store/actions/couponActions";
import {loadEvent} from "../store/actions/eventActions";
import {fetchDataFromServer, formatDate} from "../utils";
import {SelectionButton} from "../components";

const CouponHeader = ({eventId}) => {
    const event = useSelector((state) => state.event.events[eventId]);

    if (!event) {
        return <div>Loading header...</div>;
    }

    return (
        <Row>
            <Col md={4}></Col>
            <Col md={6}>
                <Row>
                    {event.markets.map(({id: marketId, name}) => (
                        <Col key={marketId} md={6} className="px-1 text-center"><small>{name}</small></Col>
                    ))}
                </Row>
            </Col>
            <Col md={2}></Col>
        </Row>
    );
}

const CouponItem = ({eventId}) => {
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.events[eventId]);

    useEffect(() => {
        if (!event) {
            const getEvent = async () => {
                const fetchedEvent = await fetchDataFromServer(`/data/event/${eventId}.json`);
                if (fetchedEvent) {
                    dispatch(loadEvent(fetchedEvent));
                }
            };
            getEvent();
        }
    }, [dispatch, eventId, event]);

    if (!event) {
        return <div>Loading event...</div>;
    }

    return (
        <Row className="my-2 align-items-center">
            <Col md={4}>
                <Link to={`/${event.category}/event/${eventId}`} className="fw-bold">{event.name}</Link>
                <br/>
                <small className="text-muted">{formatDate(event.date)}</small>
            </Col>
            <Col md={6}>
                <div className="d-flex">
                    {event.markets.slice(0, 3).map((market) => (
                            <div key={market.id} className="d-flex flex-grow-1 px-1">
                                {market.selections.slice(0, 2).map((selectionId) => (
                                    <SelectionButton className="flex-grow-1 mx-1"
                                                     eventDate={event.date}
                                                     eventName={event.name}
                                                     marketName={market.name}
                                                     key={selectionId}
                                                     selectionId={selectionId}/>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </Col>
            <Col md={2} className="text-center fw-bold">
                {event.markets.length}
            </Col>
        </Row>
    )
}

export const Coupon = ({couponId}) => {
    const dispatch = useDispatch();
    const coupon = useSelector((state) => state.coupon.coupons[couponId]);

    useEffect(() => {
        if (!coupon) {
            const getCoupon = async () => {
                const fetchedCoupon = await fetchDataFromServer(`/data/coupon/${couponId}.json`);
                if (fetchedCoupon) {
                    dispatch(loadCoupon(fetchedCoupon));
                }
            };
            getCoupon();
        }
    }, [dispatch, couponId, coupon]);

    if (!coupon) {
        return <div>Loading coupon...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="h4 mb-3">{coupon.name}</h2>
            <Container className="border p-3 my-2">
                <CouponHeader eventId={coupon.events[0]}/>
                {coupon.events.map((eventId) => (
                    <CouponItem eventId={eventId} key={eventId}/>
                ))}
            </Container>
        </div>
    );
};
