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

    const { data } = useSubscription(GET_STATE);
    if (!data) {
        return null;
    }

    const stateOfGrid = data.states[data.states.length-1].grid
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
