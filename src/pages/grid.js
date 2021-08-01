import React, {useEffect, useState} from 'react'
import Layout from "../components/Layout";
import {cellGrid} from "../styles/grid.module.css"
import AliveCell from '../components/AliveCell.js'
import DeadCell from '../components/DeadCell.js'
import {gql, useMutation, useSubscription} from "@apollo/client";
import {dynamicColumns, divGridStyle} from '../utils/DynamicColumns'


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
    useEffect(()=>{
        gridUpdatingLogic(stateOfGrid, setStateOfGrid);
    }, [cell])

    // Add logic to update grid (toggle from alive/dead)
    let x = Number(cell.split(",")[0])
    let y = Number(cell.split(",")[1])
    const gridUpdatingLogic = (stateOfGrid, setStateOfGrid) => {
        if (stateOfGrid){
            if (stateOfGrid[x][y] === "#"){
                stateOfGrid[x][y] = "_"
            } else if (stateOfGrid[x][y] === "_"){
                stateOfGrid[x][y] = "#"
            }
            setStateOfGrid({
                variables: {
                    user: "Michal",
                    grid: stateOfGrid
                }
            })
        }
    }

    const { loading, error, data } = useSubscription(GET_STATE);
    if (loading) return <p>Waiting for Server Response</p>
    if (error) return <p>Server Down</p>
    if (!data) {
        return null;
    }

    // Handle case when there is no initial state sent by graphQL
    let stateOfGrid
    let graphQLInitialData = data.states[data.states.length-1]
    if(graphQLInitialData === undefined){
        stateOfGrid = [['#']]
    } else {
        stateOfGrid = graphQLInitialData.grid
    }

    // Dynamically add right number of columns in cell grid
    const numberOfColumns = stateOfGrid[0].length
    const columnsToRender = dynamicColumns(numberOfColumns)
    const addColumns = divGridStyle(columnsToRender)



    let onUpdate =(e) => {
        // Keep track
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
                                return <div  className={cellGrid} key={cellCoordinates}>{
                                    (cell === "#")
                                        ? <AliveCell id={cellCoordinates} onClick={(e) => onUpdate(e)}/>
                                        : <DeadCell id={cellCoordinates} onClick={(e) => onUpdate(e)}/>
                                }</div> ;
                            })}
                        </div>
                    );
                })}
            </div>
        </Layout>
    )
}

export default Grid
