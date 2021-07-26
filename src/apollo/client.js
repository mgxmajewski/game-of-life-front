import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useSubscription,
    gql,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
        reconnect: true,
    },
});

export const client = new ApolloClient({
    link,
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
});

