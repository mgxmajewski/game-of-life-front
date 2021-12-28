import * as React from "react";
import CanvasGrid from "../components/CanvasGrid";
import {useState} from "react";
import {mutateGridState} from "../utils/MutateGridState";
import {getLongestDimension} from "../utils/GetLongestDimension";
import {golWrapper, coordinatesBtn, canvasWrapper} from "../styles/grid.module.css"
import PropTypes from "prop-types";
import {useReactiveVar} from "@apollo/client";
import {authenticatedToken, showCoordinates} from "../utils/cache";
import AuthSync from "../components/AuthSync";
import BottomButtons from "../components/BottomButtons";
import '../styles/ui-layout.css'
import PlayControl from "../components/PlayControl";
import PatternControl from "../components/PatternControl";
import ReplayControl from "../components/ReplayControl";
import SideButtons from "../components/SideButtons";

const getNullCoords = () => new Array(2).fill(null)

let nextHover = getNullCoords()
let currentHover = getNullCoords()
let firstClick = getNullCoords()

const CanvasGridPage = props => {

    const currentToken = useReactiveVar(authenticatedToken)
    const apolloGrid = props.initialgrid
    const areCoordinatesToDisplay = useReactiveVar(showCoordinates)
    const [isClicked, setIsClicked] = useState(false)
    const [rowsAffected, setRowsAffected] = useState(5)
    const [columnsAffected, setColumnsAffected] = useState(5)


    const isCell = ([x, y]) => {
        if (apolloGrid[y] === undefined) {
            return
        }
        if (y <= apolloGrid.length - 1) {
            return x <= apolloGrid[y].length - 1;
        }
    }

    const getBounding = (e) => e.target.getBoundingClientRect()
    const getWidth = (e) => e.target.width
    const deepClone = value => JSON.stringify(value)

    const getCoordinates = (e) => {
        const width = getWidth(e)
        let cellWidth;
        let cellHeight;
        let longestDimension = getLongestDimension(apolloGrid)
        cellWidth = cellHeight = width / longestDimension
        const rect = getBounding(e)
        const x = Math.floor((e.clientX - rect.left) / cellWidth)
        const y = Math.floor((e.clientY - rect.top) / cellHeight)
        console.log(`x: ` + x);
        console.log(`y: ` + y);
        return [x, y]
    }

    const calculateWhichCellClicked = e => {
        if (isCell(getCoordinates(e))) {
            firstClick = getCoordinates(e)
        }
    }

    const calculateWhichCellHovered = e => {
        if (!isClicked) {
            return
        }
        currentHover = getCoordinates(e)
        const isAlreadyClicked = deepClone(currentHover) === deepClone(firstClick)
        const isAlreadyHovered = deepClone(currentHover) === deepClone(nextHover)
        if (!isAlreadyClicked && !isAlreadyHovered) {
            firstClick = []
            console.log(`nextHover: ${nextHover}`)
            nextHover = getCoordinates(e)
            mutateGridState('mutate-grid/', currentToken, apolloGrid, nextHover)
        }
    }

    const changeCellState = e => {
        setIsClicked(true)
        calculateWhichCellClicked(e)
        mutateGridState('mutate-grid/', currentToken, apolloGrid, firstClick)
    }

    const changeSizeHandler = (e, routeString, numOfAffected) => {
        e.preventDefault();
        mutateGridState(`${routeString}/${numOfAffected}`, currentToken, apolloGrid)
    }

    const playGridHandler = (e, routeString) => {
        e.preventDefault();
         mutateGridState(`${routeString}`, currentToken)
    }

    const endStroke = () => setIsClicked(false)

    return (
        <>
            <PlayControl
                playGridHandler={playGridHandler}
            />
            <PatternControl/>
            <ReplayControl/>
            <SideButtons
                changeSizeHandler={changeSizeHandler}
                rowsAffected={rowsAffected}
                setRowsAffected={setRowsAffected}
            />
            <BottomButtons
                changeSizeHandler={changeSizeHandler}
                columnsAffected={columnsAffected}
                setColumnsAffected={setColumnsAffected}
            />
            <div className={golWrapper}>
                <CanvasGrid
                    state={apolloGrid}
                    coordinates={areCoordinatesToDisplay.toString()}
                    onMouseUp={endStroke}
                    onMouseDown={changeCellState}
                    onMouseMove={calculateWhichCellHovered}
                    onMouseOut={endStroke}
                />
            </div>
        </>
    )
}

CanvasGridPage.propTypes = {
    initialgrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default CanvasGridPage
