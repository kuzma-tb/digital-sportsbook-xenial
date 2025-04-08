import React from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";

export const Coupons = ({coupons, sportId}) => {
    if (coupons.length === 0) {
        return <div>Loading coupons...</div>;
    }

    return (
        <Container>
            {coupons.map((coupon) => (
                <Row key={coupon.id} className="border p-2 my-2">
                    <Col>
                        <Link to={`/${sportId}/${coupon.id}`}
                              className="d-flex justify-content-between text-decoration-none">
                            <span className="fw-bold">{coupon.name}</span>
                            <span className="text-muted">{coupon.eventsCount} events</span>
                        </Link>
                    </Col>
                </Row>
            ))}
        </Container>
    );
};
