import * as React from "react";
import Layout from "../components/Layout";
import CanvasGrid from "../components/CanvasGrid";
import {dummyState} from "../utils/InitialState";
import {gql, useSubscription} from "@apollo/client";

const GET_STATE = gql`
    subscription {
        states{
            id
            grid
        }
    }
`;

const CanvasGridPage = () => {

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

    const getCellCoordinates = e => {
        const width = e.target.width
        const gridState = stateOfGrid
        let cellWidth;
        let cellHeight;
        cellWidth = cellHeight = width/gridState[0].length
        const rect = e.target.getBoundingClientRect()
        const x = Math.floor((e.clientX - rect.left)/cellWidth)
        const y = Math.floor((e.clientY - rect.top)/cellHeight)
        if (isCell(x,y)){
            console.log(`X: ${x}, Y: ${y}`)
        }
        // console.log(e)
    }

    return (
        <Layout>
            <div>
                <CanvasGrid state={stateOfGrid} onMouseDown={(e) => getCellCoordinates(e)}/>
            </div>
        </Layout>
    )
}

export default CanvasGridPage
