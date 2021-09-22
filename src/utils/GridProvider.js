import React from 'react';
import {gql, useSubscription} from "@apollo/client";

const Context = React.createContext({});

const testState = [
    ["_", "#"],
    ["_", "_"],
]

const GridProvider = props => {

    const GET_STATE = gql`
        subscription {
            states{
                id
                grid
            }
        }
    `;

    // const SET_STATE = gql`
    //     mutation ($user: String!, $grid:[[String]]!){
    //         postState(user: $user, grid: $grid)
    //     }
    // `;

    // const [setStateOfGrid] = useMutation(SET_STATE);
    const {loading, error,data} = useSubscription(GET_STATE);

    // Handle subscription loading and error
    if (loading) return <p>Waiting for Server Response</p>
    if (error) return <p>Server Down</p>

    // Handle case when there is no initial state sent by graphQL
    const graphQLInitialData = data.states[data.states.length-1]
    const isGraphQlDefined = graphQLInitialData !== undefined
    const stateOfGrid = isGraphQlDefined ? graphQLInitialData.grid : testState

    // console.log(testState)

    return (
        <Context.Provider value={stateOfGrid} grid={testState}>
            {props.children}
        </Context.Provider>
    );
}

export default GridProvider


//
// export const Consumer = Context.Consumer;
//
// export default function withContext(Component) {
//     return function ContextComponent(props) {
//         return (
//             <Context.Consumer>
//                 {context => <Component {...props} context={context} />}
//             </Context.Consumer>
//         );
//     }
// }








