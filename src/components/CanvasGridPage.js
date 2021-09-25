import * as React from "react";
import CanvasGrid from "../components/CanvasGrid";
import {useState} from "react";
import {frameModHandler} from "../utils/FrameModHandler";
import {getLongestRow} from "../utils/GetLongestRow";
import {coordinatesBtn} from "../styles/grid.module.css"

const getNullCoords = () => new Array(2).fill(null)

let nextHover = getNullCoords()
let currentHover = getNullCoords()
let firstClick = getNullCoords()

const CanvasGridPage = props => {
    const apolloGrid = props.initialgrid
    const [areCoordinatesToDisplay, setAreCoordinatesToDisplay] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    const isCell = ([x, y]) => {
        if (y <= apolloGrid.length - 1){
            return x <= apolloGrid[y].length - 1;
        }
    }

    const toggleDisplayCoordinates = () => {
        setAreCoordinatesToDisplay(!areCoordinatesToDisplay)
    }

    const getBounding = (e) => e.target.getBoundingClientRect()
    const getWidth = (e) => e.target.width
    const deepClone = value => JSON.stringify(value)


    const getCoordinates = (e) => {
        const width = getWidth(e)
        let cellWidth;
        let cellHeight;
        cellWidth = cellHeight = width/getLongestRow(apolloGrid)
        const rect = getBounding(e)
        const x = Math.floor((e.clientX - rect.left)/cellWidth)
        const y = Math.floor((e.clientY - rect.top)/cellHeight)
        return [x,y]
    }

    const calculateWhichCellClicked = e => {
        if(isCell(getCoordinates(e))){
            firstClick = getCoordinates(e)
        }
    }

    const calculateWhichCellHovered = e => {
        if (!isClicked){
            return
        }
        currentHover = getCoordinates(e)
        const isAlreadyClicked = deepClone(currentHover) === deepClone(firstClick)
        const isAlreadyHovered = deepClone(currentHover) === deepClone(nextHover)
        if(!isAlreadyClicked && !isAlreadyHovered){
            console.log(`nextHover: ${nextHover}`)
            nextHover = getCoordinates(e)
            frameModHandler(apolloGrid, nextHover)
        }
    }

    const changeCellState = e => {
        setIsClicked(true)
        calculateWhichCellClicked(e)
        frameModHandler(apolloGrid, firstClick)
    }

    const endStroke = () => setIsClicked(false)

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
                onMouseUp={endStroke}
                onMouseDown={changeCellState}
                onMouseMove={calculateWhichCellHovered}
                onMouseOut={endStroke}
            />
        </div>
    )
}

export default CanvasGridPage
