import * as React from "react";
import GridProvider from "../components/GridProvider";
import AuthSync from "../components/AuthSync";
import '../styles/ui-layout.css'

const CanvasGridPageWrapped = () => {
    return (
        <AuthSync>
            <div className='ui-layout'>
                <GridProvider/>

            </div>
        </AuthSync>
    )
}

export default CanvasGridPageWrapped
