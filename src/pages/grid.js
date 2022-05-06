import * as React from "react";
import GridProvider from "../components/GridProvider";
import AuthSync from "../components/AuthSync";
import {uiLayout} from'../styles/grid-editor-ui-layout.module.css'
import {gradientBackgroundWithShadowAlter} from"../styles/global.module.css"

const CanvasGridPageWrapped = () => {
    return (
        <AuthSync>
            <div className={`${uiLayout}`}>
                <GridProvider/>
            </div>
        </AuthSync>
    )
}

export default CanvasGridPageWrapped
