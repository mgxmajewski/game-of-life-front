import * as React from "react";
import CanvasGrid from "../components/CanvasGrid";
import {useEffect, useState} from "react";
import {frameModHandler} from "../utils/FrameModHandler";
import {getLongestRow} from "../utils/GetLongestRow";
import {coordinatesBtn} from "../styles/grid.module.css"

const CanvasGridPage = props => {
    const apolloGrid = props.initialgrid
    const mutateGrid = props.setter
    const [cell, setCell] = useState("")
    const [isModified, setIsModified] = useState(false)
    const [areCoordinatesToDisplay, setAreCoordinatesToDisplay] = useState(false)
    const [gridState, setGridState] = useState(apolloGrid)

    // Add handler to flip state of the cell (to work from the first click)
    useEffect(()=> {
        setGridState(frameModHandler(apolloGrid,mutateGrid, cell))
    }, [isModified])

    const isCell = (x, y) => {
        if (y <= gridState.length - 1){
            return x <= gridState[y].length - 1;
        }
    }

    const toggleDisplayCoordinates = () => {
        setAreCoordinatesToDisplay(!areCoordinatesToDisplay)
        console.log(areCoordinatesToDisplay)
    }

    const calculateWhichCellClicked = e => {
        const width = e.target.width
        const gridStateToGet = gridState
        let cellWidth;
        let cellHeight;
        cellWidth = cellHeight = width/getLongestRow(gridStateToGet)
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
        const x = coordinates[0]
        const y = coordinates[1]
        setIsModified(!isModified)
        setCell(`${y},${x},${isModified}`)
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
