import * as React from "react";
import GridProvider from "../components/GridProvider";
import {isLoggedIn} from "../utils/LoginHandler";
import {navigate} from "gatsby";

const CanvasGridPageWrapped = () => {
        if (!isLoggedIn()) {
            navigate(`/sign-in`)
        }
    return (
        <GridProvider/>
    )
}

export default CanvasGridPageWrapped
