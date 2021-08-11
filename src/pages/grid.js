import React, {useEffect, useState} from 'react'
import Layout from "../components/Layout";
import {cellGrid} from "../styles/grid.module.css"
import AliveCell from '../components/AliveCell.js'
import DeadCell from '../components/DeadCell.js'
import {gql, useMutation, useSubscription} from "@apollo/client";
import {dynamicColumns, divGridStyle} from '../utils/DynamicColumns'
import {frameModHandler} from "../utils/FrameModHandler";
import {dummyState} from "../utils/InitialState"
import {btn} from "../styles/home.module.css";

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

const Grid = () => {
    const [cell, setCell] = useState("")
    const [setStateOfGrid] = useMutation(SET_STATE);
    const [isModified, setIsModified] = useState(false)

    // Add handler to flip state of the cell (to work from the first click)
    useEffect(()=> {
        frameModHandler(stateOfGrid, setStateOfGrid, cell);
    }, [cell])

    // Create useSubscription to get realtime state of graphql
    const {loading, error,data} = useSubscription(GET_STATE);

    // Handle subscription loading and error
    if (loading) return <p>Waiting for Server Response</p>
    if (error) return <p>Server Down</p>


    // Handle case when there is no initial state sent by graphQL
    const graphQLInitialData = data.states[data.states.length-1]
    const isGraphQlDefined = graphQLInitialData !== undefined
    const stateOfGrid = isGraphQlDefined ? graphQLInitialData.grid : dummyState

    // Dynamically add right number of columns in cell grid
    const numberOfColumns = stateOfGrid[0].length
    const columnsToRender = dynamicColumns(numberOfColumns)
    const addColumns = divGridStyle(columnsToRender)

    // Handles user changes to grid
    let onUpdate =(e) => {
        setIsModified(!isModified)
        setCell(`${e.target.id},${isModified}`)
    }

    return (
        <Layout>
            <div>
                {stateOfGrid.map((rows, x) => {
                    return (
                        <div style={addColumns} key={x}>
                            {rows.map((cell, y) => {
                                const cellCoordinates = `${x},${y}`
                                return (
                                    <div key={cellCoordinates}
                                         className={cellGrid}>
                                        {(cell === "#")
                                            ? <AliveCell id={cellCoordinates} onClick={(e) => onUpdate(e)}/>
                                            : <DeadCell id={cellCoordinates} onClick={(e) => onUpdate(e)}/>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    );
                })}
            </div>
            <button className={btn}>+ COLUMN</button>
            <button className={btn}>+ ROW</button>
        </Layout>
    )
}

export default Grid
