import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useSubscription,
    useMutation,
    gql,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
        reconnect: true,
    },
});

const client = new ApolloClient({
    link,
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
});

const GET_STATE = gql`
    subscription {
        states{
            id
            grid
        }
    }
`;

const gridState = () => {
    const { data } = useSubscription(GET_STATE);
    if (!data) {
        return null;
    }

    return (
        <>
        {data.states.map(({ id, grid }) => (
            <div>
                {grid}
            </div>
        ))}
        </>
    );
};

export default () => (
    <ApolloProvider client={client}>
        <gridState />
    </ApolloProvider>
);
