import React from 'react';
import {gql, useSubscription, useMutation} from "@apollo/client";
import CanvasGridPage from "../components/CanvasGridPage";


const testState = [
    ["_", "#"],
    ["_", "_"],
]

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

const GridProvider = () => {

    const [setStateOfGrid] = useMutation(SET_STATE);
    const {loading, error,data} = useSubscription(GET_STATE);

    if (loading) return <p>Waiting for Server Response</p>
    if (error) return <p>Server Down</p>

    // Handle case when there is no initial state sent by graphQL
    const graphQLInitialData = data.states[data.states.length-1]
    const isGraphQlDefined = graphQLInitialData !== undefined
    let stateOfGrid = isGraphQlDefined ? graphQLInitialData.grid : testState

    return (
        <CanvasGridPage initialgrid={stateOfGrid} setter={setStateOfGrid}/>
    );
}

export default GridProvider






