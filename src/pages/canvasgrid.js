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

    return (
        <Layout>
            <div>
                <CanvasGrid state={stateOfGrid}/>
            </div>
        </Layout>
    )
}

export default CanvasGridPage
