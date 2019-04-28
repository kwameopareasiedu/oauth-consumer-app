import React from "react";
import { Redirect } from "react-router-dom";

export default function Base() {
    return <Redirect to="/main/dashboard" />;
}
