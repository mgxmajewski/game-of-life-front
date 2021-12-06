import * as React from "react";
import GridProvider from "../components/GridProvider";
import AuthSync from "../components/AuthSync";

const CanvasGridPageWrapped = () => {
    return (
        <AuthSync>
            <GridProvider/>
        </AuthSync>
    )
}

export default CanvasGridPageWrapped
