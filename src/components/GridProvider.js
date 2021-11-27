import React from 'react';
import {gql, useSubscription} from "@apollo/client";
import CanvasGridPage from "./CanvasGridPage";
import {useReactiveVar} from "@apollo/client";
import {userIdVar} from "../utils/cache";


const GridProvider = () => {

    const userId = useReactiveVar(userIdVar)

    const GET_STATE = gql`
        subscription {
            states(userId: ${userId}) {
                id
                grid
            }
        }
    `;


    const {loading, error, data} = useSubscription(GET_STATE);

    const mostRecentFrame = (data) => data.states.length - 1;
    const getGrid = (data) => data.states[mostRecentFrame(data)].grid;
    console.log(userId)
    return (
        <>
            {loading && <p>Waiting for Server Response</p>}
            {error && <p>Error: ${error.message}</p>}
            {data && getGrid(data) && (
                <CanvasGridPage initialgrid={getGrid(data)}/>
            )}
        </>
    );
}

export default GridProvider;






