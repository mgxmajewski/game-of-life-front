import * as React from "react";
import CanvasGrid from "../components/CanvasGrid";
import {useState} from "react";
import {frameModHandler} from "../utils/FrameModHandler";
import {getLongestRow} from "../utils/GetLongestRow";
import {coordinatesBtn} from "../styles/grid.module.css"

const CanvasGridPage = props => {
    const apolloGrid = props.initialgrid
    const [areCoordinatesToDisplay, setAreCoordinatesToDisplay] = useState(false)

    const isCell = (x, y) => {
        if (y <= apolloGrid.length - 1){
            return x <= apolloGrid[y].length - 1;
        }
    }

    const toggleDisplayCoordinates = () => {
        setAreCoordinatesToDisplay(!areCoordinatesToDisplay)
    }

    const calculateWhichCellClicked = e => {
        const width = e.target.width
        let cellWidth;
        let cellHeight;
        cellWidth = cellHeight = width/getLongestRow(apolloGrid)
        const rect = e.target.getBoundingClientRect()
        const x = Math.floor((e.clientX - rect.left)/cellWidth)
        const y = Math.floor((e.clientY - rect.top)/cellHeight)
        if(isCell(x,y)){
            return [x,y]
        }
    }

    const changeCellState = e => {
        e.target.getBoundingClientRect()
        const coordinates = calculateWhichCellClicked(e)
        frameModHandler(apolloGrid, coordinates)
    }

    return (
        <div>
            <button
                className={coordinatesBtn}
                onClick={toggleDisplayCoordinates}
            >
                Show Coordinates
            </button>
            <CanvasGrid
                state={apolloGrid}
                coordinates={areCoordinatesToDisplay.toString()}
                onMouseDown={changeCellState}
            />
        </div>
    )
}

export default CanvasGridPage
