import React from "react";
import {Tabs, Tab} from "react-bootstrap";
import {UserProvider} from "../contexts/UserContext";
import {BetHistory, Betslip} from '../components';

export const Sidebar = () => {
    return (
        <UserProvider>
            <Tabs defaultActiveKey="betslip" id="tabs" className="mb-3">
                <Tab eventKey="betslip" title="Betslip">
                    <Betslip/>
                </Tab>
                <Tab eventKey="myBets" title="My Bets">
                    <BetHistory/>
                </Tab>
            </Tabs>
        </UserProvider>
    )
}