import * as React from "react";
import Layout from "../components/Layout";
import CanvasGrid from "../components/CanvasGrid";
import {dummyState} from "../utils/InitialState";
import {gql, useMutation, useSubscription} from "@apollo/client";
import {useEffect, useState} from "react";
import {frameModHandler} from "../utils/FrameModHandler";
import {getLongestRow} from "../utils/GetLongestRow";
import {coordinatesBtn} from "../styles/grid.module.css"

const GET_STATE = gql`
    subscription {
        states{
            id
            grid
        }
    }
`;

const SET_STATE = gql`
    mutation ($user: String!, $grid:[[String]]!){
        postState(user: $user, grid: $grid)
    }
`;

const CanvasGridPage = () => {
    const [cell, setCell] = useState("")
    const [setStateOfGrid] = useMutation(SET_STATE);
    const [isModified, setIsModified] = useState(false)
    const [areCoordinatesToDisplay, setareCoordinatesToDisplay] = useState(false)

    // Add handler to flip state of the cell (to work from the first click)
    useEffect(()=> {
        frameModHandler(stateOfGrid, setStateOfGrid, cell);
    }, [cell])

    const {loading, error,data} = useSubscription(GET_STATE);

    // Handle subscription loading and error
    if (loading) return <p>Waiting for Server Response</p>
    if (error) return <p>Server Down</p>

    // Handle case when there is no initial state sent by graphQL
    const graphQLInitialData = data.states[data.states.length-1]
    const isGraphQlDefined = graphQLInitialData !== undefined
    const stateOfGrid = isGraphQlDefined ? graphQLInitialData.grid : dummyState


    const isCell = (x, y) => {
        if (y <= stateOfGrid.length - 1){
            return x <= stateOfGrid[y].length - 1;
        }
    }

    const toggleDisplayCoordinates = () => {
        console.log(areCoordinatesToDisplay)
        setareCoordinatesToDisplay(!areCoordinatesToDisplay)
    }

    const calculateWhichCellClicked = e => {
        const width = e.target.width
        const gridState = stateOfGrid
        let cellWidth;
        let cellHeight;
        cellWidth = cellHeight = width/getLongestRow(gridState)
        const rect = e.target.getBoundingClientRect()
        const x = Math.floor((e.clientX - rect.left)/cellWidth)
        const y = Math.floor((e.clientY - rect.top)/cellHeight)
        if(isCell(x,y)){
            return [x,y]
        }
    }

    const changeCellState = e => {
        const coordinates = calculateWhichCellClicked(e)
        if (coordinates) {
            const x = coordinates[0]
            const y = coordinates[1]
            setIsModified(!isModified)
            setCell(`${y},${x},${isModified}`)
        }
    }

    return (
        <Layout>
            <div>
                <button
                    className={coordinatesBtn}
                    onClick={() => toggleDisplayCoordinates()}
                >
                    Show Coordinates
                </button>
                <CanvasGrid
                    state={stateOfGrid}
                    showCoordinates={areCoordinatesToDisplay.toString()}
                    onMouseDown={(e) => changeCellState(e)}
                />
            </div>
        </Layout>
    )
}

export default CanvasGridPage
