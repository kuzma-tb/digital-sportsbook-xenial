import React from "react";
import {formatDate} from "../utils";

export const Scoreboard = ({name, date}) => {
    return (
        <div className="p-4 bg-light rounded text-center">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-600">{formatDate(date)}</p>
        </div>
    );
};