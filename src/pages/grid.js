import * as React from "react";
import GridProvider from "../components/GridProvider";
import AuthSync from "../components/AuthSync";
import BottomButtons from "../components/BottomButtons";
import '../styles/ui-layout.css'
import PlayControl from "../components/PlayControl";
import PatternControl from "../components/PatternControl";
import ReplayControl from "../components/ReplayControl";
import SideButtons from "../components/SideButtons";

const CanvasGridPageWrapped = () => {
    return (
        <AuthSync>
            <div className='ui-layout'>
                <PlayControl/>
                <GridProvider/>
                <PatternControl/>
                <ReplayControl/>
                <SideButtons/>
                <BottomButtons/>
            </div>
        </AuthSync>
    )
}

export default CanvasGridPageWrapped
