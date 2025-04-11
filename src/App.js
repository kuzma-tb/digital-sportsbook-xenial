import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { OddsWebSocketListener } from "./websockets/OddsWebSocketListener";

import {UserProvider} from "./contexts/UserContext";
import {Menu, Header, Sidebar} from './components';
import {HomePage} from "./pages/home-page";
import {SportPage} from "./pages/sport-page";
import {CouponPage} from "./pages/coupon-page";
import {EventPage} from "./pages/event-page";
import {NotFoundPage} from "./pages/404";

function App() {
    return (
        <Router>
            <UserProvider>
                {/* Listen globally WS */}
                <OddsWebSocketListener />
                <Header/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-2 p-2">
                            <Menu/>
                        </div>
                        <div className="col-7 p-2">
                            <div className="container py-4">
                                <Routes>
                                    <Route path="/" element={<HomePage/>}/>
                                    <Route exact path="/:sportId" element={<SportPage/>}/>
                                    <Route exact path="/:sportId/event/:eventId" element={<EventPage/>}/>
                                    <Route exact path="/:sportId/:couponId" element={<CouponPage/>}/>
                                    <Route element={<NotFoundPage/>}/>
                                </Routes>
                            </div>
                        </div>
                        <div className="col-3 p-2">
                            <Sidebar/>
                        </div>
                    </div>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;
