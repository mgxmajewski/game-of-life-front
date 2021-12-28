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
    const [rowsAffected, setRowsAffected] = useState(11)
    const [columnsAffected, setColumnsAffected] = useState(12)


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

    const addFirstCol = () => {
        mutateGridState(`add-first-col/`, currentToken, apolloGrid)
    }

    const addLastCol = () => {
        mutateGridState(`add-last-col/`, currentToken, apolloGrid)
    }

    const addFirstRow = () => {
        mutateGridState(`add-first-row/`, currentToken, apolloGrid)
    }
    const addLastRow = () => {
        mutateGridState(`add-last-row/`, currentToken, apolloGrid)
    }


    const deleteFirstCol = () => {
        mutateGridState(`delete-first-col/`, currentToken, apolloGrid)
    }

    const deleteLastCol = () => {
        mutateGridState(`delete-last-col/`, currentToken, apolloGrid)
    }

    const deleteFirstRow = () => {
        mutateGridState(`delete-first-row/`, currentToken, apolloGrid)
    }
    const deleteLastRow = () => {
        mutateGridState(`delete-last-row/`, currentToken, apolloGrid)
    }



    const endStroke = () => setIsClicked(false)

    return (
        <>
            <PlayControl/>
            <PatternControl/>
            <ReplayControl/>
            <SideButtons
                rowsAffected={rowsAffected}
                setRowsAffected={setRowsAffected}
                addFirstRow={addFirstRow}
                addLastRow={addLastRow}
                deleteFirstRow={deleteFirstRow}
                deleteLastRow={deleteLastRow}
            />
            <BottomButtons
                columnsAffected={columnsAffected}
                setColumnsAffected={setColumnsAffected}
                addFirstCol={addFirstCol}
                addLastCol={addLastCol}
                deleteFirstCol={deleteFirstCol}
                deleteLastCol={deleteLastCol}
            />
            <div className={golWrapper}>
                {/*<div className={canvasWrapper}>*/}
                <CanvasGrid
                    state={apolloGrid}
                    coordinates={areCoordinatesToDisplay.toString()}
                    onMouseUp={endStroke}
                    onMouseDown={changeCellState}
                    onMouseMove={calculateWhichCellHovered}
                    onMouseOut={endStroke}
                />

                {/*</div>*/}
            </div>
        </>
    )
}

CanvasGridPage.propTypes = {
    initialgrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default CanvasGridPage
