import React from 'react'
import Layout from "../components/Layout";
import {cellGrid} from "../styles/grid.module.css"
import AliveCell from '../components/AliveCell.js'
import DeadCell from '../components/DeadCell.js'
import {gql, useSubscription} from "@apollo/client";


const GET_STATE = gql`
    subscription {
        states{
            id
            grid
        }
    }
`;

const Grid = () => {
    const { data } = useSubscription(GET_STATE);
    if (!data) {
        return null;
    }


    const state = data.states[data.states.length-1].grid
    let numberOfColumns = state[0].length

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
                {state.map((rows, x) => {
                    return (
                        <div style={divStyle} key={x}>
                            {rows.map((cell, y) => {
                                const cellCoordinates = `${y.toString()},${x.toString()}`
                                return <div className={cellGrid} key={cellCoordinates}>{
                                    (cell === "#")
                                        ? <AliveCell />
                                        : <DeadCell/>
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
