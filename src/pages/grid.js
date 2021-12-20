import * as React from "react";
import GridProvider from "../components/GridProvider";
import AuthSync from "../components/AuthSync";
import BottomButtons from "../components/BottomButtons";

const CanvasGridPageWrapped = () => {
    return (
        <AuthSync>
            <GridProvider/>
            <BottomButtons/>
        </AuthSync>
    )
}

export default CanvasGridPageWrapped
