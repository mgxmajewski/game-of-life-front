import React, {useEffect, useState} from 'react'
import Layout from "../components/Layout";
import {cellGrid} from "../styles/grid.module.css"
import AliveCell from '../components/AliveCell.js'
import DeadCell from '../components/DeadCell.js'
import {gql, useMutation, useSubscription} from "@apollo/client";


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
    const [isClicked, setIsClicked] = useState(0)
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

    let numberOfColumns = stateOfGrid[0].length


    let onUpdate =(e) => {
        setIsClicked(isClicked+1)
        setCell(`${e.target.id},${isClicked}`)
    }

    const columnParser = () => {
        let columns = ''
        for(let i = 0; i <numberOfColumns; i++){
            columns+='1fr '
        }
        return columns
    }

    const divStyle = {
        display: 'grid',
        gridTemplateColumns: `${columnParser()}`
    };

    return (
        <Layout>
            <div>
                {stateOfGrid.map((rows, x) => {
                    return (
                        <div style={divStyle} key={x}>
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
