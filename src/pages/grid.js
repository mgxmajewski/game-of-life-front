import * as React from "react";
import CanvasGridPage from "../components/CanvasGridPage";
import GridProvider from "../utils/GridProvider";


const CanvasGridPageWrapped = () => {
    // console.log(props)
    return (
        <GridProvider>
            <CanvasGridPage/>
        </GridProvider>

    )
}

export default CanvasGridPageWrapped
