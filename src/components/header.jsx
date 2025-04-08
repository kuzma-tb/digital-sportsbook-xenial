import React from 'react';
import {Container, Row, Col, Navbar, Nav} from 'react-bootstrap';
import {useUser} from "../hooks";

export const Header = () => {
    const {user} = useUser();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Row className="w-100">
                    <Col className="d-flex align-items-center" sm={6}>
                        <Navbar.Brand href="/">Home task</Navbar.Brand>
                    </Col>

                    <Col className="d-flex justify-content-end" sm={6}>
                        <Nav>
                            <Nav.Item className="text-warning p-2">
                                ${parseFloat(user.balance).toFixed(2)}
                            </Nav.Item>
                            <Nav.Item className="text-white p-2">
                                <strong>{user.login}</strong>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};
