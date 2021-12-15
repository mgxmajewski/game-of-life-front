import React from 'react';
import {gql, useSubscription} from "@apollo/client";
import CanvasGridPage from "./CanvasGridPage";
import {useReactiveVar} from "@apollo/client";
import {userIdVar} from "../utils/cache";


const GridProvider = () => {

    const userId = useReactiveVar(userIdVar)
    const parseId = (id) => JSON.stringify(id[0])
    const id = parseId(userId)

    const GET_STATE = gql`
        subscription {
            sessions(id: ${id}) {
                id
                state
            }
        }
    `;


    const {loading, error, data} = useSubscription(GET_STATE, {shouldResubscribe: true});
    const getGrid = (data) => data["sessions"].state;
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






